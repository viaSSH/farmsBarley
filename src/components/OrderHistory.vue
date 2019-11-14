<template >
  <div class="md-layout md-alignment-center-center fb-menuHistory-container">
    <div class="md-layout-item md-size-90 fb-menuHistory-box"  v-for="menu in MENU" >
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
          <span>약 30분 소요 예정</span>
          <span class="md-layout-item md-size-25" :class="{'item-bold': isAfter(menu.state, menu.startTime, menu.makingTime)==1}" >주문접수</span>
          <span class="md-layout-item md-size-25">토핑 중</span>
          <span class="md-layout-item md-size-25">굽는 중</span>
          <span class="md-layout-item md-size-25">포장완료</span>

          <span style="text-align:center; font-size:16px; font-weight:800;">예정 완성 시간 {{calEndTime(menu.makeStartTime, menu.makingTime)}}</span>
          <span style="text-align:center;" >약 30분 후에 맛있는 피자가 완성됩니다.</span>
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

export default {
  name: 'order-history',
  data() {
    return {
        stdId: 21300816,
        MENU: null,
        menuList: [],
        // orderTime: []
        orderTime: 123,
        test: true
    }
  },
  methods: {
    isAfter: function(state, startTime, makingTime) {
      if(state == 1) {
        return 1;
      }
      // return true;
    },
    calEndTime: function(start, making) {
      console.log(start, making);
      return "123";
    },
    getOrdered: function() {
      axios
      .get('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1?id='+this.stdId)
      .then((response) =>  {
        console.log(response);
        this.num = response.data.Count;
        this.orderTime = response.data.Items[0].startTime;
        this.MENU = response.data.Items;
      })
    },

  },
  created: function() {
    this.getOrdered();
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
