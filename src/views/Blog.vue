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
  min-height: 100vh;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.left-side {
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  padding: 60px 30px;
  background-color: var(--background);
  border-right: 1px solid var(--border);
}

.right-side {
  flex: 3;
  padding: 60px 40px;
  background-color: var(--background-alt);
}

h1 {
  font-size: 2.4em;
  margin: 0 0 30px;
  color: var(--text-primary);
}

h2 {
  font-size: 1.4em;
  margin: 30px 0 20px;
  color: var(--text-primary);
}

.blog-post {
  background-color: var(--background);
  padding: 20px 25px;
  margin: 15px 0;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
}

.blog-post p {
  font-size: 1.1em;
  color: var(--text-secondary);
  margin: 0;
}

input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

label {
  font-size: 1em;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  margin-bottom: 10px;
}

label:hover {
  color: var(--text-primary);
}

select {
  width: 100%;
  padding: 12px;
  font-size: 1em;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .left-side {
    max-width: 100%;
    padding: 40px 20px;
  }
  
  .right-side {
    padding: 40px 20px;
  }
}
</style>
