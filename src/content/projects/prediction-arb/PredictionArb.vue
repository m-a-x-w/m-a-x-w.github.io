<template>
  <article class="project-article">
    <header class="project-header">
      <h1>{{ title }}</h1>
      <p class="project-tagline">{{ tagline }}</p>
    </header>

    <div class="project-content">
      <section class="project-overview">
        <h2>Overview</h2>
        <p>Low-latency engine for cross-venue prediction-market arbitrage.</p>

        <p>
          Ingests real-time order book updates (Kalshi + Polymarket), normalizes contracts, and executes
          coordinated trades with strict risk controls.
        </p>

        <div class="project-links">
          <a v-if="githubUrl" :href="githubUrl" target="_blank" class="github-link">
            View on GitHub →
          </a>
          <a v-if="writeupUrl" :href="writeupUrl" target="_blank" class="github-link">
            Read the writeup →
          </a>
        </div>
      </section>

      <section v-if="screenshots.length > 0" class="project-screenshot">
        <ScreenshotCarousel :screenshots="screenshots" />
      </section>

      <section class="project-features">
        <h2>Key Components</h2>
        <h3>Data plane</h3>
        <ul>
          <li>
            <strong>Market ingestion</strong>
            <ul>
              <li>Persistent WebSockets per venue</li>
              <li>Applies order book deltas (no snapshot polling)</li>
              <li>Sequence checks, heartbeats, auto resync</li>
              <li>Guards against stale/out-of-order data</li>
            </ul>
          </li>
          <li>
            <strong>Order book state</strong>
            <ul>
              <li>In-memory, typed order book</li>
              <li>Top-of-book + depth liquidity checks</li>
              <li>Clear split: raw venue data vs internal state</li>
            </ul>
          </li>
        </ul>

        <h3>Core logic</h3>
        <ul>
          <li>
            <strong>Outcome normalization</strong>
            <ul>
              <li>Maps venue contracts into one payoff model</li>
              <li>Fee-aware pricing</li>
              <li>Guards for ambiguous/non-matching contracts</li>
              <li>Keeps arb logic separate from venue quirks</li>
            </ul>
          </li>
          <li>
            <strong>Arbitrage detection</strong>
            <ul>
              <li>Continuous evaluation on normalized states</li>
              <li>Fee/liquidity-adjusted thresholds</li>
              <li>Conservative sizing to reduce slippage</li>
              <li>Rejects high execution-risk setups</li>
            </ul>
          </li>
        </ul>

        <h3>Execution</h3>
        <ul>
          <li>Coordinated multi-leg execution + partial-fill handling</li>
          <li>Venue throttling + order constraints</li>
          <li>Kill switches + hard loss caps</li>
          <li>Rollback/unwind on failed legs</li>
        </ul>
      </section>

      <section class="project-features">
        <h2>Tech Stack</h2>
        <ul>
          <li><strong>Language:</strong> Go</li>
          <li><strong>Networking:</strong> WebSockets (real-time market data ingestion)</li>
          <li><strong>Data models:</strong> Strongly typed structs with strict schema validation</li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script setup>
import ScreenshotCarousel from '../../components/ScreenshotCarousel.vue'

// Display name (short + brand-like). The page copy below still describes multi-venue support.
const title = 'KalshiMarket'
const tagline = 'Low-latency arb execution across venues and contract types'

// Optional links. Send me the URLs and I’ll wire these up.
const githubUrl = ''
const writeupUrl = ''

// Add screenshots under `public/images/prediction-arb/` and list them here.
const screenshots = [
  { src: '/images/prediction-arb/website.png', alt: 'KalshiMarket website' },
]
</script>

<style scoped>
.project-article {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

.project-header {
  text-align: center;
  margin-bottom: 3rem;
}

.project-header h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.project-tagline {
  font-size: 1.25rem;
  color: #656d76;
  margin: 0;
}

.project-content section {
  margin-bottom: 1.5rem;
}

.project-content h2 {
  font-size: 1.25rem;
  margin: 0 0 0.75rem 0;
}

.project-content h3 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem 0;
  font-weight: 500;
}

.project-links {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.github-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #24292f;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.github-link:hover {
  background: #32383f;
}

.project-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
}

.project-content li {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.muted {
  color: #656d76;
}
</style>

