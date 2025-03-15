<template>
  <div>
    <button @click="$router.push('/')">Home</button>
    <h1>{{ project.title }}</h1>
    <div class="project-content" v-html="projectContent"></div>
  </div>
</template>

<script>
import projectsData from '../data/projects.json';
import { marked } from 'marked';

export default {
  name: 'ProjectView',
  data() {
    return {
      project: {},
      projectContent: ''
    }
  },
  created() {
    const projectIdentifier = this.$route.params.identifier;
    this.project = projectsData.find(project => project.link === `/project/${projectIdentifier}`);
    if (this.project) {
      this.projectContent = marked(this.project.content);
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
  padding: 10px 20px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

h1 {
  font-size: 2.5em;
  margin: 20px 0;
}

div div {
  margin: 20px 0;
}

.project-content {
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.6;
  color: #333;
}

.project-content h1, .project-content h2, .project-content h3 {
  margin-top: 20px;
  font-weight: bold;
}

.project-content p {
  margin: 10px 0;
}

.project-content a {
  color: #3498db;
  text-decoration: none;
}

.project-content a:hover {
  text-decoration: underline;
}
</style>
