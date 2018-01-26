// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Tabs from 'iview/src/components/tabs/tabs';
import TabPane from 'iview/src/components/tabs/pane';
import Table from 'iview/src/components/table/table';
import Collapse from 'iview/src/components/collapse/collapse';
import Panel from 'iview/src/components/collapse/panel';
import Button from 'iview/src/components/button/button';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.component('iTabs', Tabs);
Vue.component('iTabPane', TabPane);
Vue.component('iTable', Table);
Vue.component('iCollapse', Collapse);
Vue.component('iPanel', Panel);
Vue.component('iButton', Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
