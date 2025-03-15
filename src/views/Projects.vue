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
import projectsData from '../data/projects.json';

export default {
  name: 'ProjectsView',
  data() {
    return {
      projects: projectsData,
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

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.project-item {
  background-color: #f5f5f5;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 20px);
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
