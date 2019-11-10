<template >
  <div class="">
      <div class="fb-cart-header">
        <span>장바구니</span>
      </div>

      <div class="md-layout md-alignment-center-center fb-cart-menubar">
        <div class="md-layout-item md-size-40">
          <md-checkbox v-model="isCheckedAll" value="1">전체선택</md-checkbox>
        </div>
        <div class="md-layout-item md-size-20">

        </div>
        <div class="md-layout-item md-size-40">
          <md-button class="md-raised md-primary" @click="deleteList()">
            <md-icon>delete</md-icon>
            삭제
            </md-button>
        </div>
      </div>

      <div class="md-layout md-alignment-center-center fb-cart-list-container">
        <div class="md-layout-item md-size-100 fb-cart-list-box">
          <md-card>
            <md-card-header>
              <!-- <div class="md-subtitle">2019/10/21 02:30:12</div> -->
              <div class="md-subtitle">{{new Date() | moment("YYYY/M/DD HH:mm:ss")}}</div>
            </md-card-header>

            <md-card-content>
              <md-table v-model="orderList" md-card @md-selected="onSelect">

                <!-- <md-table-toolbar>
                  <h1 class="md-title">주문</h1>
                </md-table-toolbar> -->

                <!-- <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                  <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                  <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </div>
                </md-table-toolbar> -->

                <md-table-row slot="md-table-row" slot-scope="{ item }"  md-selectable="multiple" md-auto-select>
                  <md-table-cell md-label="메뉴" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell  md-label="가격/수량" md-sort-by="">{{ item.price }}</md-table-cell>
                  <!-- <md-table-cell md-label="수량" md-sort-by="gender">{{ item.amount }}</md-table-cell> -->
                  <!-- <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell> -->
                </md-table-row>
              </md-table>
            </md-card-content>

            <md-card-actions>
              <!-- <md-button>Action</md-button> -->
              <span> <md-icon>access_time</md-icon> 약 30분 소요 예정</span>
              <md-button class="md-raised md-accent fb-cart-list-action" @click="buy()">결제하기</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>


  </div>

</template>

<script>
import menuData from '../assets/menu.json'
import timeData from '../assets/time.json'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import moment from 'vue-moment'
VueCookies.config('7d')

