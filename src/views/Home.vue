<template>
  <div class="container">
    <div class="left-side">
      <header>
        <h1>Max Weinstein</h1>
        <p>SWE & Cybersecurity</p>
        <p class="about-me-blurb">
            I am a software engineer and cybersecurity enthusiast with a passion for
            learning and problem-solving. I have experience with a variety of
            programming languages and technologies, and I am always looking for new
            challenges and opportunities to grow.

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
          <a href="mailto:example@example.com">
            <img src="/mail.svg" alt="Email" />
          </a>
          <a href="https://www.linkedin.com/in/example" target="_blank">
            <img src="/linkedin.svg" alt="LinkedIn" />
          </a>
          <a href="https://github.com/example" target="_blank">
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a href="https://leetcode.com/example" target="_blank">
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
        <div>
          <div v-for="project in topProjects" :key="project.id">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <button class="project-button">Learn more</button>
          </div>
        </div>
        <button class="project-button">View all projects</button>
      </section>
      <section>
        <h2>Recent blog posts:</h2>
        <div v-for="post in recentPosts" :key="post.id" class="blog-post">
          <p>{{ post.date }} - {{ post.title }}</p>
        </div>
        <button class="blog-button">View more posts</button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      topProjects: [
        { id: 1, title: 'Project 1', description: 'Lorem ipsum dolor sit amet...' },
        { id: 2, title: 'Project 2', description: 'Lorem ipsum dolor sit amet...' },
        { id: 3, title: 'Project 3', description: 'Lorem ipsum dolor sit amet...' }
      ],
      recentPosts: [
        { id: 1, date: '01/01/2000', title: 'Lorem ipsum dolor sit amet...' },
        { id: 2, date: '01/01/2000', title: 'Lorem ipsum dolor sit amet...' },
        { id: 3, date: '01/01/2000', title: 'Lorem ipsum dolor sit amet...' }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  margin: 0; /* Remove any margin from the container */
  font-family: 'Montserrat', sans-serif;
}

.left-side {
  flex: 1; /* 1/3 of the width */
  min-width: 300px; /* Set a minimum width for the left side */
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  justify-content: space-between;
}

.right-side {
  flex: 2; /* 2/3 of the width */
  min-width: 600px; /* Set a minimum width for the right side */
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.about-me-blurb {
  font-size: 1.2em;
  margin-bottom: 100px;
}

header {
  text-align: left; /* Left-align the text */
  flex: 1;
  margin: 0; /* Remove any margin from the header */
  padding: 0; /* Remove any padding from the header */
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
  height: 80px; /* Increase the height for the ticker */
    margin-bottom: 100px;
}

.ticker {
  display: inline-block;
  animation: ticker 10s linear infinite;
}

@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.ticker .tag {
  display: inline-block;
  margin: 0 10px;
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
  justify-content: center; /* Center the button horizontally */
}

.resume-button {
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
  background-color: #e0e0e0;
  padding: 20px;
  margin: 10px;
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
}

footer {
  text-align: center;
  padding: 20px;
}

footer .social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
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
