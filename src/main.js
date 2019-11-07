import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import axios from 'axios'
import moment from 'vue-moment'

import VueMaterial from 'vue-material';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css';
import BootstrapVue from 'bootstrap-vue'



// import { MainPage } from './test/MainPage.vue'
import MainPage from './components/MainPage.vue';
import OrderHistoryPage from './components/OrderHistory.vue'
import OrderCartPage from './components/OrderCart.vue'
import MenuPage from './components/MenuList.vue'


Vue.config.productionTip = false

Vue.use(VueRouter); // router 기능 확장 선언

Vue.use(BootstrapVue)
Vue.use(VueMaterial)
Vue.use(moment)
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}


const MenuTab = { template: '<div></div>' }

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/home',
    component: MainPage
  },
  {
    path: '/orderHistory',
    component: OrderHistoryPage
  },
  {
    path: '/orderCart',
    component: OrderCartPage
  },
  {
    path: '/menu',
    component: MenuPage
  },
  {
      path: '/menuTab/:id', component: MenuPage,
      children: [
        { path: '', component: MenuTab },
        { path: 'pizza', component: MenuTab },
        { path: 'chicken', component: MenuTab },
        { path: 'side', component: MenuTab },

        // ...또 다른 서브 라우트
      ]
    }

 // {
 //   path: '/home',
 //   component: HomePage
 // },

];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
