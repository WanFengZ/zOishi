<template>
  <transition>
    <slot name="default"></slot>
  </transition>
</template>

<script>
export default {
  name: 'BounceAnimate'
}
</script>

<style lang="scss" scoped>
  .v-enter, .v-leave-to {
    transform: translateY(100%);
  }
  .v-enter-active, .v-leave-active {
    transition: transform .8s;
  }
</style>
