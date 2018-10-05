import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import mockHttpResponses from '../utilities/mock-http-responses'
if (process.env.NODE_ENV === 'development') {
  mockHttpResponses(axios)
}

import camelize from 'camelize'

import { getBoundariesOfMonth } from '../utilities/date'
import buildUrl from '../utilities/build-url'

import services from './services'

const store = new Vuex.Store({
  state: {
    currentUser: {
      id: 912,
      availabilities: {},
    },
    purviewAvailabilities: {},
    instructors: [],
    equipment: [],
    rooms: [],
    scenarios: [],
    learners: [],
    events: [],
    departments: [],
  },
  getters: {
    list: (state) => ({list, value}) => {
      return state[list].map(item => {
        item.label = item[value]
        return item
      })
    },
    instructors(state) {
      return state.instructors.map(instructor => {
        instructor.label = `${instructor.lastname}, ${instructor.firstname}`
        return instructor
      })
    },
  },
  mutations: {
    updateCurrentUserAvailabilitiesByDate(state, {date, availabilities}) {
      Vue.set(state.currentUser.availabilities, date, availabilities)
    },
    updateCurrentUserAvailabilities(state, availabilities) {
      state.currentUser.availabilities = availabilities
    },
    updateInstructorAvailabilities(state, availabilities) {
      state.purviewAvailabilities = availabilities
    },
    updateList(state, { key, list }) {
      state[key] = list
    },
  },
  actions: {
    async fetchList({ dispatch, state, commit }, key) {
      const url = buildUrl(key)(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const list = await axios.get(url)
        .then(response => response.data)
        .then(normalizeResponse(key))
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateList', { key, list })
    },
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
      const url = buildUrl('userAvailabilities')(state.currentUser.id, {startDate, endDate})
      dispatch('services/loading/pushLoading')
      const availabilities = await axios.get(url)
        .then(response => response.data.users)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateInstructorAvailabilities', availabilities)
    },
    async fetchInstructorList({dispatch, state, commit}) {
      const url = buildUrl('availabilities')(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const instructors = await axios.get(url)
        .then(response => response.data.users.list)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      return commit('updateInstructors', instructors)
    },
    async fetchLearnerList() {
    },
    async submitEvent({dispatch, state, commit}, event) {
      console.log("submitted:", JSON.parse(JSON.stringify(event)))
      const url = buildUrl('addEvent')(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const postedEvent = await axios.post(url, event)
        .then(response => response.data)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
    },
  },
  modules: {
    services,
  },
})

function normalizeResponse(key){
  const transformations = {
    users: response => {
      return response.users.list
    },
    departments: response => {
      return Object.values(response)
    },
    events: response => {
      return camelize(response)
    },
  }
  return response => {
    return transformations[key]
      ? transformations[key](response)
      : response
  }
}

export default store
