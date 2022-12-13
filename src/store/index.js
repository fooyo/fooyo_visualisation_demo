import Vuex, { createLogger } from "vuex";
import Vue from "vue";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

const state = {
  startDay: null,
  endDay: null,
  country: null,
  team: null,
  totalUsers: 0,
  totalCountries: 0,
  stridesUsers: 0,
  stridesCountries: 0,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
});
