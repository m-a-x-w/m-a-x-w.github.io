import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

async function importTypeScriptModule(path) {
	const source = await readFile(path, 'utf8');
	const transpiled = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.ES2022,
			target: ts.ScriptTarget.ES2022
		}
	});
	const encoded = Buffer.from(transpiled.outputText, 'utf8').toString('base64');
	return import(`data:text/javascript;base64,${encoded}`);
}

function macroCalories(target) {
	return target.protein * 4 + target.carbs * 4 + target.fat * 9;
}

test('calculateDiningGoalTargets returns daily and per-meal values', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	const result = module.calculateDiningGoalTargets({
		sex: 'male',
		age: 21,
		heightFeet: 5,
		heightInches: 11,
		weightPounds: 180,
		activityLevel: 'moderate',
		mealsPerDay: 4,
		proteinPerPound: 0.8
	});

	assert.deepEqual(result, {
		daily: {
			calories: 2858,
			protein: 144,
			carbs: 392,
			fat: 79
		},
		perMeal: {
			calories: 715,
			protein: 36,
			carbs: 98,
			fat: 20
		}
	});

	assert.ok(macroCalories(result.daily) <= result.daily.calories);
});

test('calculateDiningGoalTargets clamps impossible carb allocations', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	const result = module.calculateDiningGoalTargets({
		sex: 'male',
		age: 18,
		heightFeet: 0,
		heightInches: 0,
		weightPounds: 50,
		activityLevel: 'moderate',
		mealsPerDay: 3,
		proteinPerPound: 10
	});

	assert.deepEqual(result, {
		daily: {
			calories: 220,
			protein: 55,
			carbs: 0,
			fat: 0
		},
		perMeal: {
			calories: 73,
			protein: 18,
			carbs: 0,
			fat: 0
		}
	});

	assert.ok(macroCalories(result.daily) <= result.daily.calories);
	assert.equal(macroCalories(result.daily), 220);
});

test('calculateDiningGoalTargets sanitizes non-finite numeric inputs', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	const result = module.calculateDiningGoalTargets({
		sex: 'male',
		age: -5,
		heightFeet: NaN,
		heightInches: -2,
		weightPounds: -10,
		activityLevel: 'moderate',
		mealsPerDay: NaN,
		proteinPerPound: NaN
	});

	assert.deepEqual(result, {
		daily: {
			calories: 8,
			protein: 0,
			carbs: 2,
			fat: 0
		},
		perMeal: {
			calories: 8,
			protein: 0,
			carbs: 2,
			fat: 0
		}
	});
	assert.ok(Number.isFinite(result.daily.calories));
	assert.ok(Number.isFinite(result.daily.protein));
	assert.ok(Number.isFinite(result.daily.carbs));
	assert.ok(Number.isFinite(result.daily.fat));
	assert.ok(Number.isFinite(result.perMeal.calories));
	assert.ok(Number.isFinite(result.perMeal.protein));
	assert.ok(Number.isFinite(result.perMeal.carbs));
	assert.ok(Number.isFinite(result.perMeal.fat));
	assert.ok(macroCalories(result.daily) <= result.daily.calories);
});

test('goals calculator exports defaults and activity options', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	assert.deepEqual(module.DEFAULT_DINING_GOALS_CALCULATOR_INPUT, {
		sex: 'male',
		age: 18,
		heightFeet: 6,
		heightInches: 0,
		weightPounds: 195,
		activityLevel: 'moderate',
		mealsPerDay: 2,
		proteinPerPound: 0.9
	});
	assert.deepEqual(
		module.DINING_GOALS_CALCULATOR_ACTIVITY_OPTIONS.map((option) => option.value),
		['sedentary', 'light', 'moderate', 'active', 'very-active']
	);
});

test('calculateDiningGoalTargets falls back from invalid enum inputs', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	const valid = module.calculateDiningGoalTargets({
		sex: 'male',
		age: 25,
		heightFeet: 5,
		heightInches: 10,
		weightPounds: 150,
		activityLevel: 'moderate',
		mealsPerDay: 3,
		proteinPerPound: 1.2
	});

	const invalid = module.calculateDiningGoalTargets({
		sex: 'unknown',
		age: 25,
		heightFeet: 5,
		heightInches: 10,
		weightPounds: 150,
		activityLevel: 'wild',
		mealsPerDay: 3,
		proteinPerPound: 1.2
	});

	assert.deepEqual(invalid, valid);
	assert.ok(Number.isFinite(invalid.daily.calories));
	assert.ok(Number.isFinite(invalid.daily.protein));
	assert.ok(Number.isFinite(invalid.daily.carbs));
	assert.ok(Number.isFinite(invalid.daily.fat));
	assert.ok(Number.isFinite(invalid.perMeal.calories));
	assert.ok(Number.isFinite(invalid.perMeal.protein));
	assert.ok(Number.isFinite(invalid.perMeal.carbs));
	assert.ok(Number.isFinite(invalid.perMeal.fat));
	assert.ok(macroCalories(invalid.daily) <= invalid.daily.calories);
});
