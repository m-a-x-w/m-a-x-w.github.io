<template>
  <div class="container">
    <div class="button-container">
      <button @click="$router.push('/')">Home</button>
      <button @click="$router.push('/blog')">Full Blog</button>
    </div>
    <h1>{{ blogPost.title }}</h1>
    <p>{{ blogPost.date }}</p>
    <div v-html="blogPostContent"></div>
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

      // Fetch blog post metadata from blogs.json
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
  width: 60%;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
}

.button-container {
  text-align: center;
  margin-bottom: 20px;
}

button {
  margin: 5px;
  padding: 10px 40px;
  font-size: 1.2em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

h1 {
  font-size: 2.5em;
  margin: 20px 0;
}

p {
  font-size: 1.2em;
  margin: 10px 0;
}

div div {
  margin: 20px 0;
}

</style>
