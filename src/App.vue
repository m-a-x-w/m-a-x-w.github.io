<template>
  <div id="app">
    <div class="container">
      <nav>
        <router-link to="/" class="nav-brand">
          <img src="/favicon.svg" alt="Max Weinstein" class="nav-logo">
        </router-link>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/work">Work</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
        </ul>
      </nav>
      
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
