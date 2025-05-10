<template>
  <div>
    <button @click="toggleTheme" class="theme-toggle" :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
      {{ isDarkMode ? '☀️' : '🌙' }}
    </button>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false
    }
  },
  created() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
    },
    applyTheme() {
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #7c3aed;
  --secondary: #6d28d9;
  --text-primary: #2b2d42;
  --text-secondary: #515364;
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --border: #e2e8f0;
  --accent: #8b5cf6;
  --icon-invert: 0;
}

:root[data-theme="dark"] {
  --text-primary: #e2e8f0;
  --text-secondary: #cbd5e1;
  --background: #1a1b26;
  --background-alt: #1f2937;
  --border: #374151;
  --icon-invert: 1;
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
  box-shadow: 0 5px 15px rgba(124, 58, 237, 0.15);
  background-color: var(--secondary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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

.theme-toggle {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: var(--background-alt);
  color: var(--text-primary);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.theme-toggle:hover {
  transform: rotate(15deg);
  background: var(--background);
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 1rem;
    right: 1rem;
    width: 35px;
    height: 35px;
    font-size: 1rem;
    padding: 0.4rem;
  }
}
</style>
