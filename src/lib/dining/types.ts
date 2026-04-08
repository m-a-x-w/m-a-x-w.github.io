import {
	DEFAULT_DINING_GOALS_CALCULATOR_INPUT,
	calculateDiningGoalTargets
} from './goals-calculator';

export type MacroGoals = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
};

const DEFAULT_DINING_GOALS = calculateDiningGoalTargets(
	DEFAULT_DINING_GOALS_CALCULATOR_INPUT
).perMeal;

function createDefaultDiningSharedValues() {
	return {
		goals: { ...DEFAULT_DINING_GOALS },
		diversity: 'balanced' as const
	};
}

export const DINING_ALL_LOCATIONS = 'all' as const;
export const DINING_ALL_MEALS = 'all' as const;

export type DiningLocation = (typeof DINING_LOCATIONS)[number];
export type DiningMeal = (typeof DINING_MEALS)[number]['value'];
export type DiningDiversity = (typeof DINING_DIVERSITY_OPTIONS)[number]['value'];
export type DiningLocationSelection = DiningLocation | typeof DINING_ALL_LOCATIONS;
export type DiningMealSelection = DiningMeal | typeof DINING_ALL_MEALS;

export type DiningPageParams = {
	location: DiningLocationSelection;
	meal: DiningMealSelection;
	date: string;
	goals: MacroGoals;
	diversity: DiningDiversity;
};

export type DiningRecommendParams = {
	location: DiningLocation;
	meal: DiningMeal;
	date: string;
	goals: MacroGoals;
	diversity: DiningDiversity;
};

export type DiningItemResult = {
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
};

export type DiningChoiceResult = {
	rank: number;
	entree: DiningItemResult;
	sides: DiningItemResult[];
	totals: MacroGoals;
	coverage: MacroGoals;
};

export type DiningLocationMealResult = {
	location: DiningLocation;
	meal: DiningMeal;
	choices: DiningChoiceResult[];
};

export type DiningRecommendResult = {
	error: string;
	results: DiningLocationMealResult[];
};

export const DINING_LOCATIONS = ['Earhart', 'Ford', 'Hillenbrand', 'Wiley', 'Windsor'] as const;

export const DINING_MEALS = [
	{ value: 'breakfast', label: 'Breakfast' },
	{ value: 'lunch', label: 'Lunch' },
	{ value: 'dinner', label: 'Dinner' }
] as const;

export const DINING_LOCATION_OPTIONS = [
	{ value: DINING_ALL_LOCATIONS, label: 'All halls' },
	...DINING_LOCATIONS.map((location) => ({ value: location, label: location }))
] as const;

export const DINING_MEAL_OPTIONS = [
	{ value: DINING_ALL_MEALS, label: 'All meals' },
	...DINING_MEALS
] as const;

export const DINING_DIVERSITY_OPTIONS = [
	{ value: 'balanced', label: 'Standard' },
	{ value: 'familiar', label: 'Repeat-friendly' },
	{ value: 'adventurous', label: 'More variety' }
] as const;

export const DEFAULT_DINING_PARAMS: DiningRecommendParams = {
	location: 'Earhart',
	meal: 'lunch',
	date: '',
	...createDefaultDiningSharedValues()
};

export const DEFAULT_DINING_PAGE_PARAMS: DiningPageParams = {
	location: DINING_ALL_LOCATIONS,
	meal: 'lunch',
	date: '',
	...createDefaultDiningSharedValues()
};

export type DiningRecommendResultShape = {
	error: string;
	results: unknown[];
};

export function isDiningRecommendResult(value: unknown): value is DiningRecommendResultShape {
	if (!value || typeof value !== 'object') return false;

	const candidate = value as Partial<DiningRecommendResultShape>;

	return typeof candidate.error === 'string' && Array.isArray(candidate.results);
}
