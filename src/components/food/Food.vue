<template>
  <div class="food" ref="food">
    <div class="content-wrapper">
      <div class="food-content border-bottom">
        <div class="header">
          <img class="image" :src="food.image" alt="">
          <div class="back iconfont" @click="handleCancel">&#xe624;</div>
        </div>
        <div class="content">
          <h3 class="name">{{food.name}}</h3>
          <div class="sell-info">
            <span>月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new"><span>￥</span>{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <fade-animate>
            <div class="cartcontrol-wrapper" v-show="food.count && food.count > 0">
              <cart-control :food="food" @add="add"></cart-control>
            </div>
          </fade-animate>
          <fade-animate>
            <div class="buy" v-show="!food.count || food.count === 0" @click="handleBuy">加入购物车</div>
          </fade-animate>
        </div>
      </div>
      <div class="food-info border-topbottom" v-show="food.info">
        <div class="title">商品介绍</div>
        <div class="text">{{food.info}}</div>
      </div>
      <div class="food-ratings">
        <div class="title">商品评价</div>
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from '@/components/common/cartControl/CartControl'
import FadeAnimate from '@/components/common/fadeAnimate/FadeAnimate'
export default {
  name: 'Food',
  components: {
    CartControl,
    FadeAnimate
  },
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    food () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  methods: {
    handleCancel () {
      this.$emit('cancelFood')
    },
    add (el) {
      this.$emit('onAdd', el)
    },
    handleBuy (e) {
      Vue.set(this.food, 'count', 1)
      this.$emit('onAdd', e.target)
    }
  }

}
</script>

<style lang="scss" scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 46px;
    width: 100%;
    background: #f3f5f7;
    z-index: 11;
    .content-wrapper {
      .food-content {
        background: #fff;
        .header {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          .image {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .back {
            position: absolute;
            top: 10px;
            left: 4px;
            padding: 8px;
            color: #f3f5f7;
            font-size: 24px;
          }
        }
        .content {
          padding: 18px;
          flex: 1;
          .name {
            font-size: 14px;
            font-weight: 700;
            color: rgb(7,17,27);
            line-height: 14px;
          }
          .sell-info{
            margin-top: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 12px;
            span:first-child {
              margin-right: 12px;
            }
          }
          .price {
            margin-top: 18px;
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
          .buy {
            box-sizing: border-box;
            position: absolute;
            right: 24px;
            bottom: 12px;
            height: 24px;
            padding: 0 10px;
            border-radius: 12px;
            color: #fff;
            font-size: 12px;
            line-height: 21px;
            text-align: center;
            background-color: rgb(0,160,200);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 18px;
            bottom: 2px;
            width: 150px;
          }
        }
      }
      .food-info {
        margin-top: 16px;
        padding: 18px;
        background-color: #fff;
        .title {
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .text {
          padding: 6px 8px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(77,85,93);
          line-height: 24px;
        }
      }
      .food-ratings {
        margin-top: 16px;
        height: 100px;
        background-color: #fff;
      }
    }
  }
</style>
