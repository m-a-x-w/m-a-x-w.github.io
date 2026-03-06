<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let formattedDate = $derived(
		new Date(data.meta.date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.meta.title} -- Max Weinstein</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content="{data.meta.title} -- Max Weinstein" />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="post">
	<header>
		<h1>{data.meta.title}</h1>
		<time datetime={data.meta.date}>{formattedDate}</time>
	</header>

	<div class="content">
		<Content />
	</div>

	<footer>
		<a href="/thoughts">&larr; Back to thoughts</a>
	</footer>
</article>

<style>
	.post {
		padding: 2rem 0;
	}

	header {
		margin-bottom: 2.5rem;
	}

	time {
		color: var(--muted);
		font-size: 0.9rem;
	}

	.content {
		line-height: 1.8;
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

	.content :global(blockquote) {
		border-left: 2px solid var(--border);
		padding-left: 1rem;
		color: var(--muted);
		margin: 1.2rem 0;
	}

	footer {
		margin-top: 3rem;
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
</style>
