<template>
  <div id="app">
    <home-header :seller="seller"></home-header>
    <div class="tab border-bottom">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import HomeHeader from '@/components/header/Header'

const ERR_OK = 0

export default {
  name: 'App',
  components: {
    HomeHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  methods: {

  },
  created () {
    axios.get('/api/seller.json').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.seller = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    .tab-item {
      flex: 1;
      height: 40px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      color: rgb(77,85,93);
    }
    .router-link-active {
      color: rgb(220,20,20);
    }
  }
</style>
