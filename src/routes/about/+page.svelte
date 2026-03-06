<svelte:head>
	<title>About -- Max Weinstein</title>
	<meta name="description" content="About Max Weinstein -- CS student at Purdue." />
	<meta property="og:title" content="About -- Max Weinstein" />
	<meta property="og:description" content="About Max Weinstein -- CS student at Purdue." />
</svelte:head>

<section class="about">
	<h1>About</h1>

	<div class="prose">
		<p>I'm Max, a CS student at Purdue. I love taking things apart.</p>
	</div>

	<div class="contact">
		<h2>Get in touch</h2>
		<ul>
			<li><a href="mailto:maxweinstein@proton.me">maxweinstein@proton.me</a></li>
			<li>
				<a href="https://github.com/m-a-x-w" target="_blank" rel="noopener">GitHub</a>
			</li>
			<li>
				<a
					href="https://www.linkedin.com/in/max-weinstein-04a68423b/"
					target="_blank"
					rel="noopener">LinkedIn</a
				>
			</li>
			<li><a href="/resume.pdf" target="_blank">Resume</a></li>
		</ul>
	</div>
</section>

<style>
	.about {
		padding: 2rem 0;
	}

	.prose {
		margin-bottom: 2.5rem;
	}

	.prose p {
		color: var(--text);
		font-size: 1rem;
	}

	.contact {
		border-top: 1px solid var(--border);
		padding-top: 1.5rem;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1.5rem;
		font-size: 0.95rem;
	}

	ul a {
		color: var(--muted);
	}

	ul a:hover {
		color: var(--accent);
	}
</style>
