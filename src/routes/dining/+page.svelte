<script lang="ts">
	import { onMount } from 'svelte';
	import {
		DEFAULT_DINING_PARAMS,
		DINING_DIVERSITY_OPTIONS,
		DINING_LOCATIONS,
		DINING_MEALS,
		type DiningChoiceResult,
		type DiningRecommendParams,
		type DiningRecommendResult
	} from '$lib/dining/types';
	import {
		loadDiningRuntime,
		recommendDining,
		type DiningRuntimeState
	} from '$lib/dining/wasm';

	const mealLabels: Record<string, string> = Object.fromEntries(
		DINING_MEALS.map((option) => [option.value, option.label])
	);

	function defaultDate(): string {
		const now = new Date();
		const offset = now.getTimezoneOffset() * 60_000;
		return new Date(now.getTime() - offset).toISOString().slice(0, 10);
	}

	function formatMacro(value: number): string {
		return Number.isFinite(value) ? value.toFixed(0) : '0';
	}

	function formatCoverage(choice: DiningChoiceResult): string {
		return [
			`${formatMacro(choice.coverage.calories)} cal`,
			`${formatMacro(choice.coverage.protein)}g protein`,
			`${formatMacro(choice.coverage.carbs)}g carbs`,
			`${formatMacro(choice.coverage.fat)}g fat`
		].join(' | ');
	}

	function normalizeGoal(value: number | undefined, fallback: number): number {
		if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
		return Math.max(0, value);
	}

	function buildRequestParams(params: DiningRecommendParams): DiningRecommendParams {
		return {
			...params,
			date: params.date || defaultDate(),
			goals: {
				calories: normalizeGoal(params.goals.calories, DEFAULT_DINING_PARAMS.goals.calories),
				protein: normalizeGoal(params.goals.protein, DEFAULT_DINING_PARAMS.goals.protein),
				carbs: normalizeGoal(params.goals.carbs, DEFAULT_DINING_PARAMS.goals.carbs),
				fat: normalizeGoal(params.goals.fat, DEFAULT_DINING_PARAMS.goals.fat)
			}
		};
	}

	let params: DiningRecommendParams = {
		...DEFAULT_DINING_PARAMS,
		date: DEFAULT_DINING_PARAMS.date,
		goals: { ...DEFAULT_DINING_PARAMS.goals }
	};

	let runtimeState: DiningRuntimeState = {
		status: 'loading',
		message: 'Loading dining runtime...'
	};
	let isSubmitting = false;
	let result: DiningRecommendResult | null = null;

	$: runtimeUnavailable = runtimeState.status === 'unavailable';
	$: runtimeReady = runtimeState.status === 'ready';
	$: disableControls = runtimeUnavailable || isSubmitting;
	$: disableSubmit = !runtimeReady || isSubmitting;

	onMount(() => {
		let cancelled = false;

		if (!params.date) {
			params = {
				...params,
				date: defaultDate()
			};
		}

		void loadDiningRuntime().then((state) => {
			if (!cancelled) {
				runtimeState = state;
			}
		});

		return () => {
			cancelled = true;
		};
	});

	async function handleSubmit() {
		if (!runtimeReady || isSubmitting) return;

		isSubmitting = true;
		result = null;

		try {
			params = buildRequestParams(params);
			result = await recommendDining(params);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Dining -- Max Weinstein</title>
	<meta
		name="description"
		content="Dining hall meal recommendations powered by a browser-side WASM runtime."
	/>
	<meta property="og:title" content="Dining -- Max Weinstein" />
	<meta
		property="og:description"
		content="Dining hall meal recommendations powered by a browser-side WASM runtime."
	/>
</svelte:head>

<section class="dining">
	<h1>Dining</h1>

	<div class="intro">
		<p>Set a meal target and get ranked dining hall recommendations from the browser-side runtime.</p>
		<p class="status" data-status={runtimeState.status}>{runtimeState.message}</p>
	</div>

	<form class="controls" on:submit|preventDefault={handleSubmit}>
		<label>
			<span>Hall</span>
			<select bind:value={params.location} disabled={disableControls}>
				{#each DINING_LOCATIONS as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</label>

		<label>
			<span>Meal</span>
			<select bind:value={params.meal} disabled={disableControls}>
				{#each DINING_MEALS as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>

		<label>
			<span>Date</span>
			<input bind:value={params.date} type="date" disabled={disableControls} />
		</label>

		<label>
			<span>Diversity</span>
			<select bind:value={params.diversity} disabled={disableControls}>
				{#each DINING_DIVERSITY_OPTIONS as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>

		<label>
			<span>Calories</span>
			<input bind:value={params.goals.calories} type="number" min="0" step="10" disabled={disableControls} />
		</label>

		<label>
			<span>Protein</span>
			<input bind:value={params.goals.protein} type="number" min="0" step="1" disabled={disableControls} />
		</label>

		<label>
			<span>Carbs</span>
			<input bind:value={params.goals.carbs} type="number" min="0" step="1" disabled={disableControls} />
		</label>

		<label>
			<span>Fat</span>
			<input bind:value={params.goals.fat} type="number" min="0" step="1" disabled={disableControls} />
		</label>

		<button type="submit" disabled={disableSubmit}>
			{#if isSubmitting}
				Running...
			{:else if runtimeReady}
				Recommend
			{:else if runtimeUnavailable}
				Runtime unavailable
			{:else}
				Loading runtime...
			{/if}
		</button>
	</form>

	{#if result?.error}
		<section class="error" aria-live="polite">
			<h2>Runtime error</h2>
			<p>{result.error}</p>
		</section>
	{/if}

	{#if result && result.results.length > 0}
		<section class="results" aria-live="polite">
			<h2>Results</h2>

			<div class="cards">
				{#each result.results as entry}
					<article class="card">
						<h3>{entry.location} / {mealLabels[entry.meal] ?? entry.meal}</h3>

						<ol class="choices">
							{#each entry.choices as choice}
								<li>
									<p class="rank">Choice {choice.rank}</p>
									<p><strong>Entree:</strong> {choice.entree.name}</p>
									<p><strong>Sides:</strong> {choice.sides.map((side) => side.name).join(', ') || 'None'}</p>
									<p>
										<strong>Totals:</strong>
										{formatMacro(choice.totals.calories)} cal /
										{formatMacro(choice.totals.protein)}g protein /
										{formatMacro(choice.totals.carbs)}g carbs /
										{formatMacro(choice.totals.fat)}g fat
									</p>
									<p><strong>Coverage:</strong> {formatCoverage(choice)}</p>
								</li>
							{/each}
						</ol>
					</article>
				{/each}
			</div>
		</section>
	{/if}
</section>

<style>
	.dining {
		padding: 2rem 0;
	}

	.intro {
		margin-bottom: 2rem;
	}

	.status {
		color: var(--muted);
		font-size: 0.95rem;
	}

	.status[data-status='ready'] {
		color: var(--text);
	}

	.status[data-status='unavailable'] {
		color: var(--accent);
	}

	.controls,
	.cards {
		display: grid;
		gap: 1rem;
	}

	.controls {
		margin-bottom: 2rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
	}

	span {
		color: var(--muted);
		font-size: 0.9rem;
	}

	input,
	select,
	button {
		width: 100%;
		border: 1px solid var(--border);
		background: #fff;
		color: var(--text);
		font: inherit;
		padding: 0.75rem 0.85rem;
	}

	button {
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}

	button:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--accent);
	}

	input:disabled,
	select:disabled,
	button:disabled {
		cursor: not-allowed;
		color: var(--muted);
		background: #f5f2ee;
	}

	.error,
	.card {
		border-top: 1px solid var(--border);
		padding-top: 1.5rem;
	}

	.results {
		padding-bottom: 1rem;
	}

	.choices {
		list-style: none;
		padding: 0;
	}

	.choices li {
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
	}

	.choices li:first-child {
		padding-top: 0;
	}

	.choices li:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.rank {
		color: var(--muted);
		font-size: 0.9rem;
		margin-bottom: 0.35rem;
	}

	@media (max-width: 480px) {
		.dining {
			padding: 1.5rem 0;
		}
	}
</style>
