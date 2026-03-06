import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { PageLoad } from './$types';
import type { Component } from 'svelte';

export const load: PageLoad = async ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		error(404, `Project not found: ${params.slug}`);
	}

	let content: Component | null = null;
	let meta: Record<string, string> | undefined = undefined;

	try {
		const md = await import(`../../../lib/projects/${params.slug}.md`);
		content = md.default;
		meta = md.metadata as Record<string, string>;
	} catch {
		// no markdown file for this project
	}

	return { project, content, meta };
};
