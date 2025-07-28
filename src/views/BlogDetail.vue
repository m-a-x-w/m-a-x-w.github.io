<template>
  <div class="blog-detail-page">
    <div class="content-container">
      <button @click="goBack" class="back-button">← Back to Blog</button>
      <div v-if="content" v-html="content" class="blog-content"></div>
      <div v-else class="loading">Loading...</div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import { blogPosts } from '../data/blogs'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
})

export default {
  name: 'BlogDetail',
  data() {
    return {
      content: null,
      blog: null
    }
  },
  async mounted() {
    await this.loadBlogContent()
  },
  methods: {
    async loadBlogContent() {
      const slug = this.$route.params.slug
      this.blog = blogPosts.find(b => b.slug === slug)
      
      if (this.blog && this.blog.contentPath) {
        try {
          const response = await fetch(this.blog.contentPath)
          const markdown = await response.text()
          this.content = marked(markdown)
        } catch (error) {
          console.error('Error loading blog content:', error)
          this.content = '<p>Failed to load blog content.</p>'
        }
      } else {
        this.content = '<p>Blog post not found.</p>'
      }
    },
    goBack() {
      this.$router.push('/blog')
    }
  },
  watch: {
    '$route'() {
      this.loadBlogContent()
    }
  }
}
</script>

<style scoped>
.blog-detail-page {
  min-height: 100vh;
  padding: var(--space-xl) var(--space-md);
}

.content-container {
  max-width: 700px;
  margin: 0 auto;
}

.back-button {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  margin-top: var(--space-lg);
  margin-bottom: 5%;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: var(--color-text-primary);
}

.blog-content {
  line-height: 1.7;
  color: var(--color-text-primary);
}

.blog-content :deep(h1) {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

.blog-content :deep(h2) {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

.blog-content :deep(h3) {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

.blog-content :deep(p) {
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

.blog-content :deep(em) {
  color: var(--color-text-secondary);
  font-style: italic;
  font-size: var(--font-size-sm);
}

.blog-content :deep(ul), .blog-content :deep(ol) {
  margin-bottom: var(--space-md);
  padding-left: var(--space-lg);
}

.blog-content :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
}

.blog-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
}

.blog-content :deep(ul li) {
  margin-bottom: var(--space-xs);
  color: var(--color-text-primary);
  text-indent: -1em;
  padding-left: 1em;
}

.blog-content :deep(ol li) {
  margin-bottom: var(--space-xs);
  color: var(--color-text-primary);
  text-indent: -1.5em;
  padding-left: 1.5em;
}

.blog-content :deep(li) {
  margin-bottom: var(--space-xs);
  color: var(--color-text-primary);
}

.blog-content :deep(code) {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: var(--font-size-sm);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #2d3748;
}

.blog-content :deep(pre) {
  background-color: #f8f9fa;
  padding: var(--space-lg);
  border-radius: 8px;
  overflow-x: auto;
  margin: var(--space-lg) 0;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blog-content :deep(pre code) {
  background: none;
  padding: 0;
  color: #2d3748;
}

.blog-content :deep(blockquote) {
  border-left: 2px solid var(--color-text-secondary);
  padding-left: var(--space-md);
  margin: var(--space-md) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.blog-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-xl) 0;
}

.loading {
  color: var(--color-text-secondary);
  text-align: center;
  padding: var(--space-xl) 0;
}

@media (max-width: 768px) {
  .blog-detail-page {
    padding: var(--space-lg) var(--space-sm);
  }
  
  .blog-content :deep(h1) {
    font-size: var(--font-size-lg);
  }
  
  .blog-content :deep(h2) {
    font-size: var(--font-size-md);
  }
  
  .blog-content :deep(pre) {
    padding: var(--space-sm);
    overflow-x: auto;
  }
}
</style>
