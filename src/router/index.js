import Vue from 'vue'
import Router from 'vue-router'
import ListArticle from '../views/ListArticle.vue'
import CreateArticle from '../views/CreateArticle.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HelloWorld
      redirect: '/listArticle'
    },
    {
      path: '/listArticle',
      name: 'ListArticle',
      component: ListArticle
    },
    {
      path: '/newArticle',
      name: 'NewArticle',
      component: CreateArticle
    }
  ]
})
