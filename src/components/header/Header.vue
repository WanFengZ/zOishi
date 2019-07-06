<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span :class="'icon ' + this.typeList[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count">
        5个
        <span class="iconfont">&#xe62d;</span>
      </div>
    </div>
    <div class="announcement-wrapper" @click="handleDetailEnter">
      <div class="anno-img"></div>
      <div class="anno-text">
        {{seller.bulletin}}
      </div>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div v-if="showDetail" class="anno-detail">
      <div>
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="detail-title">{{seller.name}}</h1>
            <div class="star-wrapper">
              <common-star></common-star>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="handleDetailCancel">
          <span class="iconfont">&#xe7fc;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonStar from '@/components/common/star/Star'
export default {
  name: 'HomeHeader',
  components: {
    CommonStar
  },
  props: {
    seller: Object
  },
  data () {
    return {
      typeList: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showDetail: false
    }
  },
  watch: {
    showDetail (newValue, oldValue) {
      if (!newValue) {
        this.scroll = null
      } else {
        setTimeout(() => {
          this.scroll = new BScroll(document.querySelector('.anno-detail'), {
            scrollY: true,
            scrollX: false,
            click: true
          })
        }, 100)
      }
    }
  },
  methods: {
    handleDetailEnter () {
      this.showDetail = true
    },
    handleDetailCancel () {
      this.showDetail = false
    }
  },
  activated () {
    this.showDetail = false
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/mixins.scss";
  @import "~styles/base.scss";
  .header {
    position: relative;
    overflow: hidden;
    background-color: rgba(7,17,27,.5);
    color: #fff;
    font-weight: 200;
    .content-wrapper {
      font-size: 0;
      position: relative;
      padding: 24px 12px 18px 24px;
      .avatar {
        display: inline-block;
        width: 64px;
        height: 64px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        height: 64px;
        vertical-align: top;
        .title {
          margin-top: 2px;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg-img('brand',30px,18px)
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-top: 8px;
          font-size: 12px;
          line-height: 12px;
        }
        .support {
          margin-top: 10px;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            &.decrease {
              @include bg-img('decrease_1',12px,12px)
            }
            &.discount {
              @include bg-img('discount_1',12px,12px)
            }
            &.guarantee {
              @include bg-img('guarantee_1',12px,12px)
            }
            &.invoice {
              @include bg-img('invoice_1',12px,12px)
            }
            &.special {
              @include bg-img('special_1',12px,12px)
            }
          }
          .text {
            margin-left: 4px;
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count {
        box-sizing: border-box;
        height: 24px;
        padding: 6px 8px;
        background-color: rgba(0,0,0,.2);
        border-radius: 12px;
        font-size: 10px;
        line-height: 12px;
        position: absolute;
        right: 12px;
        bottom: 8px;
        .iconfont {
          vertical-align: top;
          font-size: 6px;
        }
      }
    }
    .announcement-wrapper {
      display: flex;
      height: 28px;
      background-color: rgba(7,17,27,.2);
      padding: 0 12px;
      .anno-img {
        width: 22px;
        height: 12px;
        @include bg-img('bulletin',22px,12px);
        margin-top: 8px;
        margin-right: 4px;
      }
      .anno-text {
        flex: 1;
        height: 28px;
        font-size: 10px;
        line-height: 28px;
        @include ellipsis;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .anno-detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7,17,27,.8);
      z-index: 99;
      overflow: hidden;
      .detail-wrapper {
        min-height: 100vh;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .detail-title {
            font-size: 16px;
            text-align: center;
            font-weight: 700;
          }
          .star-wrapper {
            margin: 16px auto 28px auto;
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        .iconfont {
          font-size: 36px;
          color: #fff;
          z-index: 9;
        }
      }
    }
  }

</style>
