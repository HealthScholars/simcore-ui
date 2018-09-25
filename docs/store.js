import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import mockHttpResponses from '../utilities/mock-http-responses'
if (process.env.NODE_ENV === 'development') {
  mockHttpResponses(axios)
}

import { getBoundariesOfMonth } from '../utilities/date'
import buildUrl from '../utilities/build-url'

import services from '../modules/services'

const store = new Vuex.Store({
  state: {
    currentUser: {
      id: 912,
      availabilities: {},
    },
    purviewAvailabilities: {},
    instructors: [],
    equipment: [],
  },
  getters: {
    instructors(state) {
      return state.instructors.map(instructor => {
        instructor.label = `${instructor.lastname}, ${instructor.firstname}`
        return instructor
      })
    },
    equipment(state) {
      return state.equipment.map(equipment => {
        equipment.label = equipment.name
        return equipment
      })
    }
  },
  mutations: {
    updateCurrentUserAvailabilitiesByDate(state, {date, availabilities}) {
      Vue.set(state.currentUser.availabilities, date, availabilities)
    },
    updateCurrentUserAvailabilities(state, availabilities) {
      state.currentUser.availabilities = availabilities
    },
    updateInstructors(state, instructors) {
      state.instructors = instructors
    },
    updateEquipment(state, equipment) {
      state.equipment = equipment
    },
    updateInstructorAvailabilities(state, availabilities) {
      state.purviewAvailabilities = availabilities
    },
  },
  actions: {
    async updateCurrentUserAvailabilities({dispatch, state, commit}, {date, availabilities}) {
      const url = buildUrl('updateAvailabilities')(state.currentUser.id)
      const payload = {
        dates: {}
      }
      payload.dates[date] = availabilities
      commit('updateCurrentUserAvailabilitiesByDate', {date, availabilities})
      dispatch('services/loading/pushLoading')
      await axios.post(url, payload).catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
    },
    async fetchCurrentUserAvailabilities({dispatch, state, commit}) {
      const {startDate, endDate} = getBoundariesOfMonth(state.services.date.selectedDate)
      const url = buildUrl('availabilities')(state.currentUser.id, {startDate, endDate})
      dispatch('services/loading/pushLoading')
      let availabilities = await axios.get(url)
        .then(response => response.data.dates)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      if (availabilities instanceof Array){
        availabilities = {}
      }
      return commit('updateCurrentUserAvailabilities', availabilities)
    },
    async fetchInstructorAvailabilities({dispatch, state, commit}) {
      const {startDate, endDate} = getBoundariesOfMonth(state.services.date.selectedDate)
      const url = buildUrl('purviewAvailabilities')(state.currentUser.id, {startDate, endDate})
      dispatch('services/loading/pushLoading')
      const availabilities = await axios.get(url)
        .then(response => response.data.users)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateInstructorAvailabilities', availabilities)
    },
    async fetchInstructorList({dispatch, state, commit}) {
      const url = buildUrl('purviewUsers')(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const instructors = await axios.get(url)
        .then(response => response.data.users.list)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateInstructors', instructors)
    },
    async fetchEquipmentList({dispatch, state, commit}) {
      const url = buildUrl('purviewEquipment')(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const equipment = await axios.get(url)
        .then(response => response.data)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateEquipment', equipment)
    },
    async createEvent({commit}, pendingEvent) {
    },
  },
  modules: {
    services,
  },
})

export default store
