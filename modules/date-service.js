import dayjs from 'dayjs'

let today = dayjs()
let selectedDate = today

if (process.env.NODE_ENV === 'dev') {
  today = dayjs('2018-07-13')
  selectedDate = dayjs('2018-07-13')
}

export default {
  namespaced: true,
  state: {
    today,
    selectedDate,
  },
  mutations: {
    setDate(state, date){
      state.selectedDate = dayjs(date)
    },
  },
  actions: {
    setDate({ dispatch, commit }, date){
      commit('setDate', date)
      dispatch('fetchInstructorAvailabilities', null, { root: true })
    },
  }
}
