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
  {
    id: 2,
    name: 'WeTrade', 
    tech: 'Intelligent trading platform based on real-world sentiment',
    link: null,
    route: '/projects/wetrade',
    hasPage: true,
    component: getProjectComponent('wetrade')
  },
]