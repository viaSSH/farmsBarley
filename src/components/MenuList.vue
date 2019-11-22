<template>
  <div>
    <!-- :src="$device.desktop  -->
    <order-modal :showDialog="showDialog" :modalType="modalType" :selectedId="selectedId" @closeModalE="closeModal"></order-modal>

    <md-tabs class="md-primary fb-menu-tabs" md-alignment="fixed" md-sync-route md-active-tab="tab-pizza">
      <md-tab class="fb-menu-tab" id="tab-pizza" md-label="피자" to="/menuTab/pizza" exact>

        <md-list class="fb-menu-box" v-for="menu in MENU.pizza" :key="menu.category"  md-expand-single="false" >
          <md-list-item class="fb-menu-list-item"  md-expand >
            <!-- <md-icon>whatshot</md-icon> -->
            <span class="md-list-item-text fb-menu-list">{{menu.category}}</span>

            <md-list slot="md-expand">
              <div class="md-layout fb-menu-price">
                <span class="md-layout-item md-size-33">M {{menu.price[0].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-33" v-if="menu.price[1]!=null">L {{menu.price[1].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-33" v-if="menu.price[2]!=null">B {{menu.price[2].toLocaleString()}}원</span>
              </div>

              <div  class="md-layout fb-menu-container">
                <md-list-item v-for="type in menu.type" :key="type.id" class="md-layout-item md-size-50 fb-menu-card">
                  <md-card class="">
                    <md-card-media>
                      <img src="../assets/pizza.jpg" alt="People">
                    </md-card-media>

                    <md-card-content class="fb-menu-title">
                      {{type.name}}
                    </md-card-content>

                    <md-card-actions class="md-layout" md-alignment="space-between">
                      <md-button class="md-layout-item md-size-100 md-accent md-raised" @click="showOrder('pizza', type.id)">주문하기</md-button>
                    </md-card-actions>
                  </md-card>
                </md-list-item>


              </div>

            </md-list>
          </md-list-item>
        </md-list>
      </md-tab>

      <md-tab class="fb-menu-tab" id="tab-chicken" md-label="치킨" to="/menuTab/chicken">
        <md-list class="fb-menu-box" v-for="menu in MENU.chicken" :key="menu.category" md-expand-single="false" >
          <md-list-item v-if="menu.category=='순살치킨'" class="fb-menu-list-item"  md-expand >
            <!-- <md-icon>whatshot</md-icon> -->
            <span class="md-list-item-text fb-menu-list">{{menu.category}}</span>

            <md-list slot="md-expand">
              <div class="md-layout fb-menu-price" v-if="menu.category=='순살치킨' " style="height: 60px;">
                <span class="md-layout-item md-size-50">한마리 {{menu.price[0].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-50">두마리 {{menu.price[1].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-50">반마리 {{menu.price[2].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-50">미니컵 {{menu.price[3].toLocaleString()}}원</span>
              </div>
              <!-- <div class="md-layout fb-menu-price" v-if="menu.category=='컵치킨' ">
                <span class="md-layout-item md-size-33">반마리 {{menu.price[0].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-33">미니컵 {{menu.price[1].toLocaleString()}}원</span>
              </div> -->

              <div  class="md-layout fb-menu-container">
                <md-list-item v-for="type in menu.type" :key="type.id" class="md-layout-item md-size-50 fb-menu-card">
                  <md-card class="">
                    <md-card-media>
                      <img src="../assets/chicken.jpg" alt="People">
                    </md-card-media>

                    <md-card-content class="fb-menu-title">
                      {{type.name}}
                    </md-card-content>

                    <md-card-actions class="md-layout" md-alignment="space-between">
                      <md-button class="md-layout-item md-size-100 md-accent md-raised" @click="showOrder('chicken', type.id)">주문하기</md-button>
                    </md-card-actions>
                  </md-card>
                </md-list-item>


              </div>

            </md-list>
          </md-list-item>
        </md-list>
      </md-tab>

      <md-tab class="fb-menu-tab" id="tab-side" md-label="사이드/음료" to="/menuTab/side">
        <md-list class="fb-menu-box" v-for="menu in MENU.side" :key="menu.category"  md-expand-single="false" >
          <md-list-item class="fb-menu-list-item"  md-expand >
            <!-- <md-icon>whatshot</md-icon> -->
            <span class="md-list-item-text fb-menu-list">{{menu.category}}</span>

            <md-list slot="md-expand">
              <div class="md-layout fb-menu-price" v-if="menu.category=='음료'">
                <span class="md-layout-item md-size-50">0.5L: {{menu.price[0].toLocaleString()}}원</span>
                <span class="md-layout-item md-size-50">1L: {{menu.price[1].toLocaleString()}}원</span>
              </div>
              <div class="md-layout fb-menu-price" v-if="menu.category=='파스타'">
                <span class="md-layout-item md-size-100">M {{menu.price[0].toLocaleString()}}원</span>
              </div>
              <div class="md-layout fb-menu-price" v-if="menu.category=='버팔로윙'">
                <span class="md-layout-item md-size-100">개당 {{menu.price[0].toLocaleString()}}원 *최소주문수량 5개</span>
              </div>

              <div  class="md-layout fb-menu-container">
                <md-list-item v-for="type in menu.type" :key="type.id" class="md-layout-item md-size-50 fb-menu-card">
                  <md-card class="">
                    <md-card-media>
                      <img v-if="type.id=='sd1' || type.id=='sd2'" src="../assets/cola.jpg" alt="People">
                      <img v-if="type.id=='sd3' || type.id=='sd4'" src="../assets/sprite.jpg" alt="People">
                      <img v-if="type.id=='sp1' || type.id=='sc1'" src="../assets/image.jpg" alt="People">
                    </md-card-media>

                    <md-card-content class="fb-menu-title">
                      {{type.name}}
                    </md-card-content>

                    <md-card-actions class="md-layout" md-alignment="space-between">
                      <md-button class="md-layout-item md-size-100 md-accent md-raised" @click="showOrder('side', type.id)">주문하기</md-button>
                    </md-card-actions>
                  </md-card>
                </md-list-item>
              </div>

            </md-list>
          </md-list-item>
        </md-list>
      </md-tab>
    </md-tabs>
    <!-- <router-view></router-view> -->


  </div>



</template>
<script>
import axios from 'axios'
import menuData from '../assets/menu.json'
import orderModal from './OrderModal.vue'
// var pizzaCategory;

export default {
  name: 'menu-list',
  components: {
    'order-modal': orderModal
  },
  data () {
    return {
      expandNews: false,
      expandSingle: false,
      MENU: [],
      showDialog: false,
      test: 10,
      modalType: null,
      selectedId: null,
      // modalData: orderModal

    }
  },
  created: function() {
    this.MENU = menuData.menu;
    // console.log(this.pizzaCategory);

  },
  methods: {
    showOrder: function(menu, id) {
      switch (menu){
        case 'pizza':
          this.modalType = "pizza";
          break;
        case 'chicken':
          this.modalType = "chicken";
          break;
        case 'side':
          this.modalType = "side";
          break;
        default:
          console.log("menu select err");
      };
      console.log("menu select: " + id);
      this.selectedId = id;
      this.showDialog = true;

      this.test = 5;
      // modalData.showDialog = true;
      // console.log(e);
    },
    closeModal: function(e) {
      this.showDialog = e;
      console.log(e);
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
}
</script>

<style lang="css" scoped>

  .fb-menu-container {
      padding: 0px 8px;
  }

  .fb-menu-card {
    margin: 0px !important;
    padding: 0px !important;
    max-width: 100%;
    max-height: 240px;
  }

  .fb-menu-tab {
    padding: 4px 0px;
  }

  .fb-menu-tabs {
    margin-bottom: 80px;
  }

  .fb-menu-title {
    padding: 0px 8px;
    text-align: left;
  }

  .fb-menu-list {
    text-align: center;
    display: block;

  }

  .fb-menu-price {
    text-align: center;
    justify-content: center;
    height: 30px;
    font-weight: 600;
    line-height: 30px;
  }

  .fb-menu-list-item {
    margin: 0px;

  }

  .fb-menu-box {
    background-color: #f5e1b0;
    margin-bottom: 4px;
  }



</style>
