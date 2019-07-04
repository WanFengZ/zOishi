import Vue from 'vue'
import Router from 'vue-router'
import HomeGoods from '@/components/goods/Goods'
import HomeRatings from '@/components/ratings/Ratings'
import HomeSeller from '@/components/seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeGoods
    },
    {
      path: '/goods',
      name: 'goods',
      component: HomeGoods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: HomeRatings
    },
    {
      path: '/seller',
      name: 'seller',
      component: HomeSeller
    }
  ]
})
