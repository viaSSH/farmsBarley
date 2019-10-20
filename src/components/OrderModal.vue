<template>
  <div>
    <md-dialog :md-active.sync="showDialog" class="fb-order-modal" :md-click-outside-to-close=false @md-clicked-outside="toggle()">
    <!-- <md-dialog> -->
      <md-dialog-title>!!TEST!!</md-dialog-title>

      <md-dialog-content>
        <!-- <p>zzz</p> -->

          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <b-form-group id="input-group-1" label="일반/반반" label-for="input-1">
                <b-form-select variant="primary" class="fb-select-box" v-model="pizzaMenuSelectd" :options="pizzaOptions"></b-form-select>
              </b-form-group>
            </div>

            <div class="md-layout-item md-size-50">
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

            <div class="md-layout-item md-size-50">
              <b-form-group id="input-group-3" label="크러스트" label-for="input-3">
                <b-form-select class="fb-select-box" v-model="pizzaCrustSelectd" :options="pizzaCrustOptions"></b-form-select>
              </b-form-group>
            </div>

            <div class="md-layout-item md-size-50">
              <b-form-group label="수량">
                <b-button-group>
                  <b-button v-on:click="quantityChange(-1)"  variant="outline-primary" size="lg" >-</b-button>
                  <b-button variant="primary" size="lg" block>{{pizzaQauntity}}</b-button>
                  <b-button v-on:click="quantityChange(1)" variant="outline-primary" size="lg" >+</b-button>
                </b-button-group>
              </b-form-group>

            </div>

            <div class="md-layout-item md-size-50">
              <b-form-group id="input-group-5" label="커팅" label-for="input-5">
                <b-form-select class="fb-select-box" v-model="pizzaCuttingSelectd" :options="pizzaCuttingOptions"></b-form-select>
              </b-form-group>
            </div>




          </div>


      </md-dialog-content>

      <md-dialog-actions class="md-layout fb-modal-action-btn">
        <md-button class="md-raised md-primary md-layout-item md-size-40"  @click="toggle()" >바로주문</md-button>
        <md-button class="md-raised md-primary md-layout-item md-size-40"  @click="toggle()">장바구니 담기</md-button>
        <!-- <md-button class="md-primary" :value="showDialog" @click="toggleDialog = false">Save</md-button> -->
      </md-dialog-actions>
    </md-dialog>

    <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->

  </div>
</template>

<script>
import menuData from '../assets/menu.json'

  export default {
    name: 'order-modal',
    props: {
      showDialog: {
        type: Boolean,
        default: false
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
        { text: 'B', value: 'big' }
      ],
      pizzaMenuSelectd: 'p1',
      pizzaOptions: [
        { text: '일반 -슈퍼슈프림', value: 'p1' },
        { text: '일반 - ㅋ', value: 'p2' },
        { text: '일반 - ㄴ', value: 'p3' }
      ],
      pizzaCrustSelectd: 'c1',
      pizzaCrustOptions: [
        { text: '없음', value: 'c1' },
        { text: '있음', value: 'c2' }
      ],
      pizzaQuantitySelected: '1',
      pizzaQuantityOptions: [
        { text: '-', value: '1' },
        { text: '1', value: 'large', disabled: true},
        { text: '+', value: 'big' }
      ],
      pizzaCuttingSelectd: 'normal',
      pizzaCuttingOptions: [
        { text: '일반', value: 'normal' },
        { text: '벌집모양', value: 'square' },
      ],
      pizzaQauntity: 0

    }),
    created: function() {
      this.MENU = menuData.menu;
      console.log(menuData.menu);

    },
    methods: {
      toggle: function() {
        this.$emit('closeModalE', false);
        // this.$emit('hide-modal')
        // this.showDialog = !this.showDialog;
      },
      quantityChange: function(e) {
        if(e == -1){
          this.pizzaQauntity -= 1;
        }
        else if(e == 1){
          this.pizzaQauntity += 1;
        }
        if(this.pizzaQauntity < 1)
          this.pizzaQauntity = 1;

        console.log(e);
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
