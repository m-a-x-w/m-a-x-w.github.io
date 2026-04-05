<script lang="ts">
	import type { Component } from 'svelte';
	import type { Project } from '$lib/data/projects';

	let { data }: { data: { project: Project; content: Component | null; meta: Record<string, string> | undefined } } = $props();

	const Content = $derived(data.content);

	let lightboxSrc = $state<string | null>(null);

	function handleContentClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'IMG') {
			lightboxSrc = (target as HTMLImageElement).src;
		}
	}

	function closeLightbox() {
		lightboxSrc = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && lightboxSrc) closeLightbox();
	}
</script>

<svelte:head>
	<title>{data.project.title} -- Max Weinstein</title>
	<meta name="description" content={data.project.description} />
	<meta property="og:title" content="{data.project.title} -- Max Weinstein" />
	<meta property="og:description" content={data.project.description} />
</svelte:head>

<article class="project">
	<header>
		<h1>{data.project.title}</h1>
		<p class="desc">{data.project.description}</p>
	</header>

	{#if data.project.stack?.length}
		<div class="stack">
			{#each data.project.stack as tech}
				<span>{tech}</span>
			{/each}
		</div>
	{/if}

	{#if Content}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="content" onclick={handleContentClick}>
			<Content />
		</div>
	{:else if data.project.details}
		<div class="body">
			<p>{data.project.details}</p>
		</div>
	{/if}

	<div class="links">
		{#if data.project.url}
			<a href={data.project.url} target="_blank" rel="noopener">Visit site</a>
		{/if}
		{#if data.project.repo}
			<a href={data.project.repo} target="_blank" rel="noopener">Source code</a>
		{/if}
	</div>

	<footer>
		<a href="/projects">&larr; All projects</a>
	</footer>
</article>

<svelte:window onkeydown={handleKeydown} />

{#if lightboxSrc}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox" onclick={closeLightbox}>
		<img src={lightboxSrc} alt="" />
	</div>
{/if}

<style>
	.project {
		padding: 2rem 0;
	}

	header {
		margin-bottom: 1rem;
	}

	header h1 {
		margin-bottom: 0.25rem;
	}

	.desc {
		color: var(--muted);
		font-size: 1rem;
	}

	.content {
		line-height: 1.8;
		margin-bottom: 2rem;
	}

	.content :global(h2) {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}

	.content :global(h3) {
		margin-top: 1.5rem;
		margin-bottom: 0.4rem;
	}

	.content :global(pre) {
		background: #f5f2ee;
		padding: 1rem 1.2rem;
		border-radius: 4px;
		overflow-x: auto;
		font-size: 0.88rem;
		margin: 1.2rem 0;
	}

	.content :global(code) {
		font-size: 0.9em;
		background: #f5f2ee;
		padding: 0.15em 0.35em;
		border-radius: 3px;
	}

	.content :global(pre code) {
		background: none;
		padding: 0;
	}

	.content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 6px;
		margin: 1.2rem 0;
		cursor: zoom-in;
		transition: opacity 0.15s ease;
	}

	.content :global(img):hover {
		opacity: 0.85;
	}

	.content :global(blockquote) {
		border-left: 2px solid var(--border);
		padding-left: 1rem;
		color: var(--muted);
		margin: 1.2rem 0;
	}

	.body {
		margin-bottom: 2rem;
		line-height: 1.8;
	}

	.stack {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.stack span {
		font-size: 0.8rem;
		color: var(--muted);
		border: 1px solid var(--border);
		padding: 0.2em 0.6em;
		border-radius: 3px;
	}

	.links {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
		font-size: 0.9rem;
	}

	.links a {
		color: var(--muted);
	}

	.links a:hover {
		color: var(--accent);
	}

	footer {
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	footer a {
		color: var(--muted);
		font-size: 0.9rem;
	}

	footer a:hover {
		color: var(--accent);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: zoom-out;
		backdrop-filter: blur(4px);
	}

	.lightbox img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}
</style>
