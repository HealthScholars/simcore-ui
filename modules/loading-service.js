export default {
  namespaced: true,
  state: {
    loadingCount: 0,
  },
  getters: {
    isLoading(state){
      return state.loadingCount > 0
    }
  },
  mutations: {
    pushLoading(state){
      state.loadingCount += 1
    },
    popLoading(state){
      state.loadingCount -= 1
    },
  },
  actions: {
    pushLoading({commit}){
      commit('pushLoading')
    },
    popLoading({commit}){
      commit('popLoading')
    },
  }
}
