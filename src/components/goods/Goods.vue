<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="menu-item" :class="{active: (index === currentIndex)}" @click="handleMenuClick(index)">
          <div class="item-wrapper" :class="{'border-bottom': (index < goods.length-1 && index !== currentIndex && (index + 1) !== currentIndex)}">
            <div class="text">
              <span v-if="item.type > 0" class="icon" :class="typeList[item.type]"></span>
              {{item.name}}
            </div>
          </div>
        </li>
        <li class="menu-footer"></li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="(item, index) of goods" class="food-list" :key="index">
          <h2 class="food-title">{{item.name}}</h2>
          <ul>
            <li v-for="(food, index) of item.foods" class="food-item" :class="{'border-bottom': (index < item.foods.length-1)}" :key="index">
              <div class="icon" @click="enterFood(food)">
                <img :src="food.icon" alt="">
              </div>
              <div class="content" @click="enterFood(food)">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="sell-info">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new"><span>￥</span>{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food" @add="onAdd"></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="shopCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shop-cart>
    <slide-animate>
      <food :food="detailFood" v-show="showFood" @cancelFood="cancelFood" @onAdd="onAdd"></food>
    </slide-animate>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import ShopCart from '@/components/common/shopCart/ShopCart'
import CartControl from '@/components/common/cartControl/CartControl'
import Food from '@/components/food/Food'
import SlideAnimate from '@/components/common/slideAnimate/SlideAnimate'
const ERR_OK = 0
export default {
  name: 'HomeGoods',
  components: {
    ShopCart,
    CartControl,
    Food,
    SlideAnimate
  },
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [],
      typeList: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      scrollY: 0,
      heightList: [],
      showFood: false,
      detailFood: {}
    }
  },
  watch: {
    goods () {
      this.$nextTick(() => {
        this.calculateHeightList()
      })
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        if (!this.heightList[i + 1] || (this.scrollY >= this.heightList[i] && this.scrollY < this.heightList[i + 1])) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count && food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    calculateHeightList () {
      let foodLists = this.$refs.foods.children[0].children
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodLists.length; i++) {
        height += foodLists[i].clientHeight
        this.heightList.push(height)
      }
    },
    handleMenuClick (index) {
      let target = this.$refs.foods.children[0].children[index]
      this.foodsScroll.scrollToElement(target)
    },
    onAdd (el) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(el)
      })
    },
    enterFood (food) {
      this.detailFood = food
      this.showFood = true
    },
    cancelFood () {
      this.showFood = false
    }
  },
  created () {
    axios.get('/api/goods.json').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.goods = res.data
      }
    })
  },
  mounted () {
    this.menuScroll = new BScroll(this.$refs.menu, {
      click: true
    })

    this.foodsScroll = new BScroll(this.$refs.foods, {
      probeType: 3,
      click: true
    })

    this.foodsScroll.on('scroll', (position) => {
      this.scrollY = Math.abs(position.y)
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
        &.active {
          background-color: #fff;
        }
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
      .menu-footer {
        width: 100%;
        height: 30px;
      }
    }
    .foods-wrapper {
      flex: 1;
      .food-list {
        .food-title {
          display: block;
          height: 26px;
          border-left: 2px solid #d9dde1;
          background-color: #f3f5f7;
          padding-left: 14px;
          font-size: 12px;
          line-height: 26px;
          color: rgb(147,153,159);
        }
        .food-item {
          display: flex;
          margin: 0 18px;
          padding: 18px 0;
          position: relative;
          .icon {
            flex: 0 0 57px;
            width: 57px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
          .content {
            flex: 1;
            .name {
              margin-top: 2px;
              font-size: 14px;
              color: rgb(7,17,27);
              line-height: 14px;
            }
            .desc, .sell-info{
              margin-top: 6px;
              font-size: 10px;
              color: rgb(147,153,159);
              line-height: 12px;
              span:first-child {
                margin-right: 12px;
              }
            }
            .price {
              margin-top: 4px;
              font-weight: 700;
              line-height: 24px;
              .new {
                font-size: 14px;
                color: rgb(240,20,20);
                span {
                  font-size: 10px;
                  vertical-align: baseline;
                }
              }
              .old {
                font-size: 10px;
                color: rgb(147,153,159);
                text-decoration: line-through;
                vertical-align: top;
              }
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 4px;
            width: 150px;
          }
        }
      }
    }
  }
</style>
