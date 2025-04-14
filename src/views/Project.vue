<template>
  <div class="container">
    <div class="button-container">
      <button @click="$router.push('/')">Home</button>
      <button @click="$router.push('/projects')">Projects</button>
    </div>
    <h1>{{ project.title }}</h1>
    <div class="project-content" v-html="projectContent"></div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  name: 'ProjectView',
  data() {
    return {
      project: {},
      projectContent: ''
    }
  },
  async created() {
    const projectIdentifier = this.$route.params.identifier;
    try {
      const response = await fetch(`/projects/${projectIdentifier}/content.md`);
      const markdown = await response.text();
      this.projectContent = marked(markdown);
    } catch (error) {
      console.error('Error loading project content:', error);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 40px;
  font-family: 'Montserrat', sans-serif;
  background-color: var(--background);
  min-height: 100vh;
}

.button-container {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.4em;
  margin: 0 0 30px;
  color: var(--text-primary);
}

.project-content {
  background-color: var(--background);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* Style for markdown content */
:deep(h2) {
  font-size: 1.8em;
  color: var(--text-primary);
  margin: 40px 0 20px;
}

:deep(h3) {
  font-size: 1.4em;
  color: var(--text-primary);
  margin: 30px 0 15px;
}

:deep(p) {
  margin: 20px 0;
  font-size: 1.1em;
  line-height: 1.8;
  color: var(--text-secondary);
}

:deep(code) {
  background-color: var(--background-alt);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--primary);
}

:deep(pre) {
  background-color: var(--background-alt);
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--border);
}

:deep(pre code) {
  background-color: transparent;
  color: var(--text-primary);
  padding: 0;
}

:deep(ul), :deep(ol) {
  margin: 20px 0;
  padding-left: 30px;
}

:deep(ul:has(li > input[type="checkbox"])) {
  list-style: none;
  padding-left: 0;
}

:deep(li) {
  margin: 10px 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

:deep(blockquote) {
  border-left: 4px solid var(--primary);
  margin: 20px 0;
  padding: 10px 20px;
  background-color: var(--background-alt);
  color: var(--text-secondary);
  font-style: italic;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 30px 0;
  border: 1px solid var(--border);
}

:deep(hr) {
  border: none;
  height: 1px;
  background-color: var(--border);
  margin: 40px 0;
}

.project-meta {
  margin: 20px 0 40px;
  padding: 20px;
  background-color: var(--background-alt);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.project-meta h3 {
  font-size: 1.2em;
  margin: 0 0 15px;
  color: var(--text-primary);
}

.project-meta p {
  margin: 10px 0;
  color: var(--text-secondary);
}

.tech-stack {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.tech-tag {
  padding: 6px 12px;
  background-color: var(--background);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 16px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .container {
    padding: 40px 20px;
  }
}
</style>
