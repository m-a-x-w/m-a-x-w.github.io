<template>
  <div class="container">
    <main class="content">
      <button @click="$router.push('/')" class="home-button">← Home</button>
      <h1>Blog Posts</h1>
      
      <div class="section filters">
        <div class="filters-row">
          <div class="filter-group">
            <h2>Filter by Labels</h2>
            <div class="label-filters">
              <div class="label-grid">
                <!-- Common labels shown prominently -->
                <div v-for="label in commonLabels" :key="label.name" class="label-item">
                  <input type="checkbox" :id="label.name" :value="label.name" v-model="selectedLabels" />
                  <label :for="label.name">{{ label.name }} ({{ label.count }})</label>
                </div>
              </div>
              
              <!-- Dropdown for additional labels -->
              <div class="more-filters" v-if="additionalLabels.length > 0">
                <button class="dropdown-toggle" @click="showMoreFilters = !showMoreFilters">
                  More labels {{ showMoreFilters ? '▼' : '▶' }}
                </button>
                <div class="dropdown-menu" v-show="showMoreFilters">
                  <div class="dropdown-grid">
                    <div v-for="label in additionalLabels" :key="label.name" class="label-item">
                      <input type="checkbox" :id="label.name" :value="label.name" v-model="selectedLabels" />
                      <label :for="label.name">{{ label.name }} ({{ label.count }})</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="filter-group">
            <h2>Sort by Date</h2>
            <select v-model="sortOrder" class="sort-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div class="section posts">
        <div v-if="sortedPosts.length">
          <div v-for="post in sortedPosts" :key="post.id" class="blog-post">
            <router-link :to="post.link">
              <div class="post-date">{{ post.date }}</div>
              <h3>{{ post.title }}</h3>
              <div class="post-labels">
                <span v-for="label in post.labels" :key="label" class="label">{{ label }}</span>
              </div>
            </router-link>
          </div>
        </div>
        <p v-else class="no-results">No blog posts available.</p>
      </div>
    </main>
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
      sortOrder: 'newest',
      showMoreFilters: false
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
    commonLabels() {
      return this.sortedLabels.slice(0, 3); // Show top 3 most common labels
    },
    additionalLabels() {
      return this.sortedLabels.slice(3); // All other labels
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
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Montserrat', sans-serif;
}

.content {
  text-align: left;
  line-height: 1.6;
}

.home-button {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.3rem;
  margin-bottom: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section {
  margin-bottom: 3rem;
}

.filters-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.filter-group h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

.filter-group h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 2.5rem;
  height: 2px;
  background-color: var(--primary);
}

.label-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.label-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-item label {
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s ease;
}

.label-item label:hover {
  color: var(--text-primary);
}

.sort-select {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
}

.blog-post {
  background: var(--background);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.blog-post a {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.blog-post:hover {
  transform: translateX(5px);
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.post-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.blog-post h3 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.post-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background-color: var(--background-alt);
  color: var(--text-secondary);
  border-radius: 12px;
}

.no-results {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
}

.more-filters {
  position: relative;
  width: fit-content;
  margin-top: 0; /* Remove top margin to align with other labels */
}

.dropdown-toggle {
  width: auto;
  min-width: 200px;
  text-align: left;
  padding: 0.8rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.dropdown-toggle:hover {
  border-color: var(--primary);
  transform: translateY(0);
  box-shadow: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: -200px;  /* Make it wider */
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-top: 0.5rem;
  padding: 1rem;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .content {
    padding-top: 2rem; /* Add padding to prevent overlap with theme toggle */
  }

  .filters-row {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .label-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .dropdown-menu {
    position: static;
    right: 0;
  }

  .dropdown-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .more-filters {
    margin-top: 0; /* Ensure consistent on mobile */
  }
}
</style>
