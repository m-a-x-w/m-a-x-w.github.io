import { browser } from '$app/environment';
import {
	DINING_LOCATIONS,
	DINING_MEALS,
	isDiningRecommendResult,
	type DiningChoiceResult,
	type DiningItemResult,
	type DiningLocationMealResult,
	type DiningRecommendParams,
	type DiningRecommendResult,
	type MacroGoals
} from './types';

declare global {
	interface Window {
		Go?: new () => GoRuntime;
		diningRecommend?: (paramsJSON: string) => string | Promise<string>;
	}
}

type GoRuntime = {
	importObject: WebAssembly.Imports;
	run(instance: WebAssembly.Instance): void | Promise<void>;
};

export type DiningRuntimeState =
	| { status: 'loading'; message: string }
	| { status: 'ready'; message: string }
	| { status: 'unavailable'; message: string };

const WASM_EXEC_PATH = '/wasm_exec.js';
const WASM_BINARY_PATH = '/dining.wasm';
const LOADING_MESSAGE = 'Loading dining runtime...';
const SSR_UNAVAILABLE_MESSAGE =
	'Dining WASM runtime is browser-only and cannot load during SSR.';

let runtimeState: DiningRuntimeState | null = null;
let runtimeInitPromise: Promise<DiningRuntimeState> | null = null;
let wasmExecScriptPromise: Promise<void> | null = null;

function loadingState(): DiningRuntimeState {
	return { status: 'loading', message: LOADING_MESSAGE };
}

function readyState(): DiningRuntimeState {
	return { status: 'ready', message: 'Dining runtime is ready.' };
}

function unavailable(message: string): DiningRuntimeState {
	return { status: 'unavailable', message };
}

function createErrorResult(message: string): DiningRecommendResult {
	return { error: message, results: [] };
}

function describeError(error: unknown): string {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === 'string') return error;

	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value);
}

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

function isDiningLocation(value: unknown): value is DiningLocationMealResult['location'] {
	return isString(value) && DINING_LOCATIONS.includes(value as (typeof DINING_LOCATIONS)[number]);
}

function isDiningMeal(value: unknown): value is DiningLocationMealResult['meal'] {
	return isString(value) && DINING_MEALS.some((option) => option.value === value);
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function isMacroGoals(value: unknown): value is MacroGoals {
	if (!isRecord(value)) return false;

	return isNumber(value.calories) && isNumber(value.protein) && isNumber(value.carbs) && isNumber(value.fat);
}

function isDiningItemResult(value: unknown): value is DiningItemResult {
	if (!isRecord(value)) return false;

	return (
		isString(value.name) &&
		isNumber(value.calories) &&
		isNumber(value.protein) &&
		isNumber(value.carbs) &&
		isNumber(value.fat)
	);
}

function isDiningChoiceResult(value: unknown): value is DiningChoiceResult {
	if (!isRecord(value)) return false;
	if (!isNumber(value.rank)) return false;
	if (!isDiningItemResult(value.entree)) return false;
	if (!Array.isArray(value.sides) || !value.sides.every(isDiningItemResult)) return false;
	if (!isMacroGoals(value.totals)) return false;
	if (!isMacroGoals(value.coverage)) return false;

	return true;
}

function isDiningLocationMealResult(value: unknown): value is DiningLocationMealResult {
	if (!isRecord(value)) return false;
	if (!isDiningLocation(value.location)) return false;
	if (!isDiningMeal(value.meal)) return false;
	if (!Array.isArray(value.choices) || !value.choices.every(isDiningChoiceResult)) return false;

	return true;
}

function parseDiningRecommendResult(value: unknown): DiningRecommendResult | null {
	if (!isDiningRecommendResult(value)) return null;
	if (!value.results.every(isDiningLocationMealResult)) return null;

	return {
		error: value.error,
		results: value.results
	};
}

async function waitForDiningRecommendExport(timeoutMs = 5000): Promise<boolean> {
	const deadline = Date.now() + timeoutMs;

	while (Date.now() < deadline) {
		if (typeof window.diningRecommend === 'function') {
			return true;
		}

		await delay(25);
	}

	return typeof window.diningRecommend === 'function';
}

async function loadWasmExecScript(): Promise<void> {
	if (!browser) return;
	if (window.Go) return;

	if (!wasmExecScriptPromise) {
		wasmExecScriptPromise = new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = WASM_EXEC_PATH;
			script.async = true;
			script.dataset.diningWasm = 'true';
			script.addEventListener(
				'load',
				() => {
					resolve();
				},
				{ once: true }
			);
			script.addEventListener(
				'error',
				() => {
					reject(new Error(`Failed to load ${WASM_EXEC_PATH}.`));
				},
				{ once: true }
			);
			document.head.append(script);
		});
	}

	await wasmExecScriptPromise;

	if (!window.Go) {
		throw new Error(
			`Loaded ${WASM_EXEC_PATH}, but it did not define the expected Go runtime helper on window.Go.`
		);
	}
}

