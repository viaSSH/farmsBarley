<template>
  <div id="app">
    <main-header/>
    <!-- <div id="header">
    </div> -->

    <!-- <h1>{{ msg }}</h1> -->

    <router-view></router-view>

    <main-footer/>

  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'


export default {
  name: 'app',
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
    // 'main-page': MainPage
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
/* @font-face{font-family:'dohyeon'; src:url('./assets/fonts/BMDOHYEON_ttf.ttf')} */
/* @font-face{font-family:'jua'; src:url('./assets/fonts/BMJUA_ttf.ttf')} */
@font-face{font-family:'nanum'; src:url('./assets/fonts/NanumBarunGothic.ttf')}

body, table, div, p {font-family:'nanum';}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btn {
  border-width: 2px !important;
}
</style>
