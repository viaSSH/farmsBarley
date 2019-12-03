<template>
  <div>
    <md-dialog :md-active.sync="showDialog" class="fb-order-modal" :md-click-outside-to-close=false @md-clicked-outside="toggle()">
    <!-- <md-dialog> -->
      <!-- <md-dialog-title>{{modalType}}</md-dialog-title> -->
      <md-dialog-title >예상금액 {{currentPrice.toLocaleString()}}원 </md-dialog-title>

      <md-dialog-content>
        <!-- <p>zzz</p> -->

          <div class="md-layout">

            <!-- for pizza -->
            <div v-if="modalType=='pizza'" class="md-layout-item md-size-100">
              <b-form-group id="input-group-1" label="일반" label-for="input-1">
                <b-form-select variant="primary" class="fb-select-box" v-model="selectedId" :options="pizzaOptions" disabled></b-form-select>
              </b-form-group>
            </div>

            <div v-if="modalType=='pizza'" class="md-layout-item md-size-100">
              <b-form-group id="input-group-2" label="반반 선택 +1000원" label-for="input-2">
                <b-form-select variant="primary" class="fb-select-box" v-model="pizzaHalfSelected" :options="pizzaHalfOptions"></b-form-select>
              </b-form-group>
            </div>

            <!-- for chicken -->
            <div v-if="modalType=='chicken'" class="md-layout-item md-size-50" style="padding-right:12px">
              <b-form-group id="input-group-1" label="한마리/두마리" label-for="input-1">
                <b-form-select variant="primary" class="fb-select-box" v-model=selectedId :options="chickenOptions" disabled></b-form-select>
              </b-form-group>
            </div>

            <div v-if="modalType=='chicken'"  class="md-layout-item md-size-50">
              <b-form-group id="input-group-3" label="치킨 1" label-for="input-3">
                <b-form-select class="fb-select-box" v-model="chickenSauceSelected" :options="chickenSauceOptions"></b-form-select>
              </b-form-group>
            </div>

            <!-- for side -->
            <div v-if="modalType=='side'" class="md-layout-item md-size-50" style="padding-right:12px">
              <b-form-group id="input-group-10" label="메뉴선택" label-for="input-1">
                <b-form-select variant="primary" class="fb-select-box" v-model=selectedId :options="sideOptions" disabled></b-form-select>
              </b-form-group>
            </div>

            <div v-if="modalType=='pizza'"  class="md-layout-item md-size-50">
              <b-form-group label="사이즈">
                <b-form-radio-group
                  id="btn-radios-2"
                  v-model="pizzaSizeSelected"
                  :options="pizzaSizeOptions"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  name="radio-btn-outline"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <!-- <div v-if="modalType=='pizza' && (selectedId.slice(0,2)=='ps' || selectedId.slice(0,3)=='ppa' || selectedId.slice(0,3)=='ppc')"  class="md-layout-item md-size-50">
              <b-form-group id="input-group-3" label="크러스트" label-for="input-3">
                <b-form-select class="fb-select-box" v-model="pizzaCrustSelectd" :options="pizzaCrustOptions"></b-form-select>
              </b-form-group>
            </div> -->

            <div class="md-layout-item md-size-50">
              <b-form-group label="수량">
                <b-button-group>
                  <b-button v-on:click="quantityChange(-1)"  variant="outline-primary" size="lg" >-</b-button>
                  <b-button variant="primary" size="lg" block>{{menuquantity}}</b-button>
                  <b-button v-on:click="quantityChange(1)" variant="outline-primary" size="lg" >+</b-button>
                </b-button-group>
              </b-form-group>

            </div>

            <div v-if="modalType=='pizza'"  class="md-layout-item md-size-50">
              <b-form-group id="input-group-5" label="커팅" label-for="input-5">
                <b-form-select class="fb-select-box" v-model="pizzaCuttingSelectd" :options="pizzaCuttingOptions"></b-form-select>
              </b-form-group>
            </div>

            <!-- for chicken -->
            <div v-if="modalType=='chicken' && selectedId=='c2'"  class="md-layout-item md-size-50">
              <b-form-group id="input-group-5" label="치킨2" label-for="input-5">
                <b-form-select class="fb-select-box" v-model="chickenAddSauceSelectd" :options="chickenAddSauceOptions"></b-form-select>
              </b-form-group>
            </div>




          </div>


      </md-dialog-content>

      <md-dialog-actions class="md-layout fb-modal-action-btn">
        <!-- <md-button class="md-raised md-primary md-layout-item md-size-40"  @click="toggle()" >바로주문</md-button> -->
        <md-button class="md-raised md-primary md-layout-item md-size-40"  @click="addToCartAndBuy()" >바로주문</md-button>
        <md-button class="md-raised md-primary md-layout-item md-size-40"  @click=" addToCart();">장바구니 담기</md-button>
        <!-- <md-button class="md-primary" :value="showDialog" @click="toggleDialog = false">Save</md-button> -->
      </md-dialog-actions>
    </md-dialog>

    <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->

  </div>
