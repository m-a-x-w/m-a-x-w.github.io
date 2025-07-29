export const blogComponents = {
}

export const projectComponents = {
  'partipix': () => import('./projects/partipix/Partipix.vue'),
  'wetrade': () => import('./projects/wetrade/WeTrade.vue')
}

export const getBlogComponent = (slug) => {
  return blogComponents[slug] || null
}

export const getProjectComponent = (slug) => {
  return projectComponents[slug] || null
}
