import Vue from 'vue'
import Vuex from 'vuex'
import { mainAxios } from '@/apis/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
    dataList: {},
    detailAnimal: {},
    provinceData: {},
    regenciesData: {},
    transactionToken: ''
  },
  mutations: {
    INSERT_USER_NAME(state, name) {
      state.userData = name;
    },
    INSERT_DATA(state, data) {
      state.dataList = data;
    },
    INSERT_DETAIL_ANIMAL(state, data) {
      state.detailAnimal = data;
    },
    INSERT_PROVINCE(state, data) {
      state.provinceData = data;
    },
    INSERT_REGENCIES(state, data) {
      state.regenciesData = data;
    },
    INSERT_TRANSACTION_TOKEN(state, data) {
      state.transactionToken = data;
    }
  },
  actions: {
    login(_, payload) {
      mainAxios({
        method: 'POST',
        url: 'login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register({ dispatch }, payload) {
      mainAxios({
        method: 'POST',
        url: 'register',
        data: payload
      })
        .then((_) => {
          dispatch('login', payload)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchData({ commit }) {
      mainAxios({
        method: 'GET',
        url: 'fetchData',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('INSERT_USER_NAME', data);
          commit('INSERT_DATA', data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(_) {
      localStorage.clear();
      router.push('/');
    },
    fetchAnimalByName({ commit }, name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      mainAxios({
        method: 'GET',
        url: 'findAnimal/' + name,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('INSERT_DETAIL_ANIMAL', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    payment({ commit }, payload) {
      mainAxios({
        method: 'POST',
        url: 'order',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('INSERT_TRANSACTION_TOKEN', data.transactionToken);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchProvince({ commit }) {
      mainAxios({
        method: 'GET',
        url: 'fetchProvinces'
      })
        .then(({ data }) => {
          commit('INSERT_PROVINCE', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchRegencies({ commit }, provinceId) {
      mainAxios({
        method: 'GET',
        url: `fetchRegiences/${provinceId}`
      })
        .then(({ data }) => {
          commit('INSERT_REGENCIES', data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {
  }
})
