<template lang="html">
  <div class="md-layout  md-alignment-center-center main-order-view">
    <div class="md-layout-item md-size-70 main-order-box">
        <span>현재까지 완료된 주문번호</span>
        <span>14</span>
        <span>1 팀 대기중</span>
    </div>

    <span class="md-layout-item md-size-100">받으실 주문번호</span>

    <div class="md-layout-item md-size-100">
      <div class="main-order-circle">
        <span class="main-order-circle-text">17</span>
      </div>
    </div>

    <span class="md-layout-item md-size-100">지금 주문하시면 약 30분이 걸립니다.</span>

    <span class="md-layout-item md-size-100">주문하시겠습니까?</span>

    <md-button class="md-layout-item md-size-33 md-raised md-accent" to="/menu">주문하기</md-button>
  </div>



</template>

<script>
export default {
  name: 'main-page'
}
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
    border: 1px solid;
    margin-top: 20px;
    margin-bottom: 20px;

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
