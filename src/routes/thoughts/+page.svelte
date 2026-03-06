<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Thoughts -- Max Weinstein</title>
	<meta name="description" content="Writing about code, tools, and things I find interesting." />
	<meta property="og:title" content="Thoughts -- Max Weinstein" />
	<meta property="og:description" content="Writing about code, tools, and things I find interesting." />
</svelte:head>

<section class="blog">
	<h1>Thoughts</h1>

	{#if data.posts.length === 0}
		<p class="empty">Nothing here yet.</p>
	{:else}
		<ul class="posts">
			{#each data.posts as post}
				<li>
					<a href="/thoughts/{post.slug}">
						<span class="title">{post.title}</span>
						<span class="date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
					</a>
					{#if post.description}
						<p>{post.description}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.blog {
		padding: 2rem 0;
	}

	.posts {
		list-style: none;
		padding: 0;
	}

	.posts li {
		padding: 1.3rem 0;
		border-bottom: 1px solid var(--border);
	}

	.posts li:first-child {
		padding-top: 0;
	}

	.posts li:last-child {
		border-bottom: none;
	}

	.posts a {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}

	.title {
		font-weight: 600;
	}

	.date {
		color: var(--muted);
		font-size: 0.85rem;
		white-space: nowrap;
	}

	p {
		color: var(--muted);
		font-size: 0.9rem;
		margin-top: 0.3rem;
	}

	.empty {
		color: var(--muted);
	}
</style>
