<template>
  <div class="rating-select">
    <div class="header border-bottom">
      <div class="selects">
        <div class="selectItem all" :class="{active: selectType === 2}" @click="selectClick(2)">{{desc.all}}<span class="count">{{allCount}}</span></div>
        <div class="selectItem positive" :class="{active: selectType === 0}" @click="selectClick(0)">{{desc.positive}}<span class="count">{{positiveCount}}</span></div>
        <div class="selectItem negative" :class="{active: selectType === 1}" @click="selectClick(1)">{{desc.negative}}<span class="count">{{negativeCount}}</span></div>
      </div>
      <div class="switch border-top">
        <span class="icon iconfont" :class="{active: onlyContent}" @click="onlyClick">&#xe77d;</span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ratings',
  props: {
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectType: 2,
      onlyContent: false
    }
  },
  computed: {
    contentRatings () {
      return this.ratings.filter((rating) => {
        return rating.text !== ''
      })
    },
    positiveRatings () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0
      })
    },
    negativeRatings () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1
      })
    },
    currentRatings () {
      if (this.onlyContent) {
        if (this.selectType === 2) {
          return this.contentRatings
        }
        if (this.selectType === 0) {
          return this.contentRatings.filter((rating) => {
            return rating.rateType === 0
          })
        }
        if (this.selectType === 1) {
          return this.contentRatings.filter((rating) => {
            return rating.rateType === 1
          })
        }
      } else {
        if (this.selectType === 2) {
          return this.ratings
        }
        if (this.selectType === 0) {
          return this.positiveRatings
        }
        if (this.selectType === 1) {
          return this.negativeRatings
        }
      }
    },
    allCount () {
      if (this.onlyContent) {
        return this.contentRatings.length
      } else {
        return this.ratings.length
      }
    },
    positiveCount () {
      if (this.onlyContent) {
        return this.contentRatings.filter((rating) => {
          return rating.rateType === 0
        }).length
      } else {
        return this.positiveRatings.length
      }
    },
    negativeCount () {
      if (this.onlyContent) {
        return this.contentRatings.filter((rating) => {
          return rating.rateType === 1
        }).length
      } else {
        return this.negativeRatings.length
      }
    }
  },
  watch: {
    currentRatings (newValue) {
      this.$emit('update', newValue)
    }
  },
  methods: {
    selectClick (type) {
      this.selectType = type
    },
    onlyClick () {
      this.onlyContent = !this.onlyContent
    }
  }
}
</script>

<style lang="scss" scoped>
  .rating-select {
    background-color: #fff;
    .header {
      background-color: #fff;
      .selects {
        margin: 18px;
        font-size: 0;
        .selectItem {
          display: inline-block;
          box-sizing: border-box;
          padding: 8px 12px;
          margin-right: 8px;
          border-radius: 2px;
          font-size: 12px;
          color: rgb(77,85,93);
          &.all, &.positive {
            background-color: rgba(0,160,200,.2);
            &.active {
              color: #fff;
              background-color: rgb(0,160,200);
            }
          }
          &.negative {
            background-color: rgba(77,85,93,.2);
            &.active {
              color: #fff;
              background-color: #93999f;
            }
          }
          .count {
            font-size: 8px;
            margin-left: 4px;
          }
        }
      }
      .switch {
        margin: 0 18px;
        padding: 12px 0;
        color: rgb(147,153,159);
        .icon {
          vertical-align: middle;
          font-size: 24px;
          line-height: 24px;
          &.active {
            color: rgb(0,160,220);
          }
        }
        .text {
          font-size: 12px;
          line-height: 24px;
        }
      }
    }
  }
</style>
