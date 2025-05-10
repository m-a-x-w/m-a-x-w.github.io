<template>
  <div class="container">
    <div class="button-container">
      <button @click="$router.push('/')">Home</button>
      <button @click="$router.push('/blog')">Full Blog</button>
    </div>
    <h1>{{ blogPost.title }}</h1>
    <div class="blog-content">
      <p class="post-date">{{ blogPost.date }}</p>
      <div v-html="blogPostContent"></div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  name: 'BlogPostView',
  data() {
    return {
      blogPost: {},
      blogPostContent: ''
    }
  },
  async created() {
    const blogPostId = this.$route.params.id;
    try {
      const response = await fetch(`/blogs/${blogPostId}/content.md`);
      const markdown = await response.text();
      this.blogPostContent = marked(markdown);

      const blogsResponse = await fetch('/blogs/blogs.json');
      if (!blogsResponse.ok) {
        throw new Error('Failed to fetch blogs.json');
      }
      const blogs = await blogsResponse.json();
      const post = blogs.find(post => post.id === blogPostId);
      if (post) {
        this.blogPost = post;
      } else {
        console.error('Blog post not found');
      }
    } catch (error) {
      console.error('Error loading blog post content:', error);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 900px;
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

button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  height: 35px;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  padding: 0 12px;
  border: none;
}

button:hover {
  background: var(--secondary);
  transform: translateY(-2px);
}

h1 {
  font-size: 2.4em;
  margin: 0 0 20px;
  color: var(--text-primary);
}

p {
  font-size: 1.1em;
  color: var(--text-secondary);
  line-height: 1.8;
}

.blog-content {
  background-color: var(--background);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--border);
  text-align: left;
}

.post-date {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

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

:deep(a) {
  color: var(--primary);
  text-decoration: none;
  transition: all 0.3s ease;
}

:deep(a:hover) {
  color: var(--secondary);
}

:deep(ul), :deep(ol) {
  margin: 20px 0;
  padding-left: 30px;
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
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid var(--border);
}

:deep(hr) {
  border: none;
  height: 1px;
  background-color: var(--border);
  margin: 40px 0;
}

@media (max-width: 768px) {
  .container {
    padding: 40px 20px;
  }
}
</style>
