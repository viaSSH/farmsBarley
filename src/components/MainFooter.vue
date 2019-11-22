<template>
  <!-- <md-bottom-bar class="md-accent fb-bottom-bar" md-type="shift" @md-changed="checkNewPosts"> -->
  <!-- <md-bottom-bar class="md-accent fb-bottom-bar" md-type="shift" :md-active-item="activeTab"> -->
  <md-bottom-bar class="md-accent fb-bottom-bar" md-type="fixed" :md-active-item="activeTab" >
  <!-- <md-bottom-bar class="md-accent fb-bottom-bar" md-type="shift"> -->

    <md-bottom-bar-item class="fb-bottom-button" id="tab_history"   to="/orderHistory" md-label="주문내역" md-icon="list" @click.native="tabChange('history')"></md-bottom-bar-item>
    <md-bottom-bar-item class="fb-bottom-button" id="tab_home"   to="/home" md-label="" md-icon="home" @click.native="tabChange('home')"></md-bottom-bar-item>
    <md-bottom-bar-item class="fb-bottom-button" id="tab_cart"   to="/orderCart" md-label="장바구니" md-icon="shopping_cart" @click.native="tabChange('cart')"></md-bottom-bar-item>
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
      activeTab: "tab_home",
      // activeTab: 1,
      newPosts: 0,
      checkInterval: null
    }),
    methods: {
     tabChange(id) {
       this.activeTab = "tab_" + id;
       // this.activeTab = id;
       // console.log(this.activeTab);
     },
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
     // this.checkNewPosts()
   }
  }
</script>

<style  scoped>
  .fb-bottom-bar{
    position: fixed;
    bottom:0px;
    z-index: 999;
    background-color: #374e3c !important;
    /* background-color: #374e3c !important; */


  }

  .fb-bottom-button {
    color: white;
  }
  





</style>
