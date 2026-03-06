<script lang="ts">
	import { work } from '$lib/data/work';
</script>

<svelte:head>
	<title>Work -- Max Weinstein</title>
	<meta name="description" content="Professional experience and work history." />
	<meta property="og:title" content="Work -- Max Weinstein" />
	<meta property="og:description" content="Professional experience and work history." />
</svelte:head>

<section class="work">
	<h1>Work</h1>

	<ul class="timeline">
		{#each work as entry}
			<li>
				<div class="header">
					<div>
						<strong>{entry.role}</strong>
						<span class="at"> - {entry.company}</span>
					</div>
					<span class="period">{entry.period}</span>
				</div>
				<p>{entry.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.work {
		padding: 2rem 0;
	}

	.timeline {
		list-style: none;
		padding: 0;
	}

	.timeline li {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.timeline li:first-child {
		padding-top: 0;
	}

	.timeline li:last-child {
		border-bottom: none;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 0.4rem;
		flex-wrap: wrap;
	}

	.at {
		color: var(--muted);
	}

	.period {
		color: var(--muted);
		font-size: 0.95rem;
		white-space: nowrap;
	}

	p {
		color: var(--muted);
		font-size: 0.95rem;
	}
</style>
