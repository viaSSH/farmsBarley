<template lang="html">
  <div class="md-layout  md-alignment-center-center main-order-view">
    <div class="md-layout-item md-size-70 main-order-box">
        <span>현재까지 완료된 주문번호</span>
        <span style="font-size:20px; padding:0px;">14</span>
        <span>{{leftOrder}} 팀 대기중</span>
    </div>

    <span class="md-layout-item md-size-100">받으실 주문번호</span>

    <div class="md-layout-item md-size-100" style="margin: 10px 0px;">
      <div class="main-order-circle">
        <span class="main-order-circle-text">17</span>
      </div>
    </div>

    <div class="md-layout-item md-size-100" style="color: #374c3c">
      <span class="md-layout-item md-size-100">지금 주문하시면 </span>
      <p class="md-layout-item md-size-100">약 {{calPredctionTime(predictionTime+defaultMakeTime)}}분이 걸립니다. </p>

      <p class="md-layout-item md-size-100">주문하시겠습니까?</p>
    </div>


    <md-button class="md-layout-item md-size-33 md-raised md-accent" to="/menu">주문하기</md-button>
  </div>



</template>

<script>
import axios from 'axios'
import moment from 'vue-moment'

export default {
  name: 'main-page',
  data() {
    return {
      predictionTime: 0,
      defaultMakeTime: 10,
      leftOrder: 0,
    }
  },
  methods: {
    getTime: function() {
      axios
      .get('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1/time')
      .then((res) =>  {
        console.log(res);
        this.predictionTime = res.data.prevLeftTimeMax + res.data.toppingAllTime;
        this.leftOrder = res.data.leftOrder;
        // prevLeftTimeMax
        // toppingAllTime
      })
    },
    calPredctionTime: function(t) {
      var approximationTime = Math.round(t);
      // return a;
      return approximationTime;
    }
  },
  created: function() {
    this.getTime();
  }
}



//
</script>

<style lang="scss" >
  @import '../style.scss'

  // body
  //   overflow-x: hidden;
  //   overflow-y: hidden;
  //   overflow: hidden;

  .main-order-view
    text-align: center;

  .main-order-box
    border: 2px solid #374c3c;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #374c3c;


  .main-order-circle
    border: 1px solid #fff;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    text-align: center;
    margin: auto;
    background-color: #eecb77;

  .main-order-circle span
    line-height: 62px;
    font-size: 30px;

  .md-layout-item span
    width: 100%;
    height: 100%;
    padding: 8px;
    display: block;


  .md-list-item-content
    padding: 4px 8px !important;


</style>
