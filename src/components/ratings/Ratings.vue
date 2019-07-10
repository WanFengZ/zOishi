<template>
  <div class="ratings">
    <div class="rating-summary border-bottom">
      <div class="summary-left border-right">
        <span class="score">{{seller.score}}</span>
        <p class="text">综合评分</p>
        <p class="rank-rate">{{seller.rankRate}}</p>
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
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
    axios.get('/api/ratings').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.ratings = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .ratings {
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
      .header {
        overflow: hidden;
      }
    }
  }
</style>
