import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Work from './components/Work.vue'
import About from './components/About.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import Blog from './views/Blog.vue'
import BlogDetail from './views/BlogDetail.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/work', component: Work },
  { path: '/about', component: About },
  { path: '/blog', component: Blog },
  { path: '/projects/:slug', component: ProjectDetail },
  { path: '/blog/:slug', component: BlogDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
