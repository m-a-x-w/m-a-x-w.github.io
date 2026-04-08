# Dining Page Refresh Design

## Goal

Refresh the `/dining` page so it feels like part of the existing site instead of a raw demo, while expanding the controls to cover the useful recommendation modes already present in the Purdue dining tracker.

## Desired Outcome

- Keep the page visually consistent with the rest of the site.
- Make the form faster to understand and easier to use.
- Add explicit `All halls` and `All meals` options.
- Preserve direct access to the existing dining recommendation runtime.
- Expose more of the tracker behavior without turning the page into a CLI replica.

## Product Shape

Use one unified interface instead of separate "single hall" and "cross-hall" modes.

The user should be able to:

- choose a single hall or `All halls`
- choose a single meal or `All meals`
- choose a date
- tune diversity
- set macro goals
- optionally refine hall scope with include/exclude filters when browsing across halls

The interface should adapt naturally:

- If a single hall is selected, results may span one or more meals depending on the meal selector.
- If `All halls` is selected, results should be grouped and labeled clearly by hall and meal.
- If `All meals` is selected, the page should show the best available meal groups rather than forcing a narrower picker.

## Layout

Split the page into three stacked zones:

1. Hero intro with a concise explanation and runtime status.
2. A polished control panel with grouped sections.
3. Results cards with stronger hierarchy and easier scanning.

The control panel should contain:

- a primary "Scope" section for hall, meal, and date
- a "Goals" section for calories, protein, carbs, and fat
- a compact "Tuning" section for diversity and optional advanced hall filters
- action controls for recommend and reset

## Visual Direction

Preserve the site's serif heading, muted palette, and restrained editorial tone.

Improve the current page with:

- section containers
- better spacing and alignment
- more intentional button and input styling
- stronger labels and helper copy
- summary chips or pills for selected scope and runtime state

Avoid introducing a separate design language. This should still read as the same site.

## Interaction Behavior

Add first-class synthetic options to the existing selectors:

- hall: `All halls`
- meal: `All meals`

When these values are submitted, convert them into the appropriate request strategy expected by the dining runtime. The page should keep the unified UX while mapping that input onto the runtime behavior.

If the runtime only supports a narrower parameter shape today, the page should expand a broad selection into the necessary sequence of requests and merge the results client-side.

## Result Presentation

Results should be easier to scan than the current ordered list inside plain cards.

For each result group:

- show hall and meal prominently
- show top recommendations with better separation between entree, sides, totals, and coverage
- show a compact macro summary
- preserve ranking order

At the page level:

- include a short results summary describing the selected scope
- show empty and error states with clearer copy

## Data and Runtime Strategy

Keep using the current WASM runtime entry point.

To support `All halls` and `All meals`, the page layer may need to orchestrate multiple recommendation calls:

- all halls + one meal: request each hall for the chosen meal, then combine and sort
- one hall + all meals: request the hall for each meal, then combine
- all halls + all meals: request the cartesian set and combine

Shared helpers should normalize and sort the merged results so the page presents a single coherent response.

## Testing

Verify:

- the page renders with the refreshed layout
- `All halls` returns grouped multi-hall results
- `All meals` returns grouped multi-meal results
- combined `All halls` + `All meals` works
- reset restores sensible defaults
- runtime unavailable and runtime error states remain clear

## Scope Boundaries

In scope:

- `/dining` page redesign
- broader filtering and scope controls
- client-side aggregation for broad selectors

Out of scope:

- changing the site-wide theme
- rebuilding the dining runtime itself
- adding profile management UI from the CLI
