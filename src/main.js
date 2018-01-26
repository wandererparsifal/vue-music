// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Tabs from 'iview/src/components/tabs/tabs';
import TabPane from 'iview/src/components/tabs/pane';
import Table from 'iview/src/components/table/table';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.component('iTabs', Tabs);
Vue.component('iTabPane', TabPane);
Vue.component('iTable', Table);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
