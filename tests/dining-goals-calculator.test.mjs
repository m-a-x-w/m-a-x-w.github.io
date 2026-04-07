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
		proteinPerPound: 1
	});

	assert.deepEqual(result, {
		daily: {
			calories: 220,
			protein: 50,
			carbs: 0,
			fat: 2
		},
		perMeal: {
			calories: 73,
			protein: 17,
			carbs: 0,
			fat: 1
		}
	});

	assert.ok(macroCalories(result.daily) <= result.daily.calories);
});
