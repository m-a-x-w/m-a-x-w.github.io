// Content Registry - Import all content components here
export const blogComponents = {
  'art-of-digital-simplicity': () => import('./blogs/ArtOfDigitalSimplicity.vue')
}

export const projectComponents = {
  'partipix': () => import('./projects/partipix/Partipix.vue')
}

// Helper function to get component by slug
export const getBlogComponent = (slug) => {
  return blogComponents[slug] || null
}

export const getProjectComponent = (slug) => {
  return projectComponents[slug] || null
}
