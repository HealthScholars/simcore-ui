// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import VueHighlightJS from 'vue-highlightjs'

import router from './router'
import common from './mixins'

import store from '../modules/store'

Vue.config.productionTip = false

// helpers
Vue.use(VueHighlightJS)

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {

  }
})

/* eslint-disable no-new, import/prefer-default-export */
new Vue({
  el: '#app',
  router,
  mixins: [common],
  template: '<App/>',
  components: { App },
  store,
  methods: {
    toggleOverlay(callback) {
      this.$emit('toggle-overlay', callback)
    },
    openOverlay(callback) {
      this.$emit('open-overlay', callback)
    },
    closeOverlay(callback) {
      this.$emit('close-overlay', callback)
    },
    togglePanel(callback) {
      this.$emit('toggle-panel', callback)
    },
    openPanel(callback) {
      this.$emit('open-panel', callback)
    },
    closePanel(callback) {
      this.$emit('close-panel', callback)
    },
    toggleModal(callback) {
      this.$emit('toggle-modal', callback)
    },
    openModal(callback) {
      this.$emit('open-modal', callback)
    },
    closeModal(callback) {
      this.$emit('close-modal', callback)
    },
    closeBubble(callback) {
      this.$emit('close-bubble', callback)
    },
  },
})
