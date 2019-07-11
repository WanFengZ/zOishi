<template>
  <div class="seller" ref="seller">
    <div class="content-wrapper">
      <div class="overview border-bottom">
        <div class="top border-bottom">
          <div class="title">{{seller.name}}</div>
          <div class="content">
            <div class="star">
              <common-star :size="36" :score="seller.score"></common-star>
            </div>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="title">起送价</div>
            <div class="num">{{seller.minPrice}}<span class="suffix">元</span></div>
          </div>
          <div class="item">
            <div class="title">商家配送</div>
            <div class="num">{{seller.deliveryPrice}}<span class="suffix">元</span></div>
          </div>
          <div class="item">
            <div class="title">平均送达时间</div>
            <div class="num">{{seller.deliveryTime}}<span class="suffix">分钟</span></div>
          </div>
        </div>
      </div>
      <div class="anno-support border-topbottom">
        <div class="title">公告与活动</div>
        <div class="anno">
          {{seller.bulletin}}
        </div>
        <div class="support">
          <ul>
            <li v-for="(item, index) of seller.supports" :key="index" class="support-item border-top">
              <span class="icon" :class="typeList[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="seller-img border-topbottom">
        <div class="title">商家实景</div>
        <div class="img-wrapper" ref="imgWrapper">
          <ul ref="imgUl">
            <li v-for="(img, index) of seller.pics" :key="index" class="img-item">
              <img :src="img" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="seller-info border-topbottom">
        <div class="title">商家信息</div>
        <div class="content">
          <ul>
            <li v-for="(info, index) of seller.infos" :key="index" class="info-item border-top">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
      <div class="foot-space"></div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonStar from '@/components/common/star/Star'

export default {
  name: 'HomeSeller',
  components: {
    CommonStar
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      typeList: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  watch: {
    seller () {
      this.$nextTick(() => {
        this.setSellerScroll(this.$refs.seller)
        this.setUlWidth()
        this.setImgScroll(this.$refs.imgWrapper)
      })
    }
  },
  methods: {
    setUlWidth () {
      this.$refs.imgUl.style.width = this.seller.pics.length * 126 + 'px'
    },
    setSellerScroll (el) {
      if (!this.sellerScroll) {
        this.sellerScroll = new BScroll(el, {})
      } else {
        this.sellerScroll.refresh()
      }
    },
    setImgScroll (el) {
      if (!this.imgScroll) {
        console.log('hah')
        this.imgScroll = new BScroll(el, {
          scrollX: true,
          scrollY: false
        })
      } else {
        this.imgScroll.refresh()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "~styles/mixins.scss";
  .seller {
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .content-wrapper {
      background-color: #f3f5f7;
      .overview {
        padding: 18px;
        background-color: #fff;
        .top {
          padding-bottom: 18px;
          .title {
            font-size: 14px;
            color: rgb(7,17,27);
            line-height: 14px;
          }
          .content {
            margin-top: 8px;
            font-size: 0;
            .star {
              display: inline-block;
              vertical-align: middle;
            }
            .rating-count {
              display: inline-block;
              vertical-align: middle;
              margin-left: 8px;
              font-size: 10px;
              color: rgb(77,85,93);
              line-height: 18px;
            }
            .sell-count {
              display: inline-block;
              vertical-align: middle;
              margin-left: 12px;
              font-size: 10px;
              color: rgb(77,85,93);
              line-height: 18px;
            }
          }
        }
        .bottom {
          margin-top: 18px;
          display: flex;
          .item {
            flex: 1;
            text-align: center;
            .title {
              font-size: 10px;
              color: rgb(147,153,159);
              margin-bottom: 4px;
            }
            .num {
              font-size: 24px;
              color: rgb(7,17,27);
              font-weight: 300;
              .suffix {
                font-size: 10px;
                font-weight: 200;
                vertical-align: middle;
                margin-left: 2px;
              }
            }
          }
        }
      }
      .anno-support {
        margin-top: 16px;
        background-color: #fff;
        padding: 18px 18px 0 18px;
        .title {
          font-size: 14px;
          color: rgb(7,17,27);
          line-height: 14px;
          margin-bottom: 8px;
        }
        .anno {
          padding: 0 12px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(240,20,20);
          line-height: 24px;
          text-indent: 2em;
        }
        .support {
          margin-top: 16px;
          .support-item {
            padding: 16px 12px;
            .icon {
              display: inline-block;
              vertical-align: middle;
              width: 16px;
              height: 16px;
              &.decrease {
                @include bg-img('decrease_4',16px,16px)
              }
              &.discount {
                @include bg-img('discount_4',16px,16px)
              }
              &.guarantee {
                @include bg-img('guarantee_4',16px,16px)
              }
              &.invoice {
                @include bg-img('invoice_4',16px,16px)
              }
              &.special {
                @include bg-img('special_4',16px,16px)
              }
            }
            .text {
              margin-left: 4px;
              font-size: 12px;
              line-height: 16px;
            }
          }
        }
      }
      .seller-img {
        margin-top: 16px;
        background-color: #fff;
        padding: 18px 0 18px 18px;
        .title {
          font-size: 14px;
          color: rgb(7,17,27);
          line-height: 14px;
          margin-bottom: 12px;
        }
        .img-wrapper {
          width: 100%;
          overflow: hidden;
          font-size: 0;
          .img-item {
            width: 120px;
            height: 90px;
            margin-right: 6px;
            display: inline-block;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .seller-info {
        margin-top: 16px;
        padding: 18px 18px 0 18px;
        background-color: #fff;
        .title {
          font-size: 14px;
          color: rgb(7,17,27);
          line-height: 14px;
          margin-bottom: 12px;
        }
        .content {
          .info-item {
            padding: 16px 12px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 16px;
          }
        }
      }
      .foot-space {
        height: 30px;
      }
    }
  }
</style>
