<template>
  <div>
    <button @click="$router.push('/')">Home</button>
    <button @click="$router.push('/blog')">Full Blog</button>
    <h1>{{ blogPost.title }}</h1>
    <p>{{ blogPost.date }}</p>
    <div v-html="blogPostContent"></div>
  </div>
</template>

<script>
import blogsData from '../data/blogs.json';
import { marked } from 'marked';

export default {
  name: 'BlogPostView',
  data() {
    return {
      blogPost: {},
      blogPostContent: ''
    }
  },
  created() {
    const blogPostId = this.$route.params.id;
    this.blogPost = blogsData.find(post => post.id === parseInt(blogPostId));
    if (this.blogPost) {
      this.blogPostContent = marked(this.blogPost.content);
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
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
