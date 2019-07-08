<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
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
      <transition name="drop"></transition>
      <div v-for="(ball, index) of balls" v-show="ball.show" class="ball" :key="index"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonShopCart',
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
        }
      ]
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
    }
  },
  created () {
    this.dropBalls = []
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
    background-color: #141d27;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
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
  }
</style>
