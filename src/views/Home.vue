<template>
  <div class="container">
    <main class="content">
      <h1>Max Weinstein</h1>
      <div class="subtitle">Software Engineering & Cybersecurity</div>
      
      <div class="markdown-content">
        <p class="intro-text">
          I'm a full-stack developer with a focus on building intelligent, real-world applications across AI, SaaS, and data-driven systems.
        </p>

        <div class="section">
          <h2>Skills</h2>
          <p class="skills">
            Go • Python • Java • C++ • Rust • JavaScript • Vue • Svelte
            <br />
            Reverse Engineering • Penetration Testing • Data Analysis
          </p>
        </div>

        <div class="section columns">
          <div class="column">
            <h2>Recent Projects</h2>
            <div class="list-items">
              <router-link v-for="project in topProjects" :key="project.id" :to="project.link" class="list-item">
                → {{ project.title }}
              </router-link>
            </div>
            <router-link to="/projects" class="view-all">view all projects →</router-link>
          </div>

          <div class="column">
            <h2>Latest Posts</h2>
            <div class="list-items">
              <router-link v-for="post in recentPosts" :key="post.id" :to="post.link" class="list-item">
                → {{ post.title }}
              </router-link>
            </div>
            <router-link to="/blog" class="view-all">view all posts →</router-link>
          </div>
        </div>

        <div class="section">
          <div class="social-links">
            <a href="mailto:maxweinstein@proton.me" title="Email">
              <img src="/static/mail.svg" alt="Email" />
            </a>
            <a href="https://www.linkedin.com/in/max-weinstein-04a68423b" target="_blank" title="LinkedIn">
              <img src="/static/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="https://github.com/m-a-x-w" target="_blank" title="GitHub">
              <img src="/static/github.svg" alt="GitHub" />
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import projectsData from '../../public/projects/projects.json';
import blogsData from '../../public/blogs/blogs.json';

export default {
  name: 'HomeView',
  data() {
    return {
      topProjects: [],
      recentPosts: []
    }
  },
  created() {
    this.topProjects = projectsData.slice(0, 3);
    this.recentPosts = blogsData.slice(-3).reverse();
  }
}
</script>

<style scoped>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Montserrat', sans-serif;
}

.content {
  text-align: left;
  line-height: 1.6;
}

h1 {
  font-size: 2.3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.8rem;
}

.section {
  margin-top: 3rem;
  position: relative;
}

.section:first-of-type {
  margin-top: 2rem;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.column h2 {
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
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

.markdown-content p {
  margin-bottom: 1.6rem;
  color: var(--text-secondary);
  font-size: 1.05rem;
}

.skills {
  font-family: monospace;
  color: var(--text-primary) !important;
  font-size: 1.05rem;
}

.current-work {
  font-family: monospace;
  color: var(--text-primary) !important;
  font-size: 1.05rem;
  display: block;
  padding: 0.2rem 0.5rem;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: 4px;
  margin: 0.5rem 0 1.6rem;
}

.intro-text {
  margin-bottom: 0.5rem !important;
}

.list-items {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.list-item {
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-family: monospace;
  font-size: 1.05rem;
  padding: 0.2rem 0;
}

.list-item:hover {
  color: var(--primary);
  transform: translateX(5px);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
  padding: 0.5rem 0;
}

.social-links img {
  width: 28px;
  height: 28px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.social-links img:hover {
  opacity: 1;
}

.view-all {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  opacity: 0.8;
  display: inline-block;
  margin-top: 0.5rem;
}

.view-all:hover {
  color: var(--primary);
  transform: translateX(5px);
  opacity: 1;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
  
  .columns {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .column:first-child {
    margin-bottom: 0;
  }
}
</style>
