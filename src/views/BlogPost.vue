<template>
  <div>
    <button @click="$router.push('/blog')">Home</button>
    <h1>Blog Title Here</h1>
    <p>01/01/2000</p>
    <div>
      <button class="tag">Go</button>
      <button class="tag">Python</button>
      <button class="tag">Java</button>
      <button class="tag">C++</button>
      <button class="tag">Rust</button>
    </div>
    <div>Markdown here</div>
  </div>
</template>

<script>
export default {
  name: 'BlogPostView'
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
  padding: 5px 10px;
  font-size: 0.8em;
}

.tag {
  display: inline-block;
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 0.8em;
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

p {
  font-size: 1.2em;
  margin: 10px 0;
}

div div {
  margin: 20px 0;
}
</style>
