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

test('summarizeDiningApiPayload detects court data without nutrition facts', async () => {
	const module = await importTypeScriptModule(new URL('../src/lib/dining/diagnostics.ts', import.meta.url));
	const payload = {
		data: {
			diningCourtByName: {
				name: 'Earhart',
				dailyMenu: {
					meals: [
						{
							name: 'Breakfast',
							stations: [
								{
									name: 'Granite Grill',
									items: [
										{
											item: {
												itemId: '123',
												name: 'Scrambled Eggs',
												isNutritionReady: true,
												traits: []
											}
										}
									]
								}
							]
						}
					]
				}
			}
		}
	};

	assert.deepEqual(module.summarizeDiningApiPayload(payload), {
		sawCourtData: true,
		sawMeals: true,
		sawItems: true,
		sawNutritionFacts: false
	});
});

test('refineDiningRuntimeError explains false API-unreachable errors', async () => {
	const module = await importTypeScriptModule(new URL('../src/lib/dining/diagnostics.ts', import.meta.url));
	const message = module.refineDiningRuntimeError('Could not reach Purdue dining API', {
		sawCourtData: true,
		sawMeals: true,
		sawItems: true,
		sawNutritionFacts: false
	});

	assert.match(message, /reached the Purdue dining API/i);
	assert.match(message, /without nutrition facts/i);
});
