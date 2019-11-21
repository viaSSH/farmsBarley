<template >
  <div class="md-layout md-alignment-center-center fb-menuHistory-container">
    <!-- <div class="" v-if="MENU == null"> -->
    <div class="" v-if="MENU.length == 0">
      <span>주문내역이 없습니다 </span>
    </div>
    <div class="">
        <span> - {{stdId}} test</span>
    </div>

    <div class="md-layout-item md-size-90 fb-menuHistory-box"  v-for="(menu, index) in MENU" >
      <md-card>
        <md-card-header>
          <!-- <div class="md-subtitle">2019/10/21 02:30:12</div> -->
          <div class="md-subtitle">주문시간 - {{orderTime | moment("YYYY/M/DD HH:mm:ss")}}</div>
          <div class="md-subtitle">주문번호 - {{menu.orderIndex}}번</div>
        </md-card-header>
        <md-card-content class="md-layout md-alignment-center-center">
        <span class="md-layout-item md-size-75">{{menu.full}}</span>
        <span class="md-layout-item md-size-25">{{menu.price}}원</span>

        <div class="md-layout" v-if="menu.makedFood==0">
          <!-- <span>약 30분 소요 예정</span> -->
          <!-- <span class="md-layout-item md-size-25" :class="{'item-bold': isAfter(menu.state, menu.startTime, menu.makingTime)==1}" >주문접수</span> -->
          <span class="md-layout-item md-size-25" :class="{'item-bold': menu.state==0}" >주문접수</span>
          <span class="md-layout-item md-size-25" :class="{'item-bold': menu.state==1 && isAfter(menu.leftTime, menu.makingTime) == 1}" >토핑 중</span>
          <span class="md-layout-item md-size-25" :class="{'item-bold': menu.state==1 && isAfter(menu.leftTime, menu.makingTime) == 2}" >굽는 중</span>
          <span class="md-layout-item md-size-25" :class="{'item-bold': menu.state==2 }" >포장완료</span>

          <!-- <span style="text-align:center; font-size:16px; font-weight:800;">예정 완성 시간 {{calEndTime(menu.makeStartTime, menu.makingTime)}}</span> -->
          <span style="text-align:center; font-size:16px; font-weight:800;">예정 완성 시간 {{(Date.now()+(leftTime[index])*60*1000) | moment("HH시 mm분")}}</span>
          <span style="text-align:center;" >약 {{Math.ceil(menu.leftTime)}}분 후에 맛있는 피자가 완성됩니다.</span>
          <span style="text-align:center;" >미리 매장에 와서 대기해주세요</span>
        </div>




        </md-card-content>
      </md-card>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import moment from 'vue-moment'
import VueCookies from 'vue-cookies'
VueCookies.config('7d')

export default {
  name: 'order-history',
  data() {
    return {
        stdId: 0,
        MENU: [],
        menuList: [],
        // orderTime: []
        orderTime: 123,
        test: true,
        leftTime:[]
    }
  },
  watch: {

  },
  methods: {
    isAfter: function(t, making) {
      var now = Date.now();

      // console.log(making);
      if(t < making.oven) {
        return 2;
      }
      else if(t < making.oven + making.topping + making.cutting) {
        return 1;
      }
      else{
        // console.log("time error!");
      }



      // if((now - startTime)/1000/60 > makingTime.topping)
      // return true;
    },
    calEndTime: function(t) {
      // console.log(start, making);
      var left = Date.now() + t*60*1000;
      // return "123";
      console.log(Date.now(), left, t);
      return left;
    },
    getOrdered: function(id) {
      axios
      .get('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1?id='+id)
      .then((response) =>  {
        console.log(response);
        // for(var i=0 ; i<response.data.Count ; i++) {
        //   if(response.data.Items[i].state)
        // }
        response.data.Items.sort(function(a,b) {
          //   return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
              return a.orderIndex < b.orderIndex ? -1 : a.orderIndex > b.orderIndex ? 1 : 0;
          });

        this.num = response.data.Count;
        if(this.num > 0) {
            this.orderTime = response.data.Items[0].startTime;
        }
        // this.orderTime = response.data.Items[0].startTime;
        this.MENU = response.data.Items;
        for(var i=0 ; i< this.num ; i++) {
            if(response.data.Items[i].makedFood == 1) {
              this.MENU[i].leftTime = 0;
              this.leftTime.push(0);
            }
            else{
              this.calLeftTime(i, response.data.Items[i].orderCode);
            }

        }

      })
    },
    calLeftTime: function(id, code) {
      axios
      .get('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1/time?orderCode='+code)
      .then((response) =>  {
        console.log(response);
        console.log(id, code, response.data.leftTime);
        this.MENU[id].leftTime = response.data.leftTime;

        this.leftTime.push(response.data.leftTime);

      })
    }

  },
  created: function() {


    var temp = VueCookies.get('id');
    if(temp == null || temp == "") {
      temp = 0;
    }
    this.stdId = temp;

    this.getOrdered(this.stdId);
  }


}
</script>

<style lang="css" scoped>

.fb-menuHistory-box {
  margin: 10px 0px;
}

.fb-menuHistory-container {
  margin-bottom: 80px;
}

.item-bold {
  font-weight: 900;
  color: red;
}
</style>