async function initializeDiningRuntime(): Promise<DiningRuntimeState> {
	if (!browser) {
		return unavailable(SSR_UNAVAILABLE_MESSAGE);
	}

	try {
		await loadWasmExecScript();

		const Go = window.Go;
		if (!Go) {
			return unavailable(
				`Dining WASM runtime helper ${WASM_EXEC_PATH} is missing or did not define window.Go.`
			);
		}

		const response = await fetch(WASM_BINARY_PATH);
		if (!response.ok) {
			return unavailable(
				`Dining WASM binary ${WASM_BINARY_PATH} could not be fetched (${response.status} ${response.statusText}).`
			);
		}

		const go = new Go();
		let instance: WebAssembly.Instance;

		try {
			const instantiated = await WebAssembly.instantiate(await response.arrayBuffer(), go.importObject);
			instance = instantiated.instance;
		} catch (error) {
			return unavailable(
				`Dining WASM startup failed while instantiating ${WASM_BINARY_PATH}: ${describeError(error)}`
			);
		}

		try {
			const runResult = go.run(instance);
			if (runResult && typeof (runResult as PromiseLike<void>).then === 'function') {
				void Promise.resolve(runResult).catch(() => undefined);
			}
		} catch (error) {
			return unavailable(
				`Dining WASM startup failed while running ${WASM_BINARY_PATH}: ${describeError(error)}`
			);
		}

		if (!(await waitForDiningRecommendExport())) {
			return unavailable(
				'Dining WASM startup completed, but window.diningRecommend was not exported.'
			);
		}

		return readyState();
	} catch (error) {
		return unavailable(`Dining WASM runtime failed to start: ${describeError(error)}`);
	}
}

function ensureDiningRuntimeInitialized(): Promise<DiningRuntimeState> {
	if (!browser) {
		runtimeState = unavailable(SSR_UNAVAILABLE_MESSAGE);
		return Promise.resolve(runtimeState);
	}

	if (runtimeInitPromise) {
		return runtimeInitPromise;
	}

	runtimeState = loadingState();
	runtimeInitPromise = initializeDiningRuntime().then((state) => {
		runtimeState = state;
		return state;
	});

	return runtimeInitPromise;
}

export async function loadDiningRuntime(): Promise<DiningRuntimeState> {
	if (!browser) {
		runtimeState = unavailable(SSR_UNAVAILABLE_MESSAGE);
		return runtimeState;
	}

	if (runtimeState?.status === 'ready' || runtimeState?.status === 'unavailable') {
		return runtimeState;
	}

	return ensureDiningRuntimeInitialized();
}

export async function recommendDining(
	params: DiningRecommendParams
): Promise<DiningRecommendResult> {
	const runtime = await ensureDiningRuntimeInitialized();
	if (runtime.status !== 'ready') {
		return createErrorResult(runtime.message);
	}

	const recommend = window.diningRecommend;
	if (typeof recommend !== 'function') {
		return createErrorResult(
			'Dining WASM runtime is ready, but window.diningRecommend is not available.'
		);
	}

	let rawResponse: string;

	try {
		rawResponse = await Promise.resolve(recommend(JSON.stringify(params)));
	} catch (error) {
		return createErrorResult(`Dining WASM request failed: ${describeError(error)}`);
	}

	if (typeof rawResponse !== 'string') {
		return createErrorResult(
			`Dining WASM returned a non-string response instead of JSON: ${typeof rawResponse}.`
		);
	}

	let parsedResponse: unknown;

	try {
		parsedResponse = JSON.parse(rawResponse);
	} catch (error) {
		return createErrorResult(`Dining WASM returned malformed JSON: ${describeError(error)}`);
	}

	const result = parseDiningRecommendResult(parsedResponse);
	if (!result) {
		return createErrorResult('Dining WASM returned an unexpected response shape.');
	}

	return result;
}
