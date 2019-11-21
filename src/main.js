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

import Loading from 'vue-loading-overlay'

// import { MainPage } from './test/MainPage.vue'
import MainPage from './components/MainPage.vue';
import OrderHistoryPage from './components/OrderHistory.vue'
import OrderCartPage from './components/OrderCart.vue'
import MenuPage from './components/MenuList.vue'
import DefaultPage from './components/default.vue'


Vue.config.productionTip = false

Vue.use(VueRouter); // router 기능 확장 선언

Vue.use(BootstrapVue)
Vue.use(VueMaterial)
Vue.use(moment)
Vue.use(Loading);
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

var opened = false;

const checkOpen = () => (to, from, next) => {
  if(!opened) {
    console.log("default Page");
      next('/default');
  }
  else{
    next();
  }
  // next('/orderHistory');

};


const MenuTab = { template: '<div></div>' }

const routes = [
  {
    path: '/index.html', redirect: '/home'
  },
  {
    path: '/',
    component: MainPage,
    // beforeEnter: checkOpen()
  },
  {
    path: '/home',
    component: MainPage,
    beforeEnter: checkOpen()
  },
  {
    path: '/default',
    component: DefaultPage
  },
  {
    path: '/orderHistory',
    component: OrderHistoryPage,
    beforeEnter: checkOpen()
  },
  {
    path: '/orderCart',
    component: OrderCartPage,
    beforeEnter: checkOpen()
  },
  {
    path: '/menu',
    component: MenuPage,
    beforeEnter: checkOpen()
  },
  {
      path: '/menuTab/:id', component: MenuPage,
      children: [
        { path: '', component: MenuTab },
        { path: 'pizza', component: MenuTab },
        { path: 'chicken', component: MenuTab },
        { path: 'side', component: MenuTab },


      ]
    }

];



const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  // if(await check()) {
  //   next();
  // }
  next();
});


new Vue({
  el: '#app',
  created() {
    console.log("created");
  },
  router,
  render: h => h(App),
  async mounted() {
    try {
      let response = await axios
      .get('https://ow696its6d.execute-api.ap-northeast-2.amazonaws.com/v1/master')
      .then((res) =>  {
        console.log(res);
        if(res.data.Items[0].open) {
          opened = true;
          // return true;
        }
        else{
          opened = false;
          // return false;
        }
      });
    }catch(err) {
      console.log(err);
    }
  }
})

// new Vue({
//   el: '#app',
//   created() {
//     console.log("created");
//   },
//   router,
//   render: h => h(App)
// }).$mount('#app')
