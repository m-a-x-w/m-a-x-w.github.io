export type MacroGoals = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
};

export type DiningLocation = (typeof DINING_LOCATIONS)[number];
export type DiningMeal = (typeof DINING_MEALS)[number]['value'];
export type DiningDiversity = (typeof DINING_DIVERSITY_OPTIONS)[number]['value'];

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

export const DINING_DIVERSITY_OPTIONS = [
	{ value: 'balanced', label: 'Balanced' },
	{ value: 'familiar', label: 'Familiar' },
	{ value: 'adventurous', label: 'Adventurous' }
] as const;

export const DEFAULT_DINING_PARAMS: DiningRecommendParams = {
	location: 'Earhart',
	meal: 'lunch',
	date: '',
	goals: {
		calories: 750,
		protein: 45,
		carbs: 70,
		fat: 25
	},
	diversity: 'balanced'
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
