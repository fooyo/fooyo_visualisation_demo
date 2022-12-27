import Vue from "vue";
import "./styles/main.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {
  formatThousand,
  formatOneDecimal,
  formatTimeUnit,
} from "./utils/common";

Vue.config.productionTip = false;

Vue.filter("fdistance", (value) => {
  return formatThousand(value) + "km";
});

Vue.filter("fcount", (value) => {
  if (value < 1000) {
    return value;
  }
  return formatThousand(value) + "k";
});

Vue.filter("ftime", (value) => {
  return formatTimeUnit(value);
});

Vue.filter("fcommasNumber", (value) => {
  return value.toLocaleString("en", { useGrouping: true });
});

Vue.filter("fweight", (value) => {
  return formatOneDecimal(value) + "kg";
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
