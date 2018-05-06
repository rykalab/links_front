import Vue from 'vue'
import Router from 'vue-router'
import Front from '@/components/Front'
import User from '@/User'
import Admin from '@/Admin'
import List from '@/components/links/List'
import ShopList from '@/components/shop/List'
import Basket from '@/components/shop/Basket'
import Proceed from '@/components/shop/Proceed'
import Login from '@/components/login/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: User,
      children:[
        {
          path: '/',
          name: 'Front',
          component: Front
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children:[
        {
          path: '/links',
          component: List
        },
        {
          path: '/shop',
          component: ShopList
        },
        {
          path: '/basket',
          name: 'Basket',
          component: Basket
        },
        {
          path: '/basket-proceed',
          name: 'Proceed',
          component: Proceed
        }
      ]
    },
  ]
})
