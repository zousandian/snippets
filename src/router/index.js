import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from 'components/Main'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Main
    },
    {
      path: '/snippets/:tag',
      name: 'SnippetsTags',
      component: Main
    },
    {
      path: '/snippets/:tag/:title',
      name: 'SnippetsItems',
      component: Main
    },
    {
      path: '*',
      redirect: {
        name: 'Home'
      }
    }
  ]
})
