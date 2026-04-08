type DiningApiObservation = {
	sawCourtData: boolean;
	sawMeals: boolean;
	sawItems: boolean;
	sawNutritionFacts: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function collectItems(value: unknown): unknown[] {
	if (!Array.isArray(value)) return [];

	const collected: unknown[] = [];
	for (const entry of value) {
		if (!isRecord(entry)) continue;

		if (Array.isArray(entry.items)) {
			collected.push(...entry.items);
		}
	}

	return collected;
}

function hasNutritionFacts(value: unknown): boolean {
	if (!isRecord(value)) return false;
	if (isRecord(value.nutritionFacts)) return true;

	if (isRecord(value.item) && isRecord(value.item.nutritionFacts)) {
		return true;
	}

	return false;
}

export function summarizeDiningApiPayload(value: unknown): DiningApiObservation | null {
	if (!isRecord(value) || !isRecord(value.data) || !isRecord(value.data.diningCourtByName)) {
		return null;
	}

	const court = value.data.diningCourtByName;
	const meals = isRecord(court.dailyMenu) && Array.isArray(court.dailyMenu.meals) ? court.dailyMenu.meals : [];
	const stations = meals.flatMap((meal) =>
		isRecord(meal) && Array.isArray(meal.stations) ? meal.stations : []
	);
	const items = collectItems(stations);

	return {
		sawCourtData: true,
		sawMeals: meals.length > 0,
		sawItems: items.length > 0,
		sawNutritionFacts: items.some(hasNutritionFacts)
	};
}

export function refineDiningRuntimeError(
	message: string,
	observation: DiningApiObservation | null
): string {
	if (message !== 'Could not reach Purdue dining API' || !observation?.sawCourtData) {
		return message;
	}

	if (observation.sawItems && !observation.sawNutritionFacts) {
		return 'Dining runtime reached the Purdue dining API, but the response came back without nutrition facts. The current WASM build appears out of sync with the live API schema.';
	}

	return 'Dining runtime reached the Purdue dining API, but could not use the response returned by the live API.';
}
