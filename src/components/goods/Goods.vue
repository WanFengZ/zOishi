<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="menu-item">
          <div class="item-wrapper" :class="{'border-bottom': (index < goods.length-1)}">
            <div class="text">
              <span v-if="item.type > 0" class="icon" :class="typeList[item.type]"></span>
              {{item.name}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="(item, index) of goods" class="food-list" :key="index">
          <h2 class="food-title">{{item.name}}</h2>
          <ul>
            <li v-for="(food, index) of item.foods" class="food-item" :class="{'border-bottom': (index < item.foods.length-1)}" :key="index">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="sell-info">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  name: 'HomeGoods',
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [],
      typeList: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      scrollY: 0,
      heightList: []
    }
  },
  methods: {
    calculateHeightList () {
      let foodLists = document.getElementsByClassName('food-list')
      console.log(foodLists)
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodLists.length; i++) {
        console.log('hah')
        height += foodLists[i].clientHeight
        this.heightList.push(height)
      }
      console.log(this.heightList)
    }
  },
  created () {
    axios.get('/api/goods').then(res => {
      res = res.data
      if (res.errno === ERR_OK && res.data) {
        this.goods = res.data
      }
    })
  },
  mounted () {
    this.menuScroll = new BScroll(this.$refs.menu, {
      click: true
    })

    this.foodsScroll = new BScroll(this.$refs.foods, {
      probeType: 3
    })

    this.$nextTick(function () {
      this.calculateHeightList()
    })

    this.foodsScroll.on('scroll', (position) => {
      this.scrollY = Math.abs(position.y)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/mixins.scss";
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      background-color: #f3f5f7;
      .menu-item {
        .item-wrapper {
          display: table;
          width: 54px;
          height: 56px;
          margin: 0 auto;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 14px;
            height: 14px;
            &.decrease {
              @include bg-img('decrease_3',14px,14px)
            }
            &.discount {
              @include bg-img('discount_3',14px,14px)
            }
            &.guarantee {
              @include bg-img('guarantee_3',14px,14px)
            }
            &.invoice {
              @include bg-img('invoice_3',14px,14px)
            }
            &.special {
              @include bg-img('special_3',14px,14px)
            }
          }
          .text {
            display: table-cell;
            padding: 0 2px;
            vertical-align: middle;
            font-size: 12px;
            color: rgb(39,48,56);
            line-height: 14px;
            font-weight: 200;
          }
        }
      }
    }
    .foods-wrapper {
      .food-list {
        .food-title {
          display: block;
          height: 26px;
          border-left: 2px solid #d9dde1;
          background-color: #f3f5f7;
          padding-left: 14px;
          font-size: 12px;
          line-height: 26px;
          color: rgb(147,153,159);
        }
        .food-item {
          display: flex;
          margin: 0 18px;
          padding: 18px 0;
          .icon {
            flex: 0 0 57px;
            width: 57px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
          .content {
            flex: 1;
            .name {
              margin-top: 2px;
              font-size: 14px;
              color: rgb(7,17,27);
              line-height: 14px;
            }
            .desc, .sell-info{
              margin-top: 8px;
              font-size: 10px;
              color: rgb(147,153,159);
              line-height: 12px;
              span:first-child {
                margin-right: 12px;
              }
            }
            .price {
              margin-top: 4px;
              font-weight: 700;
              line-height: 24px;
              .new {
                font-size: 14px;
                color: rgb(240,20,20);
              }
              .old {
                font-size: 10px;
                color: rgb(147,153,159);
                vertical-align: top;
              }
            }
          }
        }
      }
    }
  }
</style>
