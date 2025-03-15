<template>
  <div class="container">
    <div class="left-side">
      <h2>Filter by Labels</h2>
      <div v-for="label in sortedLabels" :key="label.name">
        <input type="checkbox" :id="label.name" :value="label.name" v-model="selectedLabels" />
        <label :for="label.name">{{ label.name }} ({{ label.count }})</label>
      </div>
      <h2>Sort by Date</h2>
      <select v-model="sortOrder">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
    <div class="right-side">
      <button @click="$router.push('/')">Home</button>
      <h1>Blog Posts</h1>
      <div v-if="filteredPosts.length">
        <div v-for="post in sortedPosts" :key="post.id" class="blog-post">
          <router-link :to="post.link">
            <p>{{ post.date }} - {{ post.title }}</p>
          </router-link>
        </div>
      </div>
      <p v-else>No blog posts available.</p>
    </div>
  </div>
</template>

<script>
import blogsData from '../../public/blogs/blogs.json';

export default {
  name: 'BlogView',
  data() {
    return {
      blogPosts: blogsData,
      selectedLabels: [],
      sortOrder: 'newest'
    }
  },
  computed: {
    labels() {
      const labelCounts = {};
      this.blogPosts.forEach(post => {
        post.labels.forEach(label => {
          if (!labelCounts[label]) {
            labelCounts[label] = 0;
          }
          labelCounts[label]++;
        });
      });
      return Object.entries(labelCounts).map(([name, count]) => ({ name, count }));
    },
    sortedLabels() {
      return [...this.labels].sort((a, b) => b.count - a.count);
    },
    filteredPosts() {
      if (this.selectedLabels.length === 0) {
        return this.blogPosts;
      }
      return this.blogPosts.filter(post =>
        post.labels.some(label => this.selectedLabels.includes(label))
      );
    },
    sortedPosts() {
      return [...this.filteredPosts].sort((a, b) => {
        if (this.sortOrder === 'newest') {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.left-side {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.right-side {
  flex: 2;
  min-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.5em;
  margin: 20px 0;
}

h2 {
  font-size: 2em;
  margin: 20px 0;
}

.blog-post {
  background-color: #f5f5f5;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  display: block;
  text-decoration: none;
  color: inherit;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  width: auto;
  align-self: flex-start;
}

input {
  margin-right: 10px;
}

select {
  margin-top: 10px;
  padding: 5px;
  font-size: 1em;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
