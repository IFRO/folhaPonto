import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/components/Config'
import FolhaPonto from '@/components/FolhaPonto'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Config',
      component: Config
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    },
    {
      path: '/folha-ponto',
      name: 'FolhaPonto',
      component: FolhaPonto
    }
  ]
})
