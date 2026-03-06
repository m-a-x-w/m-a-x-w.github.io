<script lang="ts">
	import { projects } from '$lib/data/projects';
</script>

<svelte:head>
	<title>Projects -- Max Weinstein</title>
	<meta name="description" content="Side projects and open source work." />
	<meta property="og:title" content="Projects -- Max Weinstein" />
	<meta property="og:description" content="Side projects and open source work." />
</svelte:head>

<section class="projects">
	<h1>Projects</h1>

	<ul class="list">
		{#each projects as project}
			<li>
				<div class="header">
					<a href="/projects/{project.slug}" class="title">{project.title}</a>
					<span class="links">
						{#if project.url}
							<a href={project.url} target="_blank" rel="noopener">site</a>
						{/if}
						{#if project.repo}
							{#if project.url}<span class="sep">/</span>{/if}
							<a href={project.repo} target="_blank" rel="noopener">code</a>
						{/if}
					</span>
				</div>
				<p>{project.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.projects {
		padding: 2rem 0;
	}

	.list {
		list-style: none;
		padding: 0;
	}

	.list li {
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--border);
	}

	.list li:first-child {
		padding-top: 0;
	}

	.list li:last-child {
		border-bottom: none;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 0.3rem;
	}

	.links {
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.links a {
		color: var(--muted);
	}

	.links a:hover {
		color: var(--accent);
	}

	.sep {
		color: var(--border);
		margin: 0 0.15rem;
	}

	.title {
		font-weight: 600;
	}

	p {
		color: var(--muted);
		font-size: 0.95rem;
	}
</style>
