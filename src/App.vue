<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0; /* Remove margin-top */
}

/* Add global styles here */
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh; /* Ensure body takes full height */
}

html {
  height: 100%; /* Ensure html takes full height */
}
</style>