export default {
  name: 'order-cart',
  data:()=> ({
    isCheckedAll: false,
    selected: [],
    orderList: [
      // {
      //   name: '슈퍼슈프림',
      //   price: '13500/1개',
      //   amount: '1'
      // },
      // {
      //   name: '슈퍼슈프림3',
      //   price: '13500/1개',
      //   amount: '1'
      // }
    ],
    // curTime: new Date().format("yyyy")



  }),
  methods: {
    onSelect (items, a) {
        this.selected = items;
        console.log(items, a);
    },
    deleteList: function() {
      var temp = JSON.parse(VueCookies.get('menu'));

      for(var i=0 ; i<this.selected.length ; i++) {
          console.log("delete", this.selected[i].id);
          this.orderList.splice(this.selected[i].id-1, 1);
          temp.splice(this.selected[i].id-1, 1);
      }
      console.log(JSON.parse(VueCookies.get('menu')));


      // console.log(this.orderList);
      VueCookies.set('menu', JSON.stringify(temp));

    },
    createMenuData: function() {

      console.log(JSON.parse(VueCookies.get('menu')));
      var jsonData = JSON.parse(VueCookies.get('menu'));

      if(jsonData == null) jsonData = {};
      var cnt = jsonData.length;
      var orderData = new Object();
      var orderName;
      var orderPrice;

      if(cnt == undefined) cnt = 0;

      for(var num=0 ; num<cnt ; num++) {
        var menuId = jsonData[num].id;
        console.log(menuId);
        orderName = "";

        if(menuId.slice(0,1) == 'p') {

          for(var i=0 ; i<7 ; i++) {
            for(var j=0 ; j<menuData.menu.pizza[i].type.length ; j++) {
              if(menuData.menu.pizza[i].type[j].id == menuId) {
                orderName = orderName + menuData.menu.pizza[i].category + "/";
                // console.log(menuData.menu.pizza[i].category);

                // console.log(menuData.menu.pizza[i].type[j].name);
                orderName = orderName + menuData.menu.pizza[i].type[j].name + "/";

                orderPrice = menuData.menu.pizza[i].price;
              }

            }
          }

          //for half
          if(jsonData[num].option != "default") {
            for(var i=0 ; i<7 ; i++) {
              for(var j=0 ; j<menuData.menu.pizza[i].type.length ; j++) {
                if(menuData.menu.pizza[i].type[j].id == jsonData[num].option) {
                  orderName = "반반/" + orderName + menuData.menu.pizza[i].type[j].name + "/";
                  // console.log(orderPrice);
                  for(var k=0 ; k<orderPrice.length ; k++) {
                    orderPrice[k] = orderPrice[k] + 1000;
                    // console.log("1000");
                  }
                }
              }
            }
          }

          switch (jsonData[num].size) {
            case 'large':
              orderName = orderName + "미디움/";
              orderPrice = orderPrice[0];
              break;
            case 'medium':
              orderName = orderName + "라지/";
              orderPrice = orderPrice[1];
              break;
            case 'big':
              orderName = orderName + "빅/";
              orderPrice = orderPrice[2];
              break;
          }



          switch (jsonData[num].crust) {
            case 'no':
              // orderName = orderName + "라지/";
              break;
            case 'yes':
              orderName = orderName + "크러스트추가/";
              orderPrice = orderPrice + 1000;
              break;
          }

          switch (jsonData[num].cutting) {
            case 'normal':
              orderName = orderName + "일반모양/";
              break;
            case 'square':
              orderName = orderName + "벌집/";
              break;
          }

        }
        else if(menuId.slice(0,1) == 'c') {
          for(var i=0 ; i<3 ; i++) {
            for(var j=0 ; j<menuData.menu.chicken[i].type.length ; j++) {
              if(menuData.menu.chicken[i].type[j].id == menuId) {
                orderName = orderName + menuData.menu.chicken[i].category + "/";
                // console.log(menuData.menu.chicken[i].category);

                // console.log(menuData.menu.chicken[i].type[j].name);
                orderName = orderName + menuData.menu.chicken[i].type[j].name + "/";

                orderPrice = menuData.menu.chicken[i].type[j].price;
              }

            }
          }

          if(jsonData[num].option != "s0") {
            for(var i=0 ; i<menuData.menu.chicken[2].type.length ; i++) {
              if(menuData.menu.chicken[2].type[i].id == jsonData[num].option) {
                // console.log(menuData.menu.chicken[2].type[i].id);
                orderName = orderName + menuData.menu.chicken[2].type[i].name + "/";
              }
            }
          }
        }
        console.log(orderData);
        orderData = {"name": orderName, "price": orderPrice+"원/"+jsonData[num].quantity+"개", "id": num+1};

        if(Object.keys(orderData).length !== 0) {
            this.orderList.push(orderData);
        }
      }







      // console.log("hihi");
    },
    buy: function() {
      var params = new Object();
      var stdId = 21300816;


      var orderTime = Date.now();
      var orderCode = String(stdId) + String(orderTime%100000);

      params.stdId = stdId;
      params.orderCode = orderCode;
      params.order = new Array();

      var jsonData = JSON.parse(VueCookies.get('menu'));
      var cnt = jsonData.length;
      for(var i=0 ; i<cnt ; i++) {
        params.order[i] = new Object()  ;
        params.order[i].menuId = jsonData[i].id;
        params.order[i].cutting = jsonData[i].cutting;
        params.order[i].crust = jsonData[i].crust;
        params.order[i].option = jsonData[i].option;
        params.order[i].quantity = jsonData[i].quantity;
        params.order[i].size = jsonData[i].size;

        params.order[i].price = 0;
        params.order[i].state = 0;
        params.order[i].full = this.orderList[i].name;

        // if(jsonData[i].id)

        if(jsonData[i].id.slice(0, 1) == 'p') {
          if(jsonData[i].option != 'default') {
            switch (jsonData[i].size) {
              case 'medium':
                  params.order[i].makingTime = timeData.half.medium.total;
                  break;
              case 'large':
                  params.order[i].makingTime = timeData.half.large.total;
                  break;
              case 'big':
                  params.order[i].makingTime = timeData.half.big.total;
                  break;
              default:
                    console.log("size err");
            }
          }
          else if(jsonData[i].id.slice(1, 2) == 's') {
            switch (jsonData[i].size) {
              case 'medium':
                  params.order[i].makingTime = timeData.thin.medium.total;
                  break;
              case 'large':
                  params.order[i].makingTime = timeData.thin.large.total;
                  break;
              case 'big':
                  params.order[i].makingTime = timeData.thin.big.total;
                  break;
              default:
                    console.log("size err2");
            }
          }
          else if(jsonData[i].id.slice(1, 2) == 'c') {
            switch (jsonData[i].size) {
              case 'medium':
                  params.order[i].makingTime = timeData.chicago.medium.total;
                  break;
              case 'large':
                  params.order[i].makingTime = timeData.chicago.large.total;
                  break;
              default:
                    console.log("size err2");
            }
          }
          else if(jsonData[i].id.slice(1, 2) == 'b') {
            switch (jsonData[i].size) {
              case 'medium':
                  params.order[i].makingTime = timeData.bigpi.medium.total;
                  break;
              default:
                    console.log("size err3");
            }
          }
        }
        else if(jsonData[i].id.slice(0, 1) == 'c') {
          params.order[i].makingTime = timeData.chicken.medium.total;
        }
        else {
          console.log("slice 0 1 err");
        }

      }
      // params.menuId =

      console.log(params);
      // console.log(timeData);


      axios
      .put('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1',
          params
      )
      .then((resp) => {
        // VueCookies.remove("menu");
        this.orderList = [];

        var preData = JSON.parse(VueCookies.get('ordered'));
        var orderCode = resp.data;
        console.log(resp);
      })
    },
    test: function() {
      axios
      .get('https://tqxh9shurc.execute-api.ap-northeast-2.amazonaws.com/v1/mytest')
      .then(response => (
        // this.info = response
        console.log(response)
      ))
    }
  },
  created: function() {


    this.createMenuData();
  }
}
</script>

<style lang="css" scoped>

.fb-cart-header {
  background-color: #374e3c;
  text-align: center;
  margin-top: 2px;
  color: #cccb77;
  height: 40px;
  line-height: 40px;
}

.fb-cart-menubar {
  /* padding-left: 12px; */
  text-align: center;
  border-bottom: 1px solid;
}

.fb-cart-list-box {
  padding: 6px 20px;
}

/* .fb-cart-list-action {
  justify-content: space-evenly;
} */


</style>
