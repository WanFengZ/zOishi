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
      <div class="food-ratings border-topbottom">
        <div class="title">商品评价</div>
        <rating-select :desc="ratingDesc" :ratings="food.ratings" @update="updateRatings"></rating-select>
        <div class="content">
          <ul>
            <li v-for="(rating, index) of currentRatings" :key="index" class="rating-item border-bottom">
              <div class="time">{{getDate(rating.rateTime)}}</div>
              <div class="item-content">
                <span class="icon iconfont on" v-if="rating.rateType === 0">&#xe701;</span>
                <span class="icon iconfont" v-else>&#xe86a;</span>
                {{rating.text}}
              </div>
              <div class="user">
                <span class="user-name">{{rating.username}}</span>
                <div class="user-avatar">
                  <img :src="rating.avatar" alt="">
                </div>
              </div>
            </li>
            <li class="no-rating" v-show="currentRatings.length === 0">该商品无相关评价</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from '@/components/common/cartControl/CartControl'
import FadeAnimate from '@/components/common/fadeAnimate/FadeAnimate'
import RatingSelect from '@/components/common/ratingSelect/RatingSelect'

export default {
  name: 'Food',
  components: {
    CartControl,
    FadeAnimate,
    RatingSelect
  },
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      ratingDesc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      currentRatings: []
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
    },
    updateRatings (value) {
      this.currentRatings = value
    },
    getDate (num) {
      const date = new Date(num)
      const y = date.getFullYear().toString().padStart(2, '0')
      const m = date.getMonth().toString().padStart(2, '0')
      const d = date.getDay().toString().padStart(2, '0')
      const h = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      const s = date.getSeconds().toString().padStart(2, '0')
      return `${y}-${m}-${d} ${h}:${minute}:${s}`
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
            bottom: 18px;
            height: 24px;
            padding: 0 10px;
            border-radius: 12px;
            color: #fff;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
            background-color: rgb(0,160,200);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 18px;
            bottom: 8px;
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
        background-color: #fff;
        min-height: 520px;
        .title {
          padding: 18px 0 0 18px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .content {
          padding: 0 18px;
          .rating-item {
            padding: 16px 0;
            position: relative;
            .time {
              font-size: 10px;
              color: rgb(147,153,159);
              line-height: 12px;
            }
            .item-content {
              margin-top: 6px;
              font-size: 12px;
              .icon {
                color: rgb(147,153,159);
                line-height: 24px;
                &.on {
                  color: rgb(0,160,220);
                }
              }
              .text {
                color: rgb(7,17,27);
                line-height: 16px;
              }
            }
            .user {
              position: absolute;
              right: 0;
              top: 16px;
              font-size: 0;
              .user-name {
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
                font-size: 10px;
                color: rgb(147,153,159);
                line-height: 12px;
              }
              .user-avatar {
                display: inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .no-rating {
            margin-top: 30px;
            height: 100px;
            color: rgb(7,17,27);
            text-align: center;
          }
        }
      }
    }
  }
</style>
