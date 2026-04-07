import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

async function transpileTypeScriptModule(path, replacements = []) {
	let source = await readFile(path, 'utf8');

	for (const [needle, replacement] of replacements) {
		source = source.replaceAll(needle, replacement);
	}

	const transpiled = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.ES2022,
			target: ts.ScriptTarget.ES2022
		}
	});

	return `data:text/javascript;base64,${Buffer.from(transpiled.outputText, 'utf8').toString(
		'base64'
	)}`;
}

async function importTypeScriptModule(path, replacements = []) {
	return import(await transpileTypeScriptModule(path, replacements));
}

test('dining page options expose synthetic all selectors', async () => {
	const module = await importTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));

	assert.equal(module.DINING_ALL_LOCATIONS, 'all');
	assert.equal(module.DINING_ALL_MEALS, 'all');
	assert.equal(module.DINING_LOCATION_OPTIONS.length, module.DINING_LOCATIONS.length + 1);
	assert.equal(module.DINING_MEAL_OPTIONS.length, module.DINING_MEALS.length + 1);
	assert.equal(module.DINING_LOCATION_OPTIONS[0].value, 'all');
	assert.equal(module.DINING_LOCATION_OPTIONS[0].label, 'All halls');
	assert.equal(module.DINING_MEAL_OPTIONS[0].value, 'all');
	assert.equal(module.DINING_MEAL_OPTIONS[0].label, 'All meals');
	assert.deepEqual(
		module.DINING_LOCATION_OPTIONS.slice(1),
		module.DINING_LOCATIONS.map((location) => ({ value: location, label: location }))
	);
	assert.deepEqual(module.DINING_MEAL_OPTIONS.slice(1), module.DINING_MEALS);
	assert.notStrictEqual(module.DEFAULT_DINING_PARAMS.goals, module.DEFAULT_DINING_PAGE_PARAMS.goals);
	assert.deepEqual(module.DEFAULT_DINING_PARAMS.goals, module.DEFAULT_DINING_PAGE_PARAMS.goals);
});

test('buildDiningRequestPlan expands all halls and all meals', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const goals = { calories: 750, protein: 45, carbs: 70, fat: 25 };
	const plan = module.buildDiningRequestPlan({
		location: 'all',
		meal: 'all',
		date: '2026-04-07',
		goals,
		diversity: 'balanced'
	});

	assert.equal(plan.length, 15);
	assert.deepEqual(plan[0], {
		location: 'Earhart',
		meal: 'breakfast',
		date: '2026-04-07',
		goals: { calories: 750, protein: 45, carbs: 70, fat: 25 },
		diversity: 'balanced'
	});
	assert.notStrictEqual(plan[0].goals, goals);
	assert.deepEqual(plan.at(-1), {
		location: 'Windsor',
		meal: 'dinner',
		date: '2026-04-07',
		goals: { calories: 750, protein: 45, carbs: 70, fat: 25 },
		diversity: 'balanced'
	});
});

test('sortDiningResults orders halls and meals deterministically', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const unsorted = [
		{
			location: 'Windsor',
			meal: 'dinner',
			choices: []
		},
		{
			location: 'Earhart',
			meal: 'lunch',
			choices: []
		},
		{
			location: 'Earhart',
			meal: 'breakfast',
			choices: []
		},
		{
			location: 'Ford',
			meal: 'breakfast',
			choices: []
		}
	];

	assert.deepEqual(module.sortDiningResults(unsorted), [
		{
			location: 'Earhart',
			meal: 'breakfast',
			choices: []
		},
		{
			location: 'Earhart',
			meal: 'lunch',
			choices: []
		},
		{
			location: 'Ford',
			meal: 'breakfast',
			choices: []
		},
		{
			location: 'Windsor',
			meal: 'dinner',
			choices: []
		}
	]);
});

test('runDiningRecommendations merges and sorts multi-request results', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const seen = [];
	const result = await module.runDiningRecommendations(
		{
			location: 'all',
			meal: 'breakfast',
			date: '2026-04-07',
			goals: { calories: 750, protein: 45, carbs: 70, fat: 25 },
			diversity: 'balanced'
		},
		async (params) => {
			seen.push(`${params.location}:${params.meal}`);
			return {
				error: '',
				results: [
					{
						location: params.location,
						meal: params.meal,
						choices: [
							{
								rank: 1,
								entree: {
									name: `${params.location} entree`,
									calories: 100,
									protein: 10,
									carbs: 10,
									fat: 5
								},
								sides: [],
								totals: { calories: 100, protein: 10, carbs: 10, fat: 5 },
								coverage: { calories: 0.5, protein: 0.5, carbs: 0.5, fat: 0.5 }
							}
						]
					}
				]
			};
		}
	);

	assert.deepEqual(seen, [
		'Earhart:breakfast',
		'Ford:breakfast',
		'Hillenbrand:breakfast',
		'Wiley:breakfast',
		'Windsor:breakfast'
	]);
	assert.equal(result.error, '');
	assert.equal(result.results.length, 5);
	assert.equal(result.results[0].location, 'Earhart');
});

