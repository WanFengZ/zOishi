<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="menu-item">
          <div class="item-wrapper border-bottom">
            <div class="text">
              <span v-if="item.type > 0" class="icon" :class="typeList[item.type]"></span>
              {{item.name}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item, index) of goods" class="food-list" :key="index">
          <h2>{{item.name}}</h2>
          <ul>
            <li v-for="(food, index) of item.foods" class="food-item" :key="index">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="sell-info">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const ERR_OK = 0
export default {
  name: 'HomeGoods',
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [],
      typeList: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  created () {
    axios.get('/api/goods').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.goods = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/mixins.scss";
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      background-color: #f3f5f7;
      .menu-item {
        .item-wrapper {
          display: table;
          width: 54px;
          height: 56px;
          margin: 0 auto;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 14px;
            height: 14px;
            &.decrease {
              @include bg-img('decrease_3',14px,14px)
            }
            &.discount {
              @include bg-img('discount_3',14px,14px)
            }
            &.guarantee {
              @include bg-img('guarantee_3',14px,14px)
            }
            &.invoice {
              @include bg-img('invoice_3',14px,14px)
            }
            &.special {
              @include bg-img('special_3',14px,14px)
            }
          }
          .text {
            display: table-cell;
            padding: 0 2px;
            vertical-align: middle;
            font-size: 12px;
            color: rgb(39,48,56);
            line-height: 14px;
            font-weight: 200;
          }
        }
      }
    }
    .foods-wrapper {

    }
  }
</style>
