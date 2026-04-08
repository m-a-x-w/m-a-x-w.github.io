<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/work', label: 'Work' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' },
		{ href: '/thoughts', label: 'Thoughts' }
	];
</script>

<nav>
	<a href="/" class="home" class:active={page.url.pathname === '/'}>MW</a>
	<div class="links">
		{#each links as { href, label }}
			<a {href} class:active={page.url.pathname.startsWith(href)}>{label}</a>
		{/each}
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;
	}

	.home {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		letter-spacing: 0.02em;
	}

	.links {
		display: flex;
		gap: 1.8rem;
	}

	a {
		color: var(--muted);
		font-size: 0.9rem;
		letter-spacing: 0.01em;
	}

	a:hover,
	a.active {
		color: var(--text);
	}

	@media (max-width: 480px) {
		.links {
			gap: 1.2rem;
		}

		a {
			font-size: 0.85rem;
		}
	}
</style>
