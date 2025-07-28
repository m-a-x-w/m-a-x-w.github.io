import { getProjectComponent } from '../content/index.js'

export const projects = [
  {
    id: 1,
    name: 'partipix', 
    tech: 'Auto-filtered photo sharing for privacy',
    link: null,
    route: '/projects/partipix',
    hasPage: true,
    component: getProjectComponent('partipix')
  },
]