<template>
  <div class="cart-control">
    <div class="cart-decrease iconfont" v-show="food.count > 0" @click="handleDecrease">&#xe780;</div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add iconfont" @click="handleAdd">&#xe781;</div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    handleDecrease () {
      if (this.food.count && this.food.count > 0) {
        this.food.count--
      }
    },
    handleAdd (e) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', e.target)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-control {
    font-size: 0;
    text-align: right;
    .cart-decrease {
      display: inline-block;
      vertical-align: middle;
      padding: 10px;
      line-height: 22px;
      font-size: 22px;
      color: rgb(0,160,200);
    }
    .cart-count {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      color: rgb(147,153,159);
    }
    .cart-add {
      display: inline-block;
      vertical-align: middle;
      padding: 10px;
      line-height: 22px;
      font-size: 22px;
      color: rgb(0,160,200);
    }
  }
</style>
