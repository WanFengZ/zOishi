<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) of itemClasses" :key="index" :class="itemClass"
          class="star-item">
      aa
    </span>
  </div>
</template>

<script>
const length = 5
const classOn = 'on'
const classHalf = 'half'
const classOff = 'off'

export default {
  name: 'CommonStar',
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor((this.score > 5 ? 5 : this.score) * 2) / 2
      let hasDecimal = (score % 1 !== 0)
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(classOn)
      }
      if (hasDecimal) {
        result.push(classHalf)
      }
      while (result.length < length) {
        result.push(classOff)
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/mixins.scss";
  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('star48_on',20px,20px)
        }
        &.half {
          @include bg-img('star48_half',20px,20px)
        }
        &.off {
          @include bg-img('star48_off',20px,20px)
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('star36_on',15px,15px)
        }
        &.half {
          @include bg-img('star36_half',15px,15px)
        }
        &.off {
          @include bg-img('star36_off',15px,15px)
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('star24_on',10px,10px)
        }
        &.half {
          @include bg-img('star24_half',10px,10px)
        }
        &.off {
          @include bg-img('star24_off',10px,10px)
        }
      }
    }
  }
</style>
