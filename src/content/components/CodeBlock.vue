<template>
  <div class="code-block">
    <div v-if="title" class="code-title">{{ title }}</div>
    <pre><code :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup>
defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  title: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.code-block {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
}

.code-title {
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  color: #cccccc;
  font-size: 0.875rem;
  font-weight: 500;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  background: #1e1e1e;
}

code {
  color: #cccccc;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
