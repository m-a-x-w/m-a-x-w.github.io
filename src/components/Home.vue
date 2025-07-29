<template>
  <div>
    <section class="intro">
      <h1>Hi, my name is Max Weinstein.</h1>
      <p>
        CS @ Purdue | Reverse Engineering | ML
      </p>
    </section>

    <section class="section">
      <h2>Projects</h2>
      <ul class="project-list">
        <li v-for="project in projects" :key="project.id" class="project-item">
          <div class="project-title">
            <!-- External link -->
            <a v-if="project.link" :href="project.link" target="_blank">{{ project.name }}</a>
            <!-- Internal route -->
            <router-link v-else-if="project.hasPage && project.route" :to="project.route">{{ project.name }}</router-link>
            <!-- No link -->
            <span v-else>{{ project.name }}</span>
          </div>
          <div class="project-description">{{ project.tech }}</div>
        </li>
      </ul>
    </section>

    <section class="contact">
      <p>
        <a href="mailto:maxweinstein@proton.me">Email</a> • 
        <a href="https://www.linkedin.com/in/max-weinstein-04a68423b/" target="_blank">LinkedIn</a> • 
        <a href="https://github.com/m-a-x-w" target="_blank">GitHub</a> • 
        <a href="/resume.pdf" target="_blank">Resume</a>
      </p>
    </section>
  </div>
</template>

<script>
import { projects } from '../data/projects.js'

export default {
  name: 'Home',
  data() {
    return {
      projects
    }
  }
}
</script>
