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
          <md-button class="md-raised md-primary">
            <md-icon>delete</md-icon>
            삭제
            </md-button>
        </div>
      </div>

      <div class="md-layout md-alignment-center-center fb-cart-list-container">
        <div class="md-layout-item md-size-100 fb-cart-list-box">
          <md-card>
            <md-card-header>
              <div class="md-subtitle">2019/10/21 02:30:12</div>
            </md-card-header>

            <md-card-content>
              <md-table v-model="people" md-card @md-selected="onSelect">
                <md-table-toolbar>
                  <h1 class="md-title">test</h1>
                </md-table-toolbar>

                <!-- <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                  <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                  <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </div>
                </md-table-toolbar> -->

                <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')" md-selectable="multiple" md-auto-select>
                  <md-table-cell md-label="메뉴" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell  md-label="가격/수량" md-sort-by="gender">{{ item.price }}</md-table-cell>
                  <!-- <md-table-cell md-label="수량" md-sort-by="gender">{{ item.amount }}</md-table-cell> -->
                  <!-- <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell> -->
                </md-table-row>
              </md-table>
            </md-card-content>

            <md-card-actions>
              <!-- <md-button>Action</md-button> -->
              <span> <md-icon>access_time</md-icon> 약 30분 소요 예정</span>
              <md-button class="md-raised md-accent fb-cart-list-action">결제하기</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>


  </div>

</template>

<script>
export default {
  name: 'order-cart',
  data:()=> ({
    isCheckedAll: false,
    selected: [],
      people: [
        {
          name: '슈퍼슈프림',
          price: '13500/1개',
          amount: '1'
        },
        {
          name: '슈퍼슈프림2',
          price: '13500/1개',
          amount: '1'
        },
        {
          name: '슈퍼슈프림3',
          price: '13500/1개',
          amount: '1'
        }
      ]
  }),
  methos: {
    onSelect (items) {
        this.selected = items
      },
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
