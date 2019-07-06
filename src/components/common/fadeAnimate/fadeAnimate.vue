<template>
  <transition>
    <slot name="default"></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimate'
}
</script>

<style lang="scss" scoped>
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  .v-enter-active, .v-leave-active {
    transition: opacity .8s;
  }
</style>