</template>

<script>
import menuData from '../assets/menu.json'

import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router';


// Vue.use(require('vue-cookies'))
//
VueCookies.config('7d')

  export default {
    name: 'order-modal',
    props: {
      showDialog: {
        type: Boolean,
        default: false
      },
      modalType: String,
      selectedId: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      MENU: [],
      selectedMovies: [],
      sizeM: false,
      sizeL: false,
      sizeB: false,
      radio: false,
      pizzaSizeSelected: 'medium',
      pizzaSizeOptions: [
        { text: 'M', value: 'medium' },
        { text: 'L', value: 'large' },
        { text: 'B', value: 'big' , disabled:true}
      ],
      pizzaMenuSelectd: 'p1',
      pizzaOptions: [
        // {text: '반반 메뉴선택', value: 'half'}
      ],
      pizzaHalfSelected: 'default',
      pizzaHalfOptions: [
        {text: '선택없음', value: 'default'}
      ],

      pizzaCrustSelectd: 'no',
      pizzaCrustOptions: [
        { text: '없음', value: 'no' },
        { text: '있음', value: 'yes' }
      ],
      pizzaQuantitySelected: '1',
      pizzaQuantityOptions: [
        { text: '-', value: '1' },
        { text: '1', value: '0', disabled: true},
        { text: '+', value: '2' }
      ],
      pizzaCuttingSelectd: 'normal',
      pizzaCuttingOptions: [
        { text: '일반', value: 'normal' },
        { text: '벌집모양', value: 'square' },
      ],

      // chicken data
      // chickenMenuSelectd: 'c1',
      // chickenMenuSelectd: this.selectedId,
      chickenOptions: [
      ],
      chickenSauceSelected: 's0',
      chickenSauceOptions: [
        { text: '후라이드(기본)', value: 's0' },
      ],
      chickenAddSauceSelectd: 's0',
      chickenAddSauceOptions: [
        { text: '후라이드(기본)', value: 's0' },
      ],

      sideOptions: [],
      menuquantity: 1,
      orderData: [],
      priceBySize: [],
      currentPrice: 0,
      pizzaPrice: 0, halfPrice: 0, crustPrice: 0,
      chickenPrice: 0, saucePrice:0, addSaucePrice: 0,
      sidePrice:0,

    }),
    watch: {
      selectedId: function(newV, oldV) {
        console.log("selected", newV);
        this.pizzaHalfOptions = new Array();
        this.pizzaSizeOptions = new Array();

        this.currentPrice=0; this.pizzaPrice=0; this.halfPrice=0; this.crustPrice=0;
        this.chickenPrice=0; this.saucePrice=0; this.addSaucePrice=0; this.sidePrice=0;

        this.pizzaSizeOptions.push({text: 'M', value: 'medium'});
        this.pizzaHalfOptions.push({text: '선택없음', value: 'default'});
        if(newV.slice(0,1) == 'p') {
          if(newV.slice(1,2) == 's') {
              for(var i=0 ; i<menuData.menu.pizza[0].type.length ; i++) {
                this.pizzaHalfOptions.push({text: "반반 - " + menuData.menu.pizza[0].type[i].name,  value: menuData.menu.pizza[0].type[i].id});
              }
              this.pizzaSizeOptions.push({text: 'L', value: 'large'});
              this.pizzaSizeOptions.push({text: 'B', value: 'big'});

              this.priceBySize = menuData.menu.pizza[0].price;
          }
          if(newV.slice(1,3) == 'pa') {
              for(var i=0 ; i<menuData.menu.pizza[1].type.length ; i++) {
                this.pizzaHalfOptions.push({text: "반반 - " + menuData.menu.pizza[1].type[i].name,  value: menuData.menu.pizza[1].type[i].id});
              }
              this.pizzaSizeOptions.push({text: 'L', value: 'large'});
              this.pizzaSizeOptions.push({text: 'B', value: 'big'});
              this.priceBySize = menuData.menu.pizza[1].price;
          }
          if(newV.slice(1,3) == 'pb') {
            this.priceBySize = menuData.menu.pizza[2].price;
          }
          if(newV.slice(1,3) == 'pc') {
              for(var i=0 ; i<menuData.menu.pizza[3].type.length ; i++) {
                this.pizzaHalfOptions.push({text: "반반 - " + menuData.menu.pizza[3].type[i].name,  value: menuData.menu.pizza[3].type[i].id});
              }
              this.pizzaSizeOptions.push({text: 'L', value: 'large'});
              this.pizzaSizeOptions.push({text: 'B', value: 'big'});
              this.priceBySize = menuData.menu.pizza[3].price;
          }
          if(newV.slice(1,2) == 'c') {
              for(var i=0 ; i<menuData.menu.pizza[4].type.length ; i++) {
                this.pizzaHalfOptions.push({text: "반반 - " + menuData.menu.pizza[4].type[i].name,  value: menuData.menu.pizza[4].type[i].id});
              }
              this.pizzaSizeOptions.push({text: 'L', value: 'large'});
              this.priceBySize = menuData.menu.pizza[4].price;
          }
          if(newV.slice(1,2) == 'j') {
              this.priceBySize = menuData.menu.pizza[5].price;
          }
          if(newV.slice(1,2) == 'b') {
              for(var i=0 ; i<menuData.menu.pizza[6].type.length ; i++) {
                this.pizzaHalfOptions.push({text: "반반 - " + menuData.menu.pizza[6].type[i].name,  value: menuData.menu.pizza[6].type[i].id});
              }
              this.priceBySize = menuData.menu.pizza[6].price;
          }


          this.pizzaPrice = this.priceBySize[0];
          this.currentPrice = this.pizzaPrice;
        }
        else if(newV.slice(0,1) == 'c') {
          var chickenTypes = menuData.menu.chicken[0];
          console.log(chickenTypes);
          for(var i=0 ; i<chickenTypes.type.length ; i++) {
            // console.log(chickenTypes.type[i].price);
            if(newV == chickenTypes.type[i].id) {
              this.chickenPrice = chickenTypes.type[i].price;
            }
          }
          this.currentPrice = this.chickenPrice;
        }
        else if(newV.slice(0,1) == 's') {
          if(newV.slice(1,2) == 'd') {
              for(var i=0 ; i<menuData.menu.side[0].type.length ; i++) {
                if(newV == menuData.menu.side[0].type[i].id) {
                  this.sidePrice = menuData.menu.side[0].type[i].price;
                }
              }
          }
          else if(newV.slice(1,2) == 'p') {
              for(var i=0 ; i<menuData.menu.side[1].type.length ; i++) {
                if(newV == menuData.menu.side[1].type[i].id) {
                  this.sidePrice = menuData.menu.side[1].type[i].price;
                }
              }
          }
          else if(newV.slice(1,2) == 'c') {
              for(var i=0 ; i<menuData.menu.side[2].type.length ; i++) {
                if(newV == menuData.menu.side[2].type[i].id) {
                  this.sidePrice = menuData.menu.side[2].type[i].price;
                }
              }
          }
          console.log(this.sidePrice);
          this.currentPrice = this.sidePrice;
        }


        // [
        //   { text: 'M', value: 'medium' },
        //   { text: 'L', value: 'large' disabled:true},
        //   { text: 'B', value: 'big' , disabled:true}
        // ];
        this.pizzaQuantitySelected = '1';
        this.menuquantity = 1;
        this.pizzaSizeSelected = "medium";

      },
      pizzaHalfSelected: function(newV, oldV) {
        console.log(newV, oldV);
        if(newV != "default") {
          this.halfPrice = 1000;
        }
        else{
          this.halfPrice = 0;
        }
        this.currentPrice = (this.crustPrice + this.pizzaPrice + this.halfPrice) * this.menuquantity;
        // if(oldV == "default" && newV != "default") {
        //   this.currentPrice += 1000;
        // }
        // else if(newV == "default" && oldV != "default") {
        //   this.currentPrice -= 1000;
        // }
      },
      pizzaSizeSelected: function(newV, oldV) {
        console.log(newV, oldV);
        console.log(this.crustPrice, this.pizzaPrice,  this.halfPrice, this.menuquantity);

        if(this.pizzaCrustSelectd == "no") {
          this.crustPrice = 0;
        }

        if(newV == "medium"){
          this.pizzaPrice = this.priceBySize[0];
          if(this.pizzaCrustSelectd == "yes") {
            this.crustPrice = 3500;
          }
        }
        else if(newV == "large") {
          this.pizzaPrice = this.priceBySize[1];
          if(this.pizzaCrustSelectd == "yes") {
            this.crustPrice = 4500;
          }
        }
        else if(newV == "big") {
          this.pizzaPrice = this.priceBySize[2];
          if(this.pizzaCrustSelectd == "yes") {
            this.crustPrice = 5500;
          }
        }

        // console.log(this.crustPrice, this.pizzaPrice,  this.halfPrice, this.menuquantity);

        this.currentPrice = (this.crustPrice + this.pizzaPrice + this.halfPrice) * this.menuquantity;
      },
      pizzaCrustSelectd: function(newV, oldV) {
        console.log(newV, oldV);
        if(newV == "yes") {
          if(this.pizzaSizeSelected == "medium") {
            this.crustPrice = 3500;
          }
          else if(this.pizzaSizeSelected == "large") {
            this.crustPrice = 4500;
          }
          else if(this.pizzaSizeSelected == "big") {
            this.crustPrice = 5500;
          }
        }
        else{
          this.crustPrice = 0;
        }

        this.currentPrice = (this.crustPrice + this.pizzaPrice + this.halfPrice) * this.menuquantity;
      },
      menuquantity: function(newV, oldV) {
        if(this.pizzaPrice != 0) {
            this.currentPrice = (this.crustPrice + this.pizzaPrice + this.halfPrice) * this.menuquantity;
        }
        else if(this.chickenPrice != 0) {
          this.currentPrice = (this.chickenPrice + this.saucePrice + this.addSaucePrice) * this.menuquantity;
        }
        else if(this.sidePrice != 0) {
          this.currentPrice = (this.sidePrice) * this.menuquantity;
        }

      },
      chickenSauceSelected: function(newV, oldV) {
        console.log(newV);
        if(newV != "s0") {
          this.saucePrice = 1000;
        }
        else{
          this.saucePrice = 0;
        }
        this.currentPrice = (this.chickenPrice + this.saucePrice + this.addSaucePrice) * this.menuquantity;
      },
      chickenAddSauceSelectd: function(newV, oldV) {
        if(newV != "s0") {
          this.addSaucePrice = 1000;
        }
        else{
          this.addSaucePrice = 0;
        }
        this.currentPrice = (this.chickenPrice + this.saucePrice + this.addSaucePrice) * this.menuquantity;
      }
    },
    created: function() {
      // this.MENU = menuData.menu;
      // console.log(menuData.menu);



    },
    mounted() {
      this.setPizzaDataFromJson()
    },
    methods: {
      toggle: function() {
        this.$emit('closeModalE', false);

        // this.$emit('hide-modal')
        // this.showDialog = !this.showDialog;
      },
      quantityChange: function(e) {
        if(e == -1){
          this.menuquantity -= 1;
        }
        else if(e == 1){
          this.menuquantity += 1;
        }
        if(this.menuquantity < 1)
          this.menuquantity = 1;

        // console.log(e);
      },
      addToCart: function() {
        console.log("cart");
        this.orderData = new Array();

        switch (this.modalType) {
          case 'pizza':
            this.orderData.push(
              {"id": this.selectedId,
              "option": this.pizzaHalfSelected,
              "size": this.pizzaSizeSelected,
              "crust": this.pizzaCrustSelectd,
              "cutting": this.pizzaCuttingSelectd,
              "quantity": this.menuquantity}
            );
            break;
          case 'chicken':
            // this.orderData.push({"text": } );
            this.orderData.push(
              {"id": this.selectedId,
              "option": this.chickenSauceSelected,
              "quantity": this.menuquantity
            });

            if(this.chickenAddSauceSelectd != "s0") {
              this.orderData.push(
                {"id": this.chickenAddSauceSelectd,
                "quantity": this.menuquantity});
            }
            break;
          case 'side':
            this.orderData.push(
              {"id": this.selectedId,
              "quantity": this.menuquantity}
            );


            // console.log(this.selectedId);
            // console.log(this.chickenSauceSelected);
            // console.log(this.menuquantity);
            // console.log(this.chickenAddSauceSelectd);
            break;
          default:
            break;

          // this.toggle();

        }

        // console.log(this.orderData);
        var prevData = this.getcookie();
        console.log(prevData);
        if(prevData == null){
          console.log("prev null");
          prevData = new Object();
          VueCookies.set('menu', JSON.stringify(this.orderData));
        }
        else{

            prevData = prevData.concat(this.orderData);
            console.log(prevData, this.orderData);
            VueCookies.set('menu', JSON.stringify(prevData));
        }

        console.log(prevData);

        // VueCookies.set('menu', JSON.stringify(prevData));



        this.$emit('closeModalE', false);

      },
      addToCartAndBuy: function() {
        this.addToCart();
        this.$router.push('/orderCart');

      },
      getcookie: function() {
        // console.log(JSON.parse(VueCookies.get('menu')));
        return JSON.parse(VueCookies.get('menu'));
      },
      setPizzaDataFromJson: function() {
        // foreach(this.MENU.pizza)
        // this.pizzaOptions.push({text:'test', value: 'zz'});
        // console.log(menuData.menu.chicken[2].type);

        // pizzaOptions
        // for(var cnt=0 ; cnt<7 ; cnt++) {
        for(var cnt=0 ; cnt<3 ; cnt++) {
          for(var i=0 ; i<menuData.menu.pizza[cnt].type.length ; i++) {

            this.pizzaOptions.push({text: menuData.menu.pizza[cnt].category + "-" + menuData.menu.pizza[cnt].type[i].name,  value: menuData.menu.pizza[cnt].type[i].id});
            // console.log(menuData.menu.pizza[cnt].type[i].name);


          }
        }




        for(var i=0 ; i<menuData.menu.chicken[0].type.length ; i++) {
            this.chickenOptions.push({text: menuData.menu.chicken[0].type[i].name,  value: menuData.menu.chicken[0].type[i].id});
        }

        // for(var i=0 ; i<menuData.menu.chicken[1].type.length ; i++) {
        //     this.chickenOptions.push({text: menuData.menu.chicken[1].type[i].name,  value: menuData.menu.chicken[1].type[i].id});
        // }


        for(var i=0 ; i<menuData.menu.chicken[1].type.length ; i++) {
            this.chickenAddSauceOptions.push({text: menuData.menu.chicken[1].type[i].name,  value: menuData.menu.chicken[1].type[i].id});
            this.chickenSauceOptions.push({text: menuData.menu.chicken[1].type[i].name,  value: menuData.menu.chicken[1].type[i].id});
        }

        // pizzaOptions
        for(var cnt=0 ; cnt<3 ; cnt++) {
          for(var i=0 ; i<menuData.menu.side[cnt].type.length ; i++) {

            this.sideOptions.push({text: menuData.menu.side[cnt].type[i].name,  value: menuData.menu.side[cnt].type[i].id});
            // console.log(menuData.menu.side[cnt].type[i].name);


          }
        }



        // this.menuData.menu.chicken[2].type.forEach(function (item, index) {
        //   this.chickenAddSauceOptions.push({text: item.name,  value: item.id});
        //   console.log({text: item.name, value: item.id});
        // });
      }
    }
  }
</script>

<style lang="css" scoped>
  .md-dialog {
    max-width: 768px;
  }
  .fb-order-modal {
    max-height: 70%;
    top: unset;
    bottom: 56px;
    margin: 0px;
  }

  .fb-select-box {
    border: 2px solid #374e3c;
    color: #374e3c;
    min-height: 48px;
  }

  .fb-modal-action-btn {
    justify-content: space-evenly;
  }


</style>
