import {
	DINING_ALL_LOCATIONS,
	DINING_ALL_MEALS,
	DEFAULT_DINING_PAGE_PARAMS,
	type DiningChoiceResult,
	DINING_LOCATIONS,
	DINING_MEALS,
	type DiningLocation,
	type DiningLocationMealResult,
	type DiningMeal,
	type DiningPageParams,
	type DiningRecommendParams,
	type DiningRecommendResult
} from './types';
import type { DiningGoalsCalculatorOutput } from './goals-calculator';

const DINING_LOCATION_ORDER = new Map<DiningLocation, number>(
	DINING_LOCATIONS.map((location, index) => [location, index] as const)
);

const DINING_MEAL_ORDER = new Map<DiningMeal, number>(
	DINING_MEALS.map((meal, index) => [meal.value, index] as const)
);

function cloneDiningGoals(goals: DiningPageParams['goals']): DiningPageParams['goals'] {
	return { ...goals };
}

export function formatRepeatedDiningItemNames(names: string[]): string {
	const counts = new Map<string, number>();

	for (const name of names) {
		counts.set(name, (counts.get(name) ?? 0) + 1);
	}

	return [...counts.entries()]
		.map(([name, count]) => formatDiningItemName(name, count))
		.join(', ');
}

export function getDiningChoiceEntreeCount(choice: DiningChoiceResult): number {
	return 1 + choice.sides.filter((side) => side.name === choice.entree.name).length;
}

export function getDiningChoiceSideNames(choice: DiningChoiceResult): string[] {
	return choice.sides
		.filter((side) => side.name !== choice.entree.name)
		.map((side) => side.name);
}

export function formatDiningItemName(name: string, count = 1): string {
	return count > 1 ? `${name} (${count}x)` : name;
}

export function createDiningPageParams(): DiningPageParams {
	return {
		...DEFAULT_DINING_PAGE_PARAMS,
		goals: cloneDiningGoals(DEFAULT_DINING_PAGE_PARAMS.goals)
	};
}

export function applyDiningGoalsCalculatorResult(
	params: DiningPageParams,
	result: DiningGoalsCalculatorOutput
): DiningPageParams {
	return {
		...params,
		goals: {
			calories: result.perMeal.calories,
			protein: result.perMeal.protein,
			carbs: result.perMeal.carbs,
			fat: result.perMeal.fat
		}
	};
}

export function describeDiningScope(params: DiningPageParams): string {
	const hallText =
		params.location === DINING_ALL_LOCATIONS ? 'all dining halls' : params.location;
	const mealText =
		params.meal === DINING_ALL_MEALS
			? 'all meals'
			: DINING_MEALS.find((option) => option.value === params.meal)?.label.toLowerCase() ??
				params.meal;

	return `${hallText}, ${mealText}`;
}

export function buildDiningRequestPlan(
	params: DiningPageParams
): DiningRecommendParams[] {
	const locations =
		params.location === DINING_ALL_LOCATIONS ? [...DINING_LOCATIONS] : [params.location];
	const meals =
		params.meal === DINING_ALL_MEALS ? DINING_MEALS.map((meal) => meal.value) : [params.meal];

	return locations.flatMap((location) =>
		meals.map((meal) => ({
			location,
			meal,
			date: params.date,
			goals: cloneDiningGoals(params.goals),
			diversity: params.diversity
		}))
	);
}

export function sortDiningResults(
	results: DiningLocationMealResult[]
): DiningLocationMealResult[] {
	return [...results].sort((left, right) => {
		const locationDelta =
			(DINING_LOCATION_ORDER.get(left.location) ?? Number.MAX_SAFE_INTEGER) -
			(DINING_LOCATION_ORDER.get(right.location) ?? Number.MAX_SAFE_INTEGER);

		if (locationDelta !== 0) {
			return locationDelta;
		}

		return (
			(DINING_MEAL_ORDER.get(left.meal) ?? Number.MAX_SAFE_INTEGER) -
			(DINING_MEAL_ORDER.get(right.meal) ?? Number.MAX_SAFE_INTEGER)
		);
	});
}

export async function runDiningRecommendations(
	params: DiningPageParams,
	recommend: (params: DiningRecommendParams) => Promise<DiningRecommendResult>
): Promise<DiningRecommendResult> {
	const requests = buildDiningRequestPlan(params);
	const responses = await Promise.all(requests.map((request) => recommend(request)));
	const firstError = responses.find((response) => response.error)?.error ?? '';

	if (firstError) {
		return {
			error: firstError,
			results: []
		};
	}

	return {
		error: '',
		results: sortDiningResults(responses.flatMap((response) => response.results))
	};
}
