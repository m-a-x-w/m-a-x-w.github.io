<template>
  <div>
    <button @click="$router.push('/')">Home</button>
    <h1>Project Title</h1>
    <button class="project-button">GitHub</button>
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
  name: 'ProjectView'
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

.project-button {
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

div div {
  margin: 20px 0;
}
</style>
