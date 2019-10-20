<template>
  <md-bottom-bar class="md-accent fb-bottom-bar" md-type="shift" @md-changed="checkNewPosts">
    <md-bottom-bar-item  to="/orderHistory" md-label="주문내역" md-icon="list"></md-bottom-bar-item>
    <md-bottom-bar-item  to="/home" md-label="메뉴" md-icon="home"></md-bottom-bar-item>
    <md-bottom-bar-item  to="/orderCart" md-label="장바구니" md-icon="shopping_cart"></md-bottom-bar-item>
  </md-bottom-bar>
  <!-- <md-bottom-bar class="fb-bottom-bar" md-sync-route >
    <md-bottom-bar-item to="/cc" md-label="주문내역" md-icon="list"></md-bottom-bar-item>
    <md-bottom-bar-item to="/component/cart.vue" md-label="장바구니" md-icon="shopping_cart"></md-bottom-bar-item>
  </md-bottom-bar> -->
</template>

<script>
  export default {
    name: 'BarRouter',
    data: () => ({
      newPosts: 0,
      checkInterval: null
    }),
    methods: {
     clearCheckPosts () {
       window.clearInterval(this.checkInterval)
       this.checkInterval = null
     },
     clearNewPosts () {
       this.clearCheckPosts()
       this.newPosts = 0
     },
     checkNewPosts (activeItem) {
       if (activeItem !== 'item-posts' && !this.checkInterval) {
         console.log("test");
         // this.checkInterval = window.setInterval(() => {
         //   if (this.newPosts === 99) {
         //     this.newPosts = '99+'
         //     this.clearCheckPosts()
         //   } else {
         //     this.newPosts++
         //   }
         // }, 1000)
       }
     }
   },
   mounted () {
     this.checkNewPosts()
   }
  }
</script>

<style  scoped>
  .fb-bottom-bar{
    position: fixed;
    bottom:0px;
    /* background-color: #374e3c !important; */


  }





</style>
