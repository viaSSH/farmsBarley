<template lang="html">
  <div class="md-layout  md-alignment-center-center main-order-view">
    <div v-if="false" class="md-layout-item md-size-70 main-order-box">
        <!-- <span>현재까지 완료된 주문번호</span>
        <span style="font-size:20px; padding:0px;">14</span> -->
        <span>{{leftOrder}} 팀 대기중</span>
    </div>

    <!-- <span class="md-layout-item md-size-100">받으실 주문번호</span>

    <div class="md-layout-item md-size-100" style="margin: 10px 0px;">
      <div class="main-order-circle">
        <span class="main-order-circle-text">-</span>
      </div>
    </div> -->

    <div class="md-layout-item md-size-100" style="color: #374c3c; padding-top:60px;">
      <span class="md-layout-item md-size-100">현재 주문시 예상 대기 시간 </span>
      <p class="md-layout-item md-size-100" style="font-size:40px; font-weight:900;">약 {{calPredctionTime(predictionTime+defaultMakeTime)}}분</p>

      <p class="md-layout-item md-size-100">주문하시겠습니까?</p>
    </div>


    <md-button class="md-layout-item md-size-33 md-raised md-accent" to="/menu">주문하기</md-button>

    <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

        <div class="mt-3">
          Submitted Names:
          <div v-if="submittedNames.length === 0">--</div>
          <ul v-else class="mb-0 pl-3">
            <li v-for="name in submittedNames">{{ name }}</li>
          </ul>
        </div> -->

        <b-modal
          id="modal-prevent-closing"
          v-model="idModalactive"
          ref="modal"
          title="학번을 입력해주세요"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          ok-title="확인"

          no-close-on-backdrop
          no-close-on-esc
          hide-header-close
          ok-only
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="nameState"
              label=""
              label-for="id-input"
              invalid-feedback="id is required"
            >
              <b-form-input
                id="id-input"
                v-model="inputId"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>


  </div>



</template>

<script>
import axios from 'axios'
import moment from 'vue-moment'
import VueCookies from 'vue-cookies'
VueCookies.config('7d')

export default {
  name: 'main-page',
  data() {
    return {
      predictionTime: 0,
      defaultMakeTime: 10,
      leftOrder: 0,
      idModalactive: false,
      stdId: null,
      inputId: '',
        nameState: null,
        submittedNames: []
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
    },
    checkId: function() {
      var id = this.$route.query.id;

      if(id != null) {
        VueCookies.set('id', id);
      }
      else {
        id = VueCookies.get('id');
      }

      console.log(id);
      if(id == null) {
        console.log("id err");
        this.idModalactive = true;
      }

      //
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.inputId = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit();
      },
      handleSubmit() {
        console.log(this.inputId);
        if(this.inputId == "") {
          console.log("nothignt");
          return;
        }
        else {
          VueCookies.set('id', this.inputId);
            // this.$refs.modal.hide();
        }

        this.$nextTick(() => {
          this.$refs.modal.hide()
        })


        // Exit when the form isn't valid
        // if (!this.checkFormValidity()) {
        //   return
        // }
        // // Push the name to submitted names
        // this.submittedNames.push(this.name)
        // // Hide the modal manually
        // this.$nextTick(() => {
        //   this.$refs.modal.hide()
        // })
      }

  },
  created: function() {
    this.getTime();
    // VueCookies.set('menu', JSON.stringify(temp));
    this.checkId();
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
