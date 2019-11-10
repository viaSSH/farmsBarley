<template >
  <div class="md-layout md-alignment-center-center fb-menuHistory-container">
    <div class="md-layout-item md-size-90 fb-menuHistory-box"  v-for="menu in MENU" >
      <md-card>
        <md-card-header>
          <!-- <div class="md-subtitle">2019/10/21 02:30:12</div> -->
          <div class="md-subtitle">주문시간 - {{orderTime | moment("YYYY/M/DD HH:mm:ss")}}</div>
        </md-card-header>
        <md-card-content class="md-layout md-alignment-center-center">
        <span class="md-layout-item md-size-75">{{menu.full}}</span>
        <span class="md-layout-item md-size-25">13500원</span>

        <span>약 30분 소요 예정</span>
        <span class="md-layout-item md-size-25">주문접수</span>
        <span class="md-layout-item md-size-25">토핑 중</span>
        <span class="md-layout-item md-size-25">굽는 중</span>
        <span class="md-layout-item md-size-25">포장완료</span>

        <span>예정 완성 시간 12:12</span>
        <span>약 30분 후에 맛있는 피자가 완성됩니다.</span>
        <span>미리 매장에 와서 대기해주세요</span>

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
        orderTime: 123
    }
  },
  methods: {
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
</style>
