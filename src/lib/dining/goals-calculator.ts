export type DiningGoalsCalculatorSex = 'male' | 'female';

export type DiningGoalsCalculatorActivity =
	| 'sedentary'
	| 'light'
	| 'moderate'
	| 'active'
	| 'very-active';

export type DiningGoalsCalculatorInput = {
	sex: DiningGoalsCalculatorSex;
	age: number;
	heightFeet: number;
	heightInches: number;
	weightPounds: number;
	activityLevel: DiningGoalsCalculatorActivity;
	mealsPerDay: number;
	proteinPerPound: number;
};

export type DiningGoalsCalculatorOutput = {
	daily: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
	perMeal: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
};

const ACTIVITY_MULTIPLIERS: Record<DiningGoalsCalculatorActivity, number> = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	'very-active': 1.9
};

function roundWhole(value: number): number {
	return Math.max(0, Math.round(value));
}

function inchesToCentimeters(feet: number, inches: number): number {
	return (feet * 12 + inches) * 2.54;
}

function poundsToKilograms(pounds: number): number {
	return pounds * 0.45359237;
}

function finiteNumber(value: number, fallback = 0): number {
	return Number.isFinite(value) ? value : fallback;
}

export function calculateDiningGoalTargets(
	input: DiningGoalsCalculatorInput
): DiningGoalsCalculatorOutput {
	const age = finiteNumber(input.age);
	const heightFeet = finiteNumber(input.heightFeet);
	const heightInches = finiteNumber(input.heightInches);
	const weightPounds = finiteNumber(input.weightPounds);
	const mealsPerDay = Math.max(1, Math.round(finiteNumber(input.mealsPerDay)));
	const proteinPerPound = Math.max(0.01, finiteNumber(input.proteinPerPound));
	const weightKilograms = poundsToKilograms(weightPounds);
	const heightCentimeters = inchesToCentimeters(heightFeet, heightInches);
	const sexOffset = input.sex === 'male' ? 5 : -161;
	const bmr = 10 * weightKilograms + 6.25 * heightCentimeters - 5 * age + sexOffset;
	const dailyCalories = roundWhole(bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]);
	const requestedProtein = roundWhole(weightPounds * proteinPerPound);
	const dailyProtein = Math.min(requestedProtein, Math.floor(dailyCalories / 4));
	const proteinCalories = dailyProtein * 4;

	let dailyFat = roundWhole((dailyCalories * 0.25) / 9);
	let fatCalories = dailyFat * 9;
	let remainingCalories = dailyCalories - proteinCalories - fatCalories;

	if (remainingCalories < 0) {
		dailyFat = Math.max(0, Math.floor((dailyCalories - proteinCalories) / 9));
		fatCalories = dailyFat * 9;
		remainingCalories = dailyCalories - proteinCalories - fatCalories;
	}

	const dailyCarbs = remainingCalories <= 0 ? 0 : Math.floor(remainingCalories / 4);

	return {
		daily: {
			calories: dailyCalories,
			protein: dailyProtein,
			carbs: dailyCarbs,
			fat: dailyFat
		},
		perMeal: {
			calories: roundWhole(dailyCalories / mealsPerDay),
			protein: roundWhole(dailyProtein / mealsPerDay),
			carbs: roundWhole(dailyCarbs / mealsPerDay),
			fat: roundWhole(dailyFat / mealsPerDay)
		}
	};
}
