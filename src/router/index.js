import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProjectView from '../views/Project.vue'
import BlogView from '../views/Blog.vue'
import BlogPostView from '../views/BlogPost.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/project/:identifier', name: 'Project', component: ProjectView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPostView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
