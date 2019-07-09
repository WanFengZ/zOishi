<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <span class="iconfont" :class="{active: totalCount > 0}">&#xe61a;</span>
          <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{active: totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" :class="{enough: totalPrice >= minPrice}">{{payDesc}}</div>
    </div>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show" >
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <div class="cart-list" v-show="showList">
      <div class="list-header border-bottom">
        <h3 class="title">购物车</h3>
        <span class="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li v-for="(food, index) of selectFoods" :key="index" class="list-item border-bottom">
            <div class="name">{{food.name}}</div>
            <div class="price-wrapper">
              <div class="price">
                <span>￥</span>
                {{food.price * food.count}}
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food" @add="drop"></cart-control>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '@/components/common/cartControl/CartControl'
export default {
  name: 'commonShopCart',
  components: {
    CartControl
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      showList: false
    }
  },
  watch: {
    showList () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(document.querySelector('.list-content'))
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice <= 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32 + 10
      const y = -(window.innerHeight - rect.top - 22 - 10)
      el.style.display = ''
      el.style.webkitTransform = `translate3d(0,${y}px,0)`
      el.style.transform = `translate3d(0,${y}px,0)`
      let inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    dropping (el, done) {
      let inner = el.getElementsByClassName('inner-hook')[0]
      this.$nextTick(() => {
        setTimeout(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        }, 50)
      })
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      console.log('end')
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.showList = !this.showList
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 46px;
    color: rgba(255,255,255,.4);
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      background-color: #141d27;
      .content-left {
        flex: 1;
        font-size: 0;
        .logo-wrapper {
          display: inline-block;
          box-sizing: border-box;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          padding: 6px;
          position: relative;
          left: 12px;
          top: -12px;
          background-color: #141d27;
          .iconfont {
            display: block;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #2A333B;
            text-align: center;
            font-size: 26px;
            line-height: 44px;
            &.active {
              background: rgb(0,160,200);
              color: #f3f5f7;
            }
          }
          .count {
            position: absolute;
            top: 0;
            left: 36px;
            width: 24px;
            height: 16px;
            border-radius: 8px;
            background-color: rgb(240,20,20);
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.4);
            color: #fff;
            font-size: 10px;
            line-height: 16px;
            text-align: center;
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin: 12px 12px 12px 18px;
          padding-right: 12px;
          width: 40px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          border-right: 1px solid rgba(255,255,255,.1);
          &.active {
            color: #f3f5f7;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 12px 0;
          font-size: 12px;
        }
      }
      .content-right {
        box-sizing: border-box;
        flex: 0 0 94px;
        padding: 0 8px;
        font-size: 16px;
        font-weight: 700;
        line-height: 46px;
        text-align: center;
        background-color: #2A333B;
        &.enough {
          background-color: #00b43c;
          color: #f3f5f7;
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .cart-list {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding-bottom: 60px;
      background-color: #fff;
      z-index: -1;
      .list-header {
        padding: 0 18px;
        height: 40px;
        background-color: #f3f5f7;
        line-height: 40px;
        .title {
          float: left;
          color: rgb(7,27,17);
          font-size: 14px;
          font-weight: 200;
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0,160,200);
        }
      }
      .list-content {
        max-height: 205px;
        overflow: hidden;
        .list-item {
          height: 58px;
          margin: 0 18px;
          display: flex;
          .name {
            flex: 1;
            line-height: 58px;
            color: rgb(7,17,27);
            font-size: 14px;
            font-weight: 200;
          }
          .price-wrapper {
            line-height: 58px;
            font-size: 0;
            .price {
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
              color: rgb(240,20,20);
              margin-left: 18px;
              span {
                font-size: 10px;
                vertical-align: bottom;
                margin-right: -4px;
              }
            }
            .cartcontrol-wrapper {
              display: inline-block;
              vertical-align: bottom;
              height: 58px;
              width: 110px;
            }
          }
        }
      }
    }
  }
</style>
