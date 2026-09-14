<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="site">
	{#if page.url.pathname !== '/'}
		<a class="home" href="/">&larr; max weinstein</a>
	{/if}
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.site {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2.5rem 1.5rem 2rem;
	}

	.home {
		display: inline-block;
		color: var(--muted);
		font-size: 0.85rem;
		margin-bottom: 2rem;
	}
</style>
