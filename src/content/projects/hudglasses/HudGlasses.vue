<template>
  <article class="project-article">
    <header class="project-header">
      <h1>{{ title }}</h1>
      <p class="project-tagline">{{ tagline }}</p>
    </header>

    <div class="project-content">
      <section class="project-overview">
        <h2>Overview</h2>
        <p>Event-based photo sharing platform with facial recognition and intelligent privacy controls for seamless collaboration.</p>
        
        <div class="project-links">
          <a href="https://github.com/m-a-x-w/partipix" target="_blank" class="github-link">
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
          <li>Event creation and participant management</li>
          <li>Facial recognition for automatic photo categorization</li>
          <li>Privacy-first photo sharing with blacklist controls</li>
          <li>Google authentication and secure cloud storage</li>
          <li>Real-time upload status tracking</li>
          <li>Mobile-responsive design</li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script setup>
import ScreenshotCarousel from '../../components/ScreenshotCarousel.vue'

const title = "Partipix"
const tagline = "Event-based photo sharing with intelligent privacy controls"

const screenshots = [
  {
    src: '/images/partipix/main.png',
    alt: 'Partipix Main Page'
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
