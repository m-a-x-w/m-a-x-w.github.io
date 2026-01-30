<template>
  <article class="project-article">
    <header class="project-header">
      <h1>{{ title }}</h1>
      <p class="project-tagline">{{ tagline }}</p>
    </header>

    <div class="project-content">
      <section class="project-overview">
        <h2>Overview</h2>
        <p>Stock trading bot that uses ML on price data and news sentiment to place trades.</p>
        
        <p>In testing, it hit 62% directional accuracy and returned 4% in its first week of live trading.</p>
        
        <div class="project-links">
          <a href="https://github.com/senior-research/snr-research-final" target="_blank" class="github-link">
            View on GitHub →
          </a>
        </div>
      </section>

      <section class="project-screenshot">
        <ScreenshotCarousel :screenshots="screenshots" />
      </section>

      <section class="project-features">
        <h2>How It Works</h2>
        <ul>
          <li>Scraped 4M+ Yahoo Finance articles (back to 2012)</li>
          <li>Custom scraping with IPv6 proxies to bypass rate limits</li>
          <li>Processes 50k+ articles/min for real-time sentiment</li>
          <li>Combines news sentiment with technical indicators (MACD, RSI, moving averages)</li>
          <li>Trains on years of historical stock data</li>
          <li>Places automated buy/sell orders</li>
          <li>Logs every decision and tracks performance</li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script setup>
import ScreenshotCarousel from '../../components/ScreenshotCarousel.vue'

const title = "WeTrade"
const tagline = "Making smart investing accessible with AI"

const screenshots = [
  {
    src: '/images/wetrade/dashboard.png',
    alt: 'WeTrade Dashboard - Trading overview and performance metrics'
  },
  {
    src: '/images/wetrade/scraping.png',
    alt: 'Web scraping infrastructure and data collection'
  },
  {
    src: '/images/wetrade/scrapingResults.png',
    alt: 'Results of web scraping with 4+ million articles'
  },
  {
    src: '/images/wetrade/database.png',
    alt: 'Backend database'
  },
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

.project-links {
  margin-top: 1rem;
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
</style>
