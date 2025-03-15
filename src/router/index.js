import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProjectView from '../views/Project.vue'
import BlogView from '../views/Blog.vue'
import BlogPostView from '../views/BlogPost.vue'
import ProjectsView from '../views/Projects.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/project/:identifier', name: 'Project', component: ProjectView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPostView },
  { path: '/projects', name: 'Projects', component: ProjectsView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
