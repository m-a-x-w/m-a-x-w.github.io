# Dining WASM Website Design

Date: 2026-04-07

## Goal

Add a new `wmax.dev/dining` page to this SvelteKit site that presents a live demo interface for the Purdue dining recommender compiled to WebAssembly. The website work in this repo should deliver the full page, client-side WASM integration points, and a graceful fallback state for when the WASM assets have not yet been copied into the site.

This repo will not build or generate the Go WASM artifacts. It will assume those assets are added later under `static/dining/`.

## Constraints

- Keep the page visually consistent with the existing site shell and typography.
- Do not require the WASM assets to exist during implementation or build verification.
- Keep browser-only WASM code out of SSR execution paths.
- Match the request and response structure described in the Purdue dining WASM implementation plan.
- Prefer a small, maintainable frontend surface over a highly dynamic app architecture.

## Recommended Approach

Implement a dedicated `/dining` route with a small browser-only loader module:

- `src/routes/dining/+page.svelte` renders the form, handles loading state, invokes the recommender, and displays results.
- `src/lib/dining/wasm.ts` loads `wasm_exec.js`, fetches the `.wasm` binary, waits for the exported JS function, and exposes a typed `recommend` entry point to the page.

This keeps the UI and runtime concerns separate and lets the real binary be dropped in later without redesigning the page.

## Rejected Alternatives

### Embed the demo under `/projects`

This conflicts with the explicit `wmax.dev/dining` destination and would make the demo feel secondary instead of being a first-class route.

### Build a static mock page first

This would produce throwaway UI logic and delay integration work that can be cleanly designed now.

## Route and Navigation

Add a top-level route at `/dining`.

Navigation and discovery changes:

- add a `Dining` link to the main site navigation
- add the demo to the projects list as a discoverable item

The page should remain inside the existing shared layout and footer.

## Page Layout

The page should use the same restrained style as the rest of the site:

1. Intro section with title and a short description of the demo.
2. Controls block with the input form.
3. Runtime status or error message area.
4. Results section rendering recommendation cards.

The layout should be single-column and readable on mobile without introducing dashboard-style chrome or a separate design language.

## Form Inputs

The page should expose these inputs:

- dining hall
- meal
- optional date
- macro goals: calories, protein, carbs, fat
- diversity mode

The initial hall and meal options should be defined in the frontend as a small static list. This avoids introducing a separate metadata fetch dependency before the WASM assets are available. Backend validation remains the source of truth.

Suggested defaults:

- a reasonable default hall from the static list
- lunch as the default meal
- empty date, allowing the runtime to use its default
- practical default macro targets
- a default diversity mode that mirrors the WASM plan expectations

## WASM Asset Contract

The website will assume these assets are added later under `static/dining/`:

- `wasm_exec.js`
- the compiled `.wasm` binary

The exact binary filename can be centralized in the loader module as a constant so it is easy to change once the asset is copied in.

The loader must:

- run only in the browser
- load `wasm_exec.js` before instantiating the binary
- fetch and instantiate the `.wasm` asset
- wait for the exported recommend function to become available on `window`
- return descriptive errors if any of those steps fail

## Frontend Runtime States

The page should support these explicit states:

- idle, runtime still loading
- ready to recommend
- unavailable because `wasm_exec.js` is missing
- unavailable because the `.wasm` binary is missing
- unavailable because the exported JS function is missing after startup
- request in flight
- recommendation error returned by the runtime
- success with results

If the runtime is unavailable, the page should still render fully and explain what asset path is expected. Inputs and the submit button should be disabled in that state.

## Request and Response Types

The TypeScript request shape should mirror the WASM plan:

```ts
type DiningRecommendParams = {
	location: string;
	meal: string;
	date: string;
	goals: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
	diversity: string;
};
```

The response shape should also mirror the plan:

```ts
type DiningRecommendResult = {
	error: string;
	results: Array<{
		location: string;
		meal: string;
		choices: Array<{
			rank: number;
			entree: ItemResult;
			sides: ItemResult[];
			totals: MacroTotals;
			coverage: MacroTotals;
		}>;
	}>;
};
```

The frontend should avoid adding an unnecessary adapter layer beyond light parsing and validation for display.

## Results Rendering

Results should render as a simple stacked list:

- a heading for the returned location and meal
- one card per ranked choice
- entree and side breakdown
- macro totals
- coverage percentages

Cards should use the existing site border, muted text, and accent system rather than introducing bright badges or dashboard visuals.

## Error Handling

Errors should be specific and readable. The page should distinguish between:

- asset loading failures
- runtime export availability failures
- malformed response handling failures
- application errors returned from the recommender

The loader should surface actionable messages so the missing-asset state is obvious during local development and after deployment.

## SSR and Build Safety

The route must not access `window`, `document`, `Go`, or the exported WASM function during SSR. Browser-only initialization should happen after mount or through lazy runtime checks.

The build must succeed even when `static/dining/` does not yet contain the runtime files.

## Testing and Verification

The implementation should be verified with:

- `npm run check`
- `npm run build`
- manual inspection that `/dining` renders without WASM assets present and shows the expected unavailable state

## Planned Files

- create `src/routes/dining/+page.svelte`
- create `src/lib/dining/wasm.ts`
- create `src/lib/dining/types.ts` if the route and loader benefit from shared types
- update `src/lib/components/Nav.svelte`
- update `src/lib/data/projects.ts`

## Scope Boundaries

This work does not include:

- generating the Go WASM binary
- adding backend APIs
- fetching live hall or meal metadata from another service
- redesigning the rest of the site

## Open Assumptions

- The Go WASM runtime will expose a single browser-callable recommend function compatible with the plan.
- The runtime will accept a JSON string or equivalent typed payload without requiring additional frontend-side orchestration.
- The final asset filenames can be adjusted in one place once the artifacts are copied into `static/dining/`.
