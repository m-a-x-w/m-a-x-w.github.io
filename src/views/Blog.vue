<template>
  <div class="blog-page">
    <div class="content-container">
      <div class="blog-list">
        <article 
          v-for="(post, index) in sortedPosts" 
          :key="post.slug"
          class="blog-item"
          @click="goToPost(post.slug)"
        >
          <span class="blog-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h2 class="blog-title">{{ post.title }}</h2>
          <span class="blog-date">{{ formatDate(post.date) }}</span>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { blogPosts } from '../data/blogs'

export default {
  name: 'Blog',
  computed: {
    sortedPosts() {
      return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    goToPost(slug) {
      this.$router.push(`/blog/${slug}`)
    }
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding: var(--space-xl) var(--space-md);
}

.content-container {
  max-width: 700px;
  margin: 0 auto;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.blog-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: var(--space-md) var(--space-lg);
  border-radius: 8px;
  border: 1px solid transparent;
  background: linear-gradient(145deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
}

.blog-item:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border-color: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.blog-number {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  opacity: 0.6;
  letter-spacing: 0.5px;
  min-width: 24px;
}

.blog-title {
  flex: 1;
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.01em;
}

.blog-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
  opacity: 0.7;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .blog-page {
    padding: var(--space-lg) var(--space-sm);
  }
  
  .content-container {
    max-width: 100%;
  }
  
  .blog-list {
    gap: var(--space-sm);
  }
  
  .blog-item {
    padding: var(--space-sm) var(--space-md);
    gap: var(--space-sm);
  }
  
  .blog-title {
    font-size: var(--font-size-md);
  }
  
  .blog-number {
    min-width: 20px;
  }
}
</style>
