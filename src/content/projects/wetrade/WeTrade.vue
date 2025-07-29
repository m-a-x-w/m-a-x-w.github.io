<template>
  <article class="project-article">
    <header class="project-header">
      <h1>{{ title }}</h1>
      <p class="project-tagline">{{ tagline }}</p>
    </header>

    <div class="project-content">
      <section class="project-overview">
        <h2>Overview</h2>
        <p>WeTrade is an AI-powered trading bot that makes stock investing accessible to everyone. It uses machine learning to analyze market trends, news sentiment, and technical indicators to make smart trading decisions automatically.</p>
        
        <p>In testing, our system achieved 62% accuracy in predicting stock price movements and earned a 4% return in its first week of live trading.</p>
        
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
          <li>Scraped 4+ million news articles from Yahoo Finance's archive dating back to 2012</li>
          <li>Built custom scraping infrastructure using IPv6 proxy networks to bypass rate limits</li>
          <li>Processes 50,000+ news articles per minute for real-time sentiment analysis</li>
          <li>Combines news sentiment with technical indicators (MACD, RSI, moving averages)</li>
          <li>Neural networks learn patterns from years of historical stock data</li>
          <li>Makes automated buy/sell decisions based on AI predictions and news sentiment</li>
          <li>Tracks performance and logs all trading decisions with full transparency</li>
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
