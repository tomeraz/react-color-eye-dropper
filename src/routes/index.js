// import React from 'react'
import App from './App'
import About from './About'
import Welcome from './Welcome'
import Help from './Help'

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Welcome,
  },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'help', component: Help },
  ],
}
