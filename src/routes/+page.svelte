<script lang="ts">
	import { work } from '$lib/data/work';
	import { projects } from '$lib/data/projects';
</script>

<svelte:head>
	<title>Max Weinstein</title>
	<meta name="description" content="Max Weinstein -- reverse engineering, program analysis." />
	<meta property="og:title" content="Max Weinstein" />
	<meta
		property="og:description"
		content="Max Weinstein -- reverse engineering, program analysis."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://maxweinstein.dev" />
</svelte:head>

<header class="hero">
	<h1><span class="prompt">$</span> max weinstein</h1>
	<p class="tagline">reverse engineering, program analysis</p>
</header>

<section>
	<h2>Work</h2>
	<ul class="list">
		{#each work as entry}
			<li>
				<div><strong>{entry.role}</strong> <span class="muted">@ {entry.company}</span></div>
				<p class="muted"><span class="period">{entry.period}</span> · {entry.description}</p>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Projects</h2>
	<ul class="list">
		{#each projects as project}
			<li>
				<div class="row">
					<a href="/projects/{project.slug}"><strong>{project.title}</strong></a>
					<span class="links muted">
						{#if project.url}<a href={project.url}>site</a>{/if}
						{#if project.url && project.repo}<span class="sep">/</span>{/if}
						{#if project.repo}<a href={project.repo} target="_blank" rel="noopener">code</a>{/if}
					</span>
				</div>
				<p class="muted">{project.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		margin-bottom: 2.5rem;
	}

	.hero h1 {
		margin-bottom: 0.2rem;
	}

	.prompt {
		color: var(--accent);
		margin-right: 0.4em;
	}

	.tagline {
		color: var(--muted);
	}

	section {
		margin-bottom: 2.5rem;
	}

	.list {
		list-style: none;
		padding: 0;
	}

	.list li {
		padding: 0.7rem 0;
		border-top: 1px solid var(--border);
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.muted {
		color: var(--muted);
	}

	.period {
		color: var(--accent);
		opacity: 0.8;
	}

	.links {
		font-size: 0.85rem;
	}

	.links a {
		color: var(--muted);
	}

	.links a:hover {
		color: var(--accent);
	}

	.sep {
		margin: 0 0.4em;
		color: var(--border);
	}

	p {
		font-size: 0.9rem;
	}
</style>
