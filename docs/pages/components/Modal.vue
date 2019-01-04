<template lang="html">
  <article>
      <h2>{{ msg }}</h2>
      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <button @click="toggleModalVisibility">Modal</button>
            <SimModal
              class="mobile-info"
              :should-be-open="showModal"
              :should-show-dismiss="true"
              :should-show-mask="true"
              :can-click-mask="true"
              >
              <div class="sim-modal__main">
                <header class="sim-modal__header">
                  <h3>Alert</h3>
                </header>
                <article class="sim-modal__body">
                  <section class="current">
                    <p>{{ modalMessage }}</p>
                  </section>
                </article>
              </div>
          </SimModal>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>
            </code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimModal from '../../../components/Modal'

  export default {
    name: 'modal-doc',
    components: {
      Demobox,
      SimModal,
    },
    data() {
      return {
        msg: 'Modal',
        showModal: false,
        modalMessageKey: null,
        modalMessage: 'This is a Modal message.',
      }
    },
    computed: {
      modalMessage () {
        return this.modalMessage = true
      },
    },
    mounted () {
      this.$root.closeModal = () => {
        this.showModal = false
        this.modalMessageKey = null
      }
    },
    methods: {
      toggleModalVisibility(messageType) {
        this.showModal = true
        this.modalMessageKey = messageType
      },
    },
  }
</script>
