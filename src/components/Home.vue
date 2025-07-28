<template>
  <div>
    <section class="intro">
      <h1>Hi, my name is Max Weinstein.</h1>
      <p>
        I'm currently self-employed, working on various projects. I'm interested in design, technology, and creating meaningful digital experiences.
      </p>
    </section>

    <section class="section">
      <h2>Work</h2>
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
      <p>Feel free to reach out at <a href="mailto:maxweinstein@proton.me">maxweinstein@proton.me</a></p>
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
