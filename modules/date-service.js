import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    today: dayjs('2018-07-13'),
    selectedDate: dayjs('2018-07-13'),
  },
  mutations: {
    setDate(state, date){
      state.selectedDate = dayjs(date)
    },
  },
  actions: {
    setDate(context, date){
      context.commit('setDate', date)
    },
  }
}
