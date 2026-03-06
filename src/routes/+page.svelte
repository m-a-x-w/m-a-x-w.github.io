<svelte:head>
	<title>Max Weinstein</title>
	<meta name="description" content="Personal site of Max Weinstein -- CS @ Purdue." />
	<meta property="og:title" content="Max Weinstein" />
	<meta property="og:description" content="Personal site of Max Weinstein -- CS @ Purdue." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wmax.dev" />
</svelte:head>

<div class="landing">
	<h1>Max Weinstein</h1>
	<p class="tagline">cs @ purdue | machine learning & reverse engineering</p>

	<nav class="sections">
		<a href="/work">Work</a>
		<a href="/projects">Projects</a>
		<a href="/about">About</a>
		<a href="/thoughts">Thoughts</a>
	</nav>
</div>

<style>
	.landing {
		padding: 8rem 0 4rem;
	}

	h1 {
		font-size: 2.4rem;
		margin-bottom: 0.3em;
	}

	.tagline {
		color: var(--muted);
		font-size: 1.05rem;
		margin-bottom: 2.5rem;
	}

	.sections {
		display: flex;
		gap: 1.5rem;
	}

	.sections a {
		color: var(--muted);
		font-size: 0.95rem;
		border-bottom: 1px solid transparent;
		padding-bottom: 2px;
	}

	.sections a:hover {
		color: var(--text);
		border-bottom-color: var(--accent);
	}

	@media (max-width: 480px) {
		.landing {
			padding: 4rem 0 2rem;
		}

		h1 {
			font-size: 1.8rem;
		}
	}
</style>
