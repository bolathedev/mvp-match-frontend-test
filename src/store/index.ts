import Vue from 'vue'
import Vuex from 'vuex'
const { axiosInstance } = require("../services/axios-http-service.js");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
    gateWays: [],
    users: []
  },
  mutations: {
    SET_PROJECTS(state, payload) {
      state.projects = payload
    },
    SET_GATEWAYS(state, payload) {
      state.gateWays = payload
    }
  },
  actions: {
    fetchProjects({ commit, dispatch }) {
      return axiosInstance.get("/projects").then((response: any) => {
        const { data } = response.data
        commit("SET_PROJECTS", data);
        dispatch("fetchGateWays")
        return data
      })
    },
    fetchGateWays({ commit }) {
      return axiosInstance.get("/gateways").then((response: any) => {
        const { data } = response.data
        commit("SET_GATEWAYS", data);
        return data
      })
    },
    fetchReports({ commit }, payload) {
      return axiosInstance.post("/report", payload).then((response: any) => {
        const { data } = response.data
        return data
      })
    },
  },
  modules: {
  },
  getters: {
    getProjects: (state) => {
      return state.projects
    },
    getGateways: (state) => {
      return state.gateWays
    }
  }
})
