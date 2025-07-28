<template>
  <div v-if="loading">
    <section class="intro">
      <h1>Loading...</h1>
    </section>
  </div>
  <div v-else-if="content">
    <div v-html="content" class="project-content"></div>
    <section class="contact">
      <router-link to="/">← Back to Home</router-link>
    </section>
  </div>
  <div v-else>
    <section class="intro">
      <h1>Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
    </section>
    <section class="contact">
      <router-link to="/">← Back to Home</router-link>
    </section>
  </div>
</template>

<script>
import { marked } from 'marked'
import { projects } from '../data/projects.js'

export default {
  name: 'ProjectDetail',
  data() {
    return {
      content: null,
      loading: true
    }
  },
  async mounted() {
    await this.loadContent()
  },
  async beforeRouteUpdate(to, from, next) {
    this.loading = true
    await this.loadContent()
    next()
  },
  methods: {
    async loadContent() {
      try {
        const slug = this.$route.params.slug
        const project = projects.find(p => p.route === `/projects/${slug}`)
        
        if (project && project.contentPath) {
          // Import the markdown content
          const response = await fetch(`/src/content/projects/${project.contentPath}/content.md`)
          const markdown = await response.text()
          
          // Configure marked for better HTML output
          marked.setOptions({
            breaks: true,
            gfm: true
          })
          
          this.content = marked(markdown)
        } else {
          this.content = null
        }
      } catch (error) {
        console.error('Failed to load project content:', error)
        this.content = null
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
