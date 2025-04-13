<template>
  <div class="container">
    <div class="left-side">
      <h2>Filter by Labels</h2>
      <div v-for="label in sortedLabels" :key="label.name">
        <input type="checkbox" :id="label.name" :value="label.name" v-model="selectedLabels" />
        <label :for="label.name">{{ label.name }} ({{ label.count }})</label>
      </div>
    </div>
    <div class="right-side">
      <button @click="$router.push('/')">Home</button>
      <h1>Projects</h1>
      <div v-if="filteredProjects.length" class="projects-grid">
        <div v-for="project in filteredProjects" :key="project.id" class="project-item">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <button @click="$router.push(project.link)">Learn More</button>
        </div>
      </div>
      <p v-else>No projects available.</p>
    </div>
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px 0;
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

.project-item {
  background-color: var(--background);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-item:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

.project-item h3 {
  font-size: 1.3em;
  margin: 0 0 15px;
  color: var(--text-primary);
}

.project-item p {
  font-size: 1em;
  color: var(--text-secondary);
  margin: 0 0 20px;
  flex-grow: 1;
  line-height: 1.6;
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
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
