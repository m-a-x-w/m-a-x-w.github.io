<template>
  <div>
    <button @click="$router.push('/')">Home</button>
    <h1>Blog Posts</h1>
    <div>
      <div>
        <h2>Topics</h2>
        <div>
          <input type="checkbox" id="web-scraping" />
          <label for="web-scraping">Web Scraping</label>
        </div>
        <div>
          <input type="checkbox" id="reverse-engineering" />
          <label for="reverse-engineering">Reverse Engineering</label>
        </div>
        <div>
          <input type="checkbox" id="data-analysis" />
          <label for="data-analysis">Data Analysis</label>
        </div>
      </div>
      <div>
        <div v-for="post in blogPosts" :key="post.id">
          <p>{{ post.title }}</p>
          <div>
            <button class="tag">Go</button>
            <button class="tag">Reverse Engineering</button>
            <button class="tag">Web Scraping</button>
          </div>
          <p>{{ post.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogView',
  data() {
    return {
      blogPosts: [
        { id: 1, title: 'Blog post title here...', date: '01/01/2000' },
        { id: 2, title: 'Blog post title here...', date: '01/01/2000' },
        { id: 3, title: 'Blog post title here...', date: '01/01/2000' }
      ]
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
}

.blog-button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

.tag {
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

h1 {
  font-size: 2.5em;
  margin: 20px 0;
}

h2 {
  font-size: 2em;
  margin: 20px 0;
}

div div {
  margin: 20px 0;
}

div div div {
  margin: 10px 0;
}

input {
  margin-right: 10px;
}
</style>
