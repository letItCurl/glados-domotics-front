import { createStore } from "vuex"
import coreApi from "@/providers/core-api"

export default createStore({
  state: {
    entities: [],
    isLoading: false,
    isError: false
  },
  mutations: {
    replaceEntities(state, payload) {
      state.entities = payload
    },
    updateEntity(state, payload) {
      state.entities = [...state.entities.filter((entity) => payload.id != entity.id), payload]
    }
  },
  actions: {
    fetchEntities({ commit, state }) {
      const currentEntities = [...state.entities]

      commit("replaceEntities", [])

      state.isLoading = true

      // @TODO_CURRENT_PR: We could improve with async await.
      coreApi.glados.getEntities()
        .then((entities) => {
          commit("replaceEntities", entities)
        })
        .catch((error) => {
          console.error(error)
          commit("replaceEntities", currentEntities)
          state.isError = true
        })
        .finally(() => {
          state.isLoading = false
        })
    },
    updateEntity({ commit, state }, { id, payload }) {
      const currentEntities = [...state.entities]

      // @TODO_CURRENT_PR: We could improve with async await.
      return coreApi.glados.patchEntity(id, payload)
        .then((entity) => {
          commit("updateEntity", entity)
        })
        .catch((error) => {
          console.error(error)
          commit("replaceEntities", currentEntities)
          state.isError = true
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
