import { createStore } from "vuex"
import coreApi from "@/providers/core-api"

export default createStore({
  state: {
    entities: [],
    isLoading: false,
    isError: false
  },
  mutations: {
    clearEntities(state) {
      state.entities = []
    }
  },
  actions: {
    fetchEntities({ commit, state }) {
      const currentEntities = [...state.entities]

      commit("clearEntities")

      state.isLoading = true

      // @TODO_CURRENT_PR: We could improve with async await.
      coreApi.glados.getEntities()
        .then((entities) => {
          state.entities = entities
        })
        .catch((error) => {
          console.error(error)
          state.entities = currentEntities
          state.isError = true
        })
        .finally(() => {
          state.isLoading = false
        })
    }
  },
  getters: {
    getEntities(state) {
      return state.entities
    },
    getIsLoading(state) {
      return state.isLoading
    },
    getIsError(state) {
      return state.isError
    }
  },
  modules: {},
})
