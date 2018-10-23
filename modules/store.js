import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import mockHttpResponses from '../utilities/mock-http-responses'

let currentUser = window.currentUser
if (currentUser) {
  currentUser.availabilities = {}
}
if (process.env.NODE_ENV === 'dev') {
  mockHttpResponses(axios)
  currentUser = {
    id: 912,
    availabilities: {},
  }
}

import camelize from 'camelize'

import { getBoundariesOfMonth } from '../utilities/date'
import buildUrl from '../utilities/build-url'

import services from './services'

const store = new Vuex.Store({
  state: {
    currentUser,
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
      console.log(JSON.parse(JSON.stringify(payload)))
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
      const url = buildUrl('addEvent')(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const postedEvent = await axios.post(url, event)
        .then(response => response.data)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      dispatch('fetchList', 'events')
    },
    async updateEvent({dispatch, state, commit}, event) {
      const url = buildUrl('updateEvent')(state.currentUser.id, event.id)
      dispatch('services/loading/pushLoading')
      const updatedEvent = await axios.put(url, event)
        .then(response => response.data)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      dispatch('fetchList', 'events')
    },
    async deleteEvent({dispatch, state, commit}, event) {
      const url = buildUrl('deleteEvent')(state.currentUser.id, event.id)
      dispatch('services/loading/pushLoading')
      const deletedEvent = await axios.delete(url, event)
        .then(response => response.data)
        .catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
      dispatch('fetchList', 'events')
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
