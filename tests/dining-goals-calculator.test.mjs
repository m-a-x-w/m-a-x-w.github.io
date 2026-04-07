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

	assert.equal(result.daily.protein, 144);
	assert.equal(result.perMeal.protein, 36);
	assert.ok(result.daily.calories > 2000);
	assert.ok(result.perMeal.calories > 500);
	assert.ok(result.daily.carbs >= 0);
});

test('calculateDiningGoalTargets clamps impossible carb allocations', async () => {
	const module = await importTypeScriptModule(
		new URL('../src/lib/dining/goals-calculator.ts', import.meta.url)
	);

	const result = module.calculateDiningGoalTargets({
		sex: 'female',
		age: 30,
		heightFeet: 5,
		heightInches: 2,
		weightPounds: 110,
		activityLevel: 'light',
		mealsPerDay: 3,
		proteinPerPound: 4
	});

	assert.equal(result.daily.carbs, 0);
	assert.ok(result.daily.fat >= 0);
	assert.equal(result.perMeal.carbs, 0);
});
