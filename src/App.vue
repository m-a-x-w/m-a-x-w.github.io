<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4361ee;
  --secondary: #3f37c9;
  --text-primary: #2b2d42;
  --text-secondary: #515364;
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --border: #e2e8f0;
  --accent: #4895ef;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary);
  margin-top: 0;
  background-color: var(--background);
}

body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: var(--background);
}

html {
  height: 100%;
  scroll-behavior: smooth;
}

/* Global Styles */
button {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 500;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(67, 97, 238, 0.15);
  background-color: var(--secondary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Common Components */
.card {
  background: var(--background);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

a {
  text-decoration: none;
  color: var(--primary);
  transition: all 0.3s ease;
}

a:hover {
  color: var(--secondary);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}
</style>
