<template>
  <div class="container">
    <main class="content">
      <button @click="$router.push('/')" class="home-button">← Home</button>
      <h1>Projects</h1>
      
      <div class="section filters">
        <h2>Filter by Labels</h2>
        <div class="label-filters">
          <div v-for="label in sortedLabels" :key="label.name" class="label-item">
            <input type="checkbox" :id="label.name" :value="label.name" v-model="selectedLabels" />
            <label :for="label.name">{{ label.name }} ({{ label.count }})</label>
          </div>
        </div>
      </div>

      <div class="section projects">
        <div v-if="filteredProjects.length" class="projects-grid">
          <div v-for="project in filteredProjects" :key="project.id" class="project-item">
            <router-link :to="project.link">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-labels">
                <span v-for="label in project.labels" :key="label" class="label">{{ label }}</span>
              </div>
            </router-link>
          </div>
        </div>
        <p v-else class="no-results">No projects available.</p>
      </div>
    </main>
  </div>
</template>

<script>
import projects from '../../public/projects/projects.json';

export default {
  name: 'ProjectsView',
  data() {
    return {
      projects: projects,
      selectedLabels: []
    }
  },
  computed: {
    labels() {
      const labelCounts = {};
      this.projects.forEach(project => {
        project.labels.forEach(label => {
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
    filteredProjects() {
      if (this.selectedLabels.length === 0) {
        return this.projects;
      }
      return this.projects.filter(project =>
        project.labels.some(label => this.selectedLabels.includes(label))
      );
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

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 2.5rem;
  height: 2px;
  background-color: var(--primary);
}

.label-filters {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-item {
  background: var(--background);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  overflow: hidden;
}

.project-item a {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.project-item:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

.project-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.project-item p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-labels {
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

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .label-filters {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
