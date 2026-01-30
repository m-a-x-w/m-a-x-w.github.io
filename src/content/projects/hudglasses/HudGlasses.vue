<template>
  <article class="project-article">
    <header class="project-header">
      <h1>{{ title }}</h1>
      <p class="project-tagline">{{ tagline }}</p>
    </header>

    <div class="project-content">
      <section class="project-overview">
        <h2>Overview</h2>
        <p>
          Wearable HUD glasses that turn nearby sounds into simple visual direction cues for deaf and hard of
          hearing users.
        </p>
        
        <div class="project-links">
          <a href="#" target="_blank" class="github-link">
            View on GitHub →
          </a>
        </div>
      </section>

      <section class="project-screenshot">
        <ScreenshotCarousel :screenshots="screenshots" />
      </section>

      <section class="project-features">
        <h2>Key Features</h2>
        <ul>
          <li>Real-time sound direction cues</li>
          <li>On-device sound classification (speech, sirens, vehicles)</li>
          <li>Low-latency embedded processing</li>
          <li>Lightweight, wearable housing</li>
          <li>Runs on Raspberry Pi Zero or ESP32</li>
          <li>Directional mic array + custom PCB</li>
          <li>Transparent display for overlay</li>
        </ul>
      </section>

      <section class="project-technical">
        <h2>Technical Implementation</h2>
        <p>
          Mic array + embedded DSP + ML inference on-device. A transparent display overlays direction cues in
          real time.
        </p>
      </section>
    </div>
  </article>
</template>

<script setup>
import ScreenshotCarousel from '../../components/ScreenshotCarousel.vue'

const title = "Auditory In-Sights"
const tagline = "Real-time spatial audio visualization for the deaf and hard of hearing"

const screenshots = [
  {
    src: '/images/hudglasses/main.png',
    alt: 'Auditory In-Sights Main Display'
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
