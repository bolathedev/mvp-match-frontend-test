import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import baseSelect from './components/custom/baseSelect.vue';
import baseButton from './components/custom/baseButton.vue';
import baseCalendarWidget from './components/custom/baseCalendarWidget.vue';
import baseAvatar from "./components/custom/baseAvatar.vue";
import baseTable from "./components/custom/baseTable.vue";
import baseChart from "./components/custom/baseChart.vue";

import 'ant-design-vue/dist/antd.css';

Vue.component("c-select", baseSelect);
Vue.component("c-button", baseButton);
Vue.component("c-calendar", baseCalendarWidget);
Vue.component("c-avatar", baseAvatar);
Vue.component("c-table", baseTable);
Vue.component("c-chart", baseChart);

Vue.config.productionTip = false

Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