test('createDiningPageParams returns fresh page state with cloned goals', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const typesModule = await importTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const first = module.createDiningPageParams();
	const second = module.createDiningPageParams();

	assert.equal(first.location, 'all');
	assert.equal(first.meal, 'lunch');
	assert.equal(first.date, '');
	assert.equal(first.diversity, 'balanced');
	assert.notStrictEqual(first, second);
	assert.notStrictEqual(first.goals, second.goals);
	assert.notStrictEqual(first.goals, typesModule.DEFAULT_DINING_PAGE_PARAMS.goals);
	assert.deepEqual(first.goals, typesModule.DEFAULT_DINING_PAGE_PARAMS.goals);

	first.goals.calories = 999;
	assert.equal(typesModule.DEFAULT_DINING_PAGE_PARAMS.goals.calories, 750);
	assert.equal(second.goals.calories, 750);
});

test('describeDiningScope formats all selectors cleanly', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	assert.equal(
		module.describeDiningScope({
			location: 'all',
			meal: 'all',
			date: '2026-04-07',
			goals: { calories: 750, protein: 45, carbs: 70, fat: 25 },
			diversity: 'balanced'
		}),
		'all dining halls, all meals'
	);
});

test('choice display formatting keeps entree repeats out of the side list', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const choice = {
		rank: 1,
		entree: {
			name: 'Pork Carnitas',
			calories: 430,
			protein: 32,
			carbs: 5,
			fat: 28
		},
		sides: [
			{
				name: 'Pork Carnitas',
				calories: 430,
				protein: 32,
				carbs: 5,
				fat: 28
			},
			{
				name: 'Pork Carnitas',
				calories: 430,
				protein: 32,
				carbs: 5,
				fat: 28
			},
			{
				name: 'Elote Salad',
				calories: 90,
				protein: 2,
				carbs: 8,
				fat: 6
			},
			{
				name: 'Long Grain Rice',
				calories: 120,
				protein: 2,
				carbs: 24,
				fat: 1
			},
			{
				name: 'Long Grain Rice',
				calories: 120,
				protein: 2,
				carbs: 24,
				fat: 1
			}
		],
		totals: { calories: 1500, protein: 100, carbs: 66, fat: 63 },
		coverage: { calories: 2, protein: 2, carbs: 1, fat: 2 }
	};

	assert.equal(module.getDiningChoiceEntreeCount(choice), 3);
	assert.deepEqual(module.getDiningChoiceSideNames(choice), [
		'Elote Salad',
		'Long Grain Rice',
		'Long Grain Rice'
	]);
	assert.equal(module.formatDiningItemName(choice.entree.name, module.getDiningChoiceEntreeCount(choice)), 'Pork Carnitas (3x)');
	assert.equal(
		module.formatRepeatedDiningItemNames(module.getDiningChoiceSideNames(choice)),
		'Elote Salad, Long Grain Rice (2x)'
	);
});

test('runDiningRecommendations returns the first runtime error', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`]
	]);

	const result = await module.runDiningRecommendations(
		{
			location: 'all',
			meal: 'lunch',
			date: '2026-04-07',
			goals: { calories: 750, protein: 45, carbs: 70, fat: 25 },
			diversity: 'balanced'
		},
		async (params) =>
			params.location === 'Ford'
				? { error: 'Dining WASM request failed', results: [] }
				: { error: '', results: [] }
	);

	assert.equal(result.error, 'Dining WASM request failed');
	assert.deepEqual(result.results, []);
});

test('applyDiningGoalsCalculatorResult writes per-meal targets into goals', async () => {
	const typesUrl = await transpileTypeScriptModule(new URL('../src/lib/dining/types.ts', import.meta.url));
	const calculatorUrl = await transpileTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);
	const module = await importTypeScriptModule(new URL('../src/lib/dining/page.ts', import.meta.url), [
		["from './types'", `from '${typesUrl}'`],
		["from './goals-calculator'", `from '${calculatorUrl}'`]
	]);

	const params = module.createDiningPageParams();
	const next = module.applyDiningGoalsCalculatorResult(params, {
		daily: { calories: 2400, protein: 160, carbs: 240, fat: 67 },
		perMeal: { calories: 800, protein: 53, carbs: 80, fat: 22 }
	});

	assert.deepEqual(next.goals, { calories: 800, protein: 53, carbs: 80, fat: 22 });
	assert.equal(params.goals.calories, 750);
});
