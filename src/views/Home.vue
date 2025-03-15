<template>
  <div class="container">
    <div class="left-side">
      <header>
        <h1>Max Weinstein</h1>
        <p>Software Engineering & Cybersecurity</p>
        <p class="about-me-blurb">
            I am a software engineer and cybersecurity enthusiast with a passion for
            learning and problem-solving. I have experience with a variety of
            programming languages and technologies, and I am always looking for new
            challenges and opportunities to grow!
        </p>
        <div class="ticker-wrapper">
          <div class="ticker">
            <button class="tag">Go</button>
            <button class="tag">Python</button>
            <button class="tag">Java</button>
            <button class="tag">C++</button>
            <button class="tag">Rust</button>
            <button class="tag">JS</button>
            <button class="tag">Vue</button>

        
          </div>
        </div>
        <div class="resume-button-wrapper">
          <button class="resume-button">View Resume</button>
        </div>
      </header>
      <footer>
        <div class="social-links">
          <a href="mailto:maxweinstein@proton.me">
            <img src="/mail.svg" alt="Email" />
          </a>
          <a href="https://www.linkedin.com/in/max-weinstein-04a68423b" target="_blank">
            <img src="/linkedin.svg" alt="LinkedIn" />
          </a>
          <a href="https://github.com/m-a-x-w" target="_blank">
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a href="https://leetcode.com/willaddlater" target="_blank">
            <img src="/leetcode.svg" alt="LeetCode" />
          </a>
        </div>
        <div>
          <p>Join Newsletter:</p>
          <input type="email" placeholder="email@example.com" />
          <button>Submit</button>
        </div>
      </footer>
    </div>
    <div class="right-side">
      <section>
        <h2>Top Projects:</h2>
        <div v-if="topProjects.length">
          <div v-for="project in topProjects" :key="project.id">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <img :src="`/projects/${project.id}/image.png`" :alt="project.title" class="project-image" />
            <router-link :to="project.link">
              <button class="project-button">Learn more</button>
            </router-link>
          </div>
        </div>
        <p v-else>No projects available.</p>
        <router-link to="/projects">
          <button class="project-button">View all projects</button>
        </router-link>
      </section>
      <section>
        <h2>Recent blog posts:</h2>
        <div v-if="recentPosts.length">
          <router-link v-for="post in recentPosts" :key="post.id" :to="post.link" class="blog-post">
            <p>{{ post.date }} - {{ post.title }}</p>
          </router-link>
        </div>
        <p v-else>No blog posts available.</p>
        <router-link to="/blog">
          <button class="blog-button">View more posts</button>
        </router-link>
      </section>
    </div>
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
  display: flex;
  height: 100vh;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.left-side {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  justify-content: space-between;
  overflow-y: auto;
  padding-top: 5vh;
}

.right-side {
  flex: 2;
  min-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.about-me-blurb {
  margin-top: 40px;
  font-size: 1.2em;
  margin-bottom: 40px;
}

header {
  text-align: left;
  flex: 1;
  margin: 0;
  padding: 0;
}

header h1 {
  font-size: 2.5em;
  margin: 0;
}

header p {
  font-size: 1.2em;
  margin: 20px 0;
}

.ticker-wrapper {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  margin-bottom: 20px;
}

.ticker {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.ticker .tag {
  display: inline-block;
  margin: 10px 15px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.resume-button-wrapper {
  display: flex;
  justify-content: center;
}

.resume-button {
  margin-top: 20%;
  padding: 20px 40px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

.project-button,
.blog-button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

header div {
  margin: 20px 0;
}

header button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1em;
}

section {
  padding: 20px;
}

section h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

section div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

section div div {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  width: 30%;
  box-sizing: border-box;
}

section div div h3 {
  font-size: 1.5em;
  margin: 0 0 10px 0;
}

section div div p {
  font-size: 1em;
  margin: 0 0 10px 0;
}

section div div button {
  padding: 10px 20px;
  font-size: 1em;
}

.blog-post {
  background-color: #f5f5f5;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  display: block;
  text-decoration: none;
  color: inherit;
}

.project-image {
  width: 100%;
  height: auto;
  margin: 10px 0;
  max-height: 150px;
}

footer {
  text-align: center;
  padding: 20px;
}

footer .social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

footer .social-links img {
  width: 40px;
  height: 40px;
}

footer div {
  margin: 10px 0;
}

footer button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1em;
}

footer input {
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
}
</style>
