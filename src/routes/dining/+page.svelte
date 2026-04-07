<script lang="ts">
	import { onMount } from 'svelte';
	import {
		DEFAULT_DINING_GOALS_CALCULATOR_INPUT,
		DINING_GOALS_CALCULATOR_ACTIVITY_OPTIONS,
		calculateDiningGoalTargets,
		type DiningGoalsCalculatorInput
	} from '$lib/dining/goals-calculator';
	import {
		DEFAULT_DINING_PAGE_PARAMS,
		DINING_DIVERSITY_OPTIONS,
		DINING_LOCATION_OPTIONS,
		DINING_MEALS,
		DINING_MEAL_OPTIONS,
		type DiningChoiceResult,
		type DiningPageParams,
		type DiningRecommendResult
	} from '$lib/dining/types';
	import {
		applyDiningGoalsCalculatorResult,
		createDiningPageParams,
		describeDiningScope,
		formatDiningItemName,
		formatRepeatedDiningItemNames,
		getDiningChoiceEntreeCount,
		getDiningChoiceSideNames,
		runDiningRecommendations
	} from '$lib/dining/page';
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

	function formatNumber(value: number): string {
		return Number.isFinite(value) ? value.toFixed(0) : '0';
	}

	function formatTotals(choice: DiningChoiceResult): string {
		return [
			`${formatNumber(choice.totals.calories)} cal`,
			`${formatNumber(choice.totals.protein)}g protein`,
			`${formatNumber(choice.totals.carbs)}g carbs`,
			`${formatNumber(choice.totals.fat)}g fat`
		].join(' / ');
	}

	function formatMacroSummary(values: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	}): string {
		return [
			`${formatNumber(values.calories)} cal`,
			`${formatNumber(values.protein)}p`,
			`${formatNumber(values.carbs)}c`,
			`${formatNumber(values.fat)}f`
		].join(' / ');
	}

	function normalizeGoal(value: number | undefined, fallback: number): number {
		if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
		return Math.max(0, value);
	}

	function normalizeParams(params: DiningPageParams): DiningPageParams {
		return {
			...params,
			date: params.date || defaultDate(),
			goals: {
				calories: normalizeGoal(params.goals.calories, DEFAULT_DINING_PAGE_PARAMS.goals.calories),
				protein: normalizeGoal(params.goals.protein, DEFAULT_DINING_PAGE_PARAMS.goals.protein),
				carbs: normalizeGoal(params.goals.carbs, DEFAULT_DINING_PAGE_PARAMS.goals.carbs),
				fat: normalizeGoal(params.goals.fat, DEFAULT_DINING_PAGE_PARAMS.goals.fat)
			}
		};
	}

	let params: DiningPageParams = createDiningPageParams();
	let lastSubmittedScope = '';
	let lastSubmittedDate = '';
	let runtimeState: DiningRuntimeState = {
		status: 'loading',
		message: 'Loading dining runtime...'
	};
	let isSubmitting = false;
	let result: DiningRecommendResult | null = null;
	let showGoalsCalculator = false;
	let goalsCalculator: DiningGoalsCalculatorInput = { ...DEFAULT_DINING_GOALS_CALCULATOR_INPUT };
	let goalsCalculatorElement: HTMLDivElement | null = null;
	let goalsCalculatorButton: HTMLButtonElement | null = null;

	$: runtimeUnavailable = runtimeState.status === 'unavailable';
	$: runtimeReady = runtimeState.status === 'ready';
	$: disableControls = runtimeUnavailable || isSubmitting;
	$: disableSubmit = !runtimeReady || isSubmitting;
	$: currentScope = describeDiningScope(params);
	$: resultGroupCount = result?.results.length ?? 0;
	$: recommendationCount =
		result?.results.reduce((count, entry) => count + entry.choices.length, 0) ?? 0;
	$: goalsCalculatorResult = calculateDiningGoalTargets(goalsCalculator);

	onMount(() => {
		let cancelled = false;
		const handleDocumentClick = (event: MouseEvent) => {
			const target = event.target;
			if (!showGoalsCalculator || !(target instanceof Node)) return;
			if (goalsCalculatorElement?.contains(target)) return;
			if (goalsCalculatorButton?.contains(target)) return;
			showGoalsCalculator = false;
		};
		const handleDocumentKeydown = (event: KeyboardEvent) => {
			if (showGoalsCalculator && event.key === 'Escape') {
				showGoalsCalculator = false;
			}
		};

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

		document.addEventListener('click', handleDocumentClick);
		document.addEventListener('keydown', handleDocumentKeydown);

		return () => {
			cancelled = true;
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleDocumentKeydown);
		};
	});

	async function handleSubmit() {
		if (!runtimeReady || isSubmitting) return;

		isSubmitting = true;
		result = null;

		try {
			params = normalizeParams(params);
			lastSubmittedScope = describeDiningScope(params);
			lastSubmittedDate = params.date;
			result = await runDiningRecommendations(params, recommendDining);
		} finally {
			isSubmitting = false;
		}
	}

	function handleReset() {
		params = {
			...createDiningPageParams(),
			date: defaultDate()
		};
		lastSubmittedScope = '';
		lastSubmittedDate = '';
		result = null;
	}

	function toggleGoalsCalculator() {
		showGoalsCalculator = !showGoalsCalculator;
	}

	function closeGoalsCalculator() {
		showGoalsCalculator = false;
	}

	function handleApplyGoalsCalculator() {
		params = applyDiningGoalsCalculatorResult(params, goalsCalculatorResult);
		showGoalsCalculator = false;
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
	<form class="control-panel" on:submit|preventDefault={handleSubmit}>
		<section class="panel-section">
			<div class="section-heading">
				<h2>Scope</h2>
				<p>Choose where to search and how broad the recommendation pass should be.</p>
			</div>

			<div class="field-grid">
				<label>
					<span>Dining hall</span>
					<select bind:value={params.location} disabled={disableControls}>
						{#each DINING_LOCATION_OPTIONS as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</label>

				<label>
					<span>Meal</span>
					<select bind:value={params.meal} disabled={disableControls}>
						{#each DINING_MEAL_OPTIONS as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</label>

				<label>
					<span>Date</span>
					<input bind:value={params.date} type="date" disabled={disableControls} />
				</label>
			</div>
		</section>

		<section class="panel-section">
			<div class="section-heading section-heading--split">
				<div>
					<h2>Goals</h2>
					<p>Set the meal profile the recommender should chase.</p>
				</div>

				<button
					bind:this={goalsCalculatorButton}
					type="button"
					class="section-action"
					aria-expanded={showGoalsCalculator}
					aria-controls="goals-calculator"
					on:click={toggleGoalsCalculator}
					disabled={disableControls}
				>
					Goals
				</button>
			</div>

			{#if showGoalsCalculator}
				<div
					bind:this={goalsCalculatorElement}
					id="goals-calculator"
					class="goals-calculator"
					role="dialog"
					aria-label="Goals calculator"
				>
					<div class="goals-calculator-copy">
						<h3>Meal target calculator</h3>
						<p>Estimate daily calories and split them into per-meal targets you can apply below.</p>
					</div>

					<div class="field-grid field-grid--calculator">
						<label>
							<span>Sex</span>
							<select bind:value={goalsCalculator.sex}>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</label>

						<label>
							<span>Age</span>
							<input bind:value={goalsCalculator.age} type="number" min="0" step="1" />
						</label>

						<label>
							<span>Height (ft)</span>
							<input bind:value={goalsCalculator.heightFeet} type="number" min="0" step="1" />
						</label>

						<label>
							<span>Height (in)</span>
							<input bind:value={goalsCalculator.heightInches} type="number" min="0" step="1" />
						</label>

						<label>
							<span>Weight (lb)</span>
							<input bind:value={goalsCalculator.weightPounds} type="number" min="0" step="1" />
						</label>

						<label>
							<span>Activity</span>
							<select bind:value={goalsCalculator.activityLevel}>
								{#each DINING_GOALS_CALCULATOR_ACTIVITY_OPTIONS as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</label>

						<label>
							<span>Meals / day</span>
							<input bind:value={goalsCalculator.mealsPerDay} type="number" min="1" step="1" />
						</label>

						<label>
							<span>Protein / lb</span>
							<input
								bind:value={goalsCalculator.proteinPerPound}
								type="number"
								min="0.1"
								step="0.1"
							/>
						</label>
					</div>

					<div class="goals-calculator-summary">
						<div>
							<h3>Daily</h3>
							<p>{formatMacroSummary(goalsCalculatorResult.daily)}</p>
						</div>
						<div>
							<h3>Per meal</h3>
							<p>{formatMacroSummary(goalsCalculatorResult.perMeal)}</p>
						</div>
					</div>

					<div class="goals-calculator-actions">
						<button type="button" class="secondary" on:click={closeGoalsCalculator}>Close</button>
						<button type="button" on:click={handleApplyGoalsCalculator}>Apply to goals</button>
					</div>
				</div>
			{/if}

			<div class="field-grid field-grid--macros">
				<label>
					<span>Calories</span>
					<input
						bind:value={params.goals.calories}
						type="number"
						min="0"
						step="10"
						disabled={disableControls}
					/>
				</label>

				<label>
					<span>Protein</span>
					<input
						bind:value={params.goals.protein}
						type="number"
						min="0"
						step="1"
						disabled={disableControls}
					/>
				</label>

				<label>
					<span>Carbs</span>
					<input
						bind:value={params.goals.carbs}
						type="number"
						min="0"
						step="1"
						disabled={disableControls}
					/>
				</label>

				<label>
					<span>Fat</span>
					<input
						bind:value={params.goals.fat}
						type="number"
						min="0"
						step="1"
						disabled={disableControls}
					/>
				</label>
			</div>
		</section>

		<section class="panel-section panel-section--compact">
			<div class="section-heading">
				<h2>Tuning</h2>
				<p>Adjust how conservative or exploratory the recommendation pass should be.</p>
			</div>

			<div class="field-grid field-grid--compact">
				<label>
					<span>Diversity</span>
					<select bind:value={params.diversity} disabled={disableControls}>
						{#each DINING_DIVERSITY_OPTIONS as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</label>
			</div>
		</section>

		<div class="actions">
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

			<button
				type="button"
				class="secondary"
				on:click={handleReset}
				disabled={disableControls}
			>
				Reset
			</button>
		</div>
	</form>

	{#if result?.error}
		<section class="error" aria-live="polite">
			<div class="section-heading">
				<h2>Runtime error</h2>
				<p>The recommender returned an error before results could be grouped.</p>
			</div>
			<p>{result.error}</p>
		</section>
	{/if}

	{#if result && !result.error && result.results.length === 0}
		<section class="empty" aria-live="polite">
			<div class="section-heading">
				<h2>No matches</h2>
				<p>No recommendation groups came back for {lastSubmittedScope} on {lastSubmittedDate}.</p>
			</div>
			<p>Try widening the hall or meal scope, or relax the macro targets and run it again.</p>
		</section>
	{/if}

	{#if result && result.results.length > 0}
		<section class="results" aria-live="polite">
			<div class="results-header">
				<div>
					<h2>Recommendations</h2>
					<p>
						scope: {lastSubmittedScope} | date: {lastSubmittedDate} | groups: {resultGroupCount} |
						options: {recommendationCount}
					</p>
				</div>
			</div>

			<div class="cards">
				{#each result.results as entry}
					<article class="card">
						<h3>{entry.location} / {mealLabels[entry.meal] ?? entry.meal}</h3>
						<p class="card-note">
							{entry.choices.length} {entry.choices.length === 1 ? 'ranked match' : 'ranked matches'}
						</p>

						<ol class="choices">
							{#each entry.choices as choice}
								<li class="choice">
									<p class="choice-rank">choice {choice.rank}</p>
									<p>
										<strong>
											entree:
										</strong>
										{formatDiningItemName(choice.entree.name, getDiningChoiceEntreeCount(choice))}
									</p>
									<p><strong>sides:</strong> {formatRepeatedDiningItemNames(getDiningChoiceSideNames(choice)) || 'None'}</p>
									<p><strong>totals:</strong> {formatTotals(choice)}</p>
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
	:global(.site) {
		max-width: 960px;
	}

	.dining {
		padding: 2rem 0 4rem;
		display: grid;
		gap: 1.25rem;
	}

	.control-panel,
	.results,
	.error,
	.empty {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.25rem;
		background: transparent;
		box-shadow: none;
	}

	.section-heading {
		display: grid;
		gap: 0.15rem;
		margin-bottom: 1rem;
	}

	.section-heading--split {
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		column-gap: 1rem;
	}

	.section-heading p,
	.results-header p,
	.card-note {
		color: var(--muted);
		font-size: 0.95rem;
	}

	.control-panel {
		display: grid;
		gap: 0.9rem;
	}

	.panel-section {
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--border);
	}

	.panel-section:last-of-type {
		padding-bottom: 0;
		border-bottom: none;
	}

	.panel-section--compact {
		max-width: 20rem;
	}

	.section-action {
		width: auto;
		min-width: 5.5rem;
		padding-inline: 1rem;
	}

	.field-grid {
		display: grid;
		gap: 0.9rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.field-grid--macros {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.field-grid--compact {
		grid-template-columns: minmax(0, 16rem);
	}

	.field-grid--calculator {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.goals-calculator {
		display: grid;
		gap: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: #fcfaf7;
	}

	.goals-calculator-copy {
		display: grid;
		gap: 0.2rem;
	}

	.goals-calculator-copy h3,
	.goals-calculator-summary h3,
	.goals-calculator-copy p,
	.goals-calculator-summary p {
		margin: 0;
	}

	.goals-calculator-copy p,
	.goals-calculator-summary p {
		color: var(--muted);
		font-size: 0.92rem;
	}

	.goals-calculator-summary {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.goals-calculator-summary div {
		padding: 0.8rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: #fff;
	}

	.goals-calculator-actions {
		display: flex;
		gap: 0.75rem;
	}

	.goals-calculator-actions button {
		flex: 1;
	}

	label {
		display: grid;
		gap: 0.35rem;
	}

	label span {
		color: var(--muted);
		font-size: 0.84rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	input,
	select,
	button {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: #fff;
		color: var(--text);
		font: inherit;
		padding: 0.72rem 0.82rem;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease,
			box-shadow 0.2s ease;
	}

	input:focus,
	select:focus,
	button:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px rgba(196, 168, 130, 0.16);
	}

	button {
		cursor: pointer;
		background: #fff;
		color: var(--text);
	}

	button:hover:not(:disabled) {
		border-color: var(--accent);
		background: #fff;
	}

	button.secondary {
		background: transparent;
	}

	input:disabled,
	select:disabled,
	button:disabled {
		cursor: not-allowed;
		color: var(--muted);
		background: #f5f2ee;
		box-shadow: none;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	.actions button {
		flex: 1;
	}

	.results {
		display: grid;
		gap: 1.15rem;
	}

	.results-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.cards {
		display: grid;
		gap: 1rem;
	}

	.card {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
		background: #fff;
	}

	.choices {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0.7rem;
		margin-top: 0.9rem;
	}

	.choice {
		padding: 0.9rem 0 0;
		border-top: 1px solid var(--border);
		border-radius: 0;
		background: transparent;
	}

	.choice-rank {
		margin: 0;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted);
		margin-bottom: 0.35rem;
	}

	@media (max-width: 720px) {
		.field-grid,
		.field-grid--macros,
		.field-grid--calculator,
		.goals-calculator-summary,
		.results-header {
			grid-template-columns: 1fr;
		}

		.results-header {
			display: grid;
		}

		.section-heading--split {
			grid-template-columns: 1fr;
		}

		.actions {
			flex-direction: column;
		}

		.goals-calculator-actions {
			flex-direction: column;
		}

		.panel-section--compact {
			max-width: none;
		}
	}

	@media (max-width: 480px) {
		.dining {
			padding: 1.5rem 0 3rem;
		}

		.control-panel,
		.results,
		.error,
		.empty,
		.card {
			padding: 1rem;
			border-radius: 8px;
		}
	}
</style>
