<template>
  <div class="ratings" ref="ratings">
    <div class="content-wrapper">
      <div class="rating-summary border-bottom" ref="top">
        <div class="summary-left border-right">
          <span class="score">{{seller.score}}</span>
          <p class="text">综合评分</p>
          <p class="rank-rate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="summary-right">
          <div class="score-item">
            <span class="title">服务态度</span>
            <div class="star">
              <common-star :size="36" :score="seller.serviceScore"></common-star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-item">
            <span class="title">味道评分</span>
            <div class="star">
              <common-star :size="36" :score="seller.foodScore"></common-star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time-item">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="rating-content">
        <div class="header border-topbottom">
          <rating-select :ratings="ratings" @update="updateRatings"></rating-select>
        </div>
        <div class="content">
          <ul>
            <li v-for="(rating, index) of currentRatings" :key="index" class="rating-item border-bottom">
              <div class="item-header">
                <div class="user-avatar">
                  <img :src="rating.avatar" alt="">
                </div>
                <div class="user-detail">
                  <div class="user-name">{{rating.username}}</div>
                  <div class="rating-score">
                    <div class="star">
                      <common-star :size="24" :score="rating.score"></common-star>
                    </div>
                    <div class="delivery-time" v-show="rating.deliveryTime && rating.deliveryTime > 0">{{rating.deliveryTime}}分钟送达</div>
                  </div>
                  <div class="time">{{getDate(rating.rateTime)}}</div>
                </div>
              </div>
              <div class="item-content">
                <p class="rating-text">{{rating.text}}</p>
                <div class="rating-food clearfix" v-if="rating.recommend">
                  <span class="icon iconfont on" v-if="rating.rateType === 0">&#xe701;</span>
                  <span class="icon iconfont" v-else>&#xe86a;</span>
                  <span v-for="(food, index) of rating.recommend" :key="index" class="food-item border">{{food}}</span>
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
import axios from 'axios'
import BScroll from 'better-scroll'
import CommonStar from '@/components/common/star/Star'
import RatingSelect from '@/components/common/ratingSelect/RatingSelect'

const ERR_OK = 0

export default {
  name: 'HomeRatings',
  components: {
    CommonStar,
    RatingSelect
  },
  props: {
    seller: Object
  },
  data () {
    return {
      ratings: [],
      currentRatings: []
    }
  },

  methods: {
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
  },
  created () {
    axios.get('/api/ratings.json').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.ratings = res.data
      }
    })
  },
  activated () {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    } else {
      this.scroll.scrollToElement(this.$refs.top)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/base.scss';
  @import '~styles/mixins.scss';
  .ratings {
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background-color: #f3f5f7;
    .rating-summary {
      padding: 18px 0;
      background-color: #fff;
      display: flex;
      .summary-left {
        flex: 1;
        text-align: center;
        .score {
          font-size: 24px;
          color: rgb(255,153,0);
          line-height: 28px;
        }
        .text {
          margin-top: 6px;
          margin-bottom: 8px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .rank-rate {
          margin-bottom: 6px;
          font-size: 10px;
          color: rgb(7,17,27);
          font-weight: 300;
        }
      }
      .summary-right {
        flex: 2;
        padding: 0 18px;
        .score-item {
          font-size: 0;
          line-height: 18px;
          margin-bottom: 8px;
          .title {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7,17,27);
            margin-right: 12px;
          }
          .star {
            display: inline-block;
            vertical-align: top;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255,153,0);
            margin-left: 12px;
          }
        }
        .time-item {
          font-size: 12px;
          .title {
            display: inline-block;
            vertical-align: top;
            color: rgb(7,17,27);
            margin-right: 10px;
          }
          .time {
            font-size: 12px;
            color: rgb(147,153,159);
          }
        }
      }
    }
    .rating-content {
      margin-top: 16px;
      background-color: #fff;
      min-height: 300px;
      .header {
        overflow: hidden;
      }
      .content {
        padding: 0 18px;
        .rating-item {
          padding: 18px 0;
          .item-header {
            display: flex;
            position: relative;
            .user-avatar {
              flex: 0 0 28px;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .user-detail {
              flex: 1;
              margin-left: 12px;
              .user-name {
                font-size: 10px;
                color: rgb(7,17,27);
                line-height: 12px;
              }
              .rating-score {
                margin-top: 4px;
                font-size: 0;
                .star {
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 4px;
                }
                .delivery-time {
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 10px;
                  font-weight: 200;
                  color: rgb(147,153,159);
                }
              }
            }
            .time {
              position: absolute;
              top: 0;
              right: 0;
              font-size: 10px;
              font-weight: 200;
              color: rgb(147,153,159);
              line-height: 12px;
            }
          }
          .item-content {
            padding: 6px 0 0 40px;
            position: relative;
            .rating-text {
              font-size: 12px;
              color: rgb(7,17,27);
              line-height: 18px;
            }
            .rating-food {
              margin-top: 8px;
              .icon {
                float: left;
                font-size: 12px;
                color: rgb(147,153,159);
                line-height: 16px;
                margin-bottom: 7px;
                &.on {
                  color: rgb(0,160,220);
                }
              }
              .food-item {
                float: left;
                box-sizing: border-box;
                padding: 0 6px;
                margin-left: 8px;
                margin-bottom: 6px;
                width: 65px;
                height: 16px;
                font-size: 9px;
                color: rgb(147,153,159);
                line-height: 16px;
                text-align: center;
                @include ellipsis;
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
</style>
