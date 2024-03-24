import { axiosClient } from "@/api/axios";

export const Todo = {
  state: {
    data: null,
  },

  getters: {
    getData(state) {
      return state.data;
    },
  },

  mutations: {
    setData(state, data) {
      state.data = data;
    },
    storeData(state, data) {
      state.data.unshift(data);
    },
    updateData(state, data) {
      const index = state.data.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        state.data.splice(index, 1, data);
      }
    },
    destroyData(state, data) {
      state = state.filter((item) => item.id !== data.id);
    },
  },

  actions: {
    async getData({ commit }, url) {
      const res = await axiosClient.get(`/api/${url}`);
      commit("setData", res.data.data);
    },
    async storeData({ commit }, data) {
      const res = await axiosClient.post(`/api/${data.url}`, data.formData);
      commit("storeData", res.data.data);
    },
    async updateData({ commit }, data) {
      const res = await axiosClient.put(
        `/api/${data.url}/${data.formData.id}`,
        data.formData
      );
      commit("updateData", res.data.data);
    },
    async destroyData({ commit }, data) {
      const res = await axiosClient.put(`/api/${data.url}/${data.id}`);
      commit("destroyData", res.data.data);
    },
  },
};
