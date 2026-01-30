import { getProjectComponent } from '../content/index.js'

export const projects = [
  {
    id: 1,
    name: 'partipix', 
    tech: 'Privacy-first event photo sharing',
    link: null,
    route: '/projects/partipix',
    hasPage: true,
    component: getProjectComponent('partipix')
  },
  {
    id: 2,
    name: 'WeTrade', 
    tech: 'ML trading bot using news + price signals',
    link: null,
    route: '/projects/wetrade',
    hasPage: true,
    component: getProjectComponent('wetrade')
  },
  {
    id: 3,
    name: 'Auditory In-sights', 
    tech: 'HUD glasses for spatial audio cues',
    link: null,
    route: '/projects/auditory-insights',
    hasPage: true,
    component: getProjectComponent('hudglasses')
  },
  {
    id: 4,
    name: 'KalshiMarket',
    tech: 'Low-latency arb execution with risk controls',
    link: null,
    route: '/projects/prediction-arb',
    hasPage: true,
    component: getProjectComponent('prediction-arb')
  },
]