<template>
  <div v-if="loading">
    <section class="intro">
      <h1>Loading...</h1>
    </section>
  </div>
  <div v-else-if="ProjectComponent">
    <component :is="ProjectComponent" class="project-content" />
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'

export default {
  name: 'ProjectDetail',
  setup() {
    const route = useRoute()
    const ProjectComponent = ref(null)
    const loading = ref(true)

    const loadContent = async () => {
      loading.value = true
      try {
        const slug = route.params.slug
        const project = projects.find(p => p.route === `/projects/${slug}`)
        
        if (project && project.component) {
          const componentModule = await project.component()
          ProjectComponent.value = componentModule.default
        } else {
          ProjectComponent.value = null
        }
      } catch (error) {
        console.error('Failed to load project content:', error)
        ProjectComponent.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(loadContent)
    watch(() => route.params.slug, loadContent)

    return {
      ProjectComponent,
      loading
    }
  }
}
</script>

<style scoped>
.contact {
  padding-bottom: 3rem;
}
</style>
