<template lang="html">
  <div class="app-layout">
    <a href="#main-content" class="skip-link">skip to main content</a>
    <SimOverlay
      class="animator parallax in-from-top"
      :should-show-dismiss="true"
      :dismiss-to="overlayDismissTo"
      :should-be-open="shouldOverlayBeOpen"
      >
      <button @click="$root.togglePanel">panelize</button>
      </SimOverlay>
    <SimPanel
      class="animator parallax in-from-right"
      :should-be-open="shouldPanelBeOpen"
      :should-show-dismiss="true"
      :dismiss-to="panelDismissTo"
      ></SimPanel>
    <header class="app-header animatable" role="banner">
      <div class="app-logo--wrap">
        <div class="app-logo">
          <router-link to="/" class="logo"><span>SIM <b>UI</b></span></router-link>
          <span class="greeting">The SimCore Interface Library</span>
        </div>
        <button
          @click="toggleAppNavVisibility"
          class="toggle-button toggle-button--main-menu"
          toggle-button="main-menu"
          >
            <span>Menu</span>
        </button>
      </div>
      <div
        v-show="appNavIsOpen"
        class="app-nav"
        :class="{'is-visible': appNavIsOpen}"
        app-menu="main-menu"
        >
        <nav>
          <ul>
            <li>
              <router-link to="/getting-started">
                <SimIconText
                  icon="fa-home"
                  text="Getting Started"
                  ></SimIconText>
              </router-link>
            </li>
            <li>
              <router-link to="/components">
                <SimIconText
                  icon="fa-cubes" text="Components"
                  ></SimIconText>
              </router-link>
            </li>
            <li>
              <router-link to="/styles">
                <SimIconText
                  icon="fa-paint-brush" text="Styles"
                  ></SimIconText>
              </router-link>
            </li>
            <li>
              <router-link to="/extras">
                <SimIconText
                  icon="fa-code"
                  text="Other Things"
                  ></SimIconText>
              </router-link>
            </li>
            <li>
              <button
                toggle-button="sidebar"
                class="toggle-button toggle-button--sidebar"
                :class="{'target-is-visible': appSidebarIsOpen}"
                @click="toggleAppSidebarVisibility"
                >
                <SimIconText
                  text="Sidebar"
                  icon="fa-bars"
                  ></SimIconText>
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </header>
    <div class="app-content animatable">
      <aside
        v-show="appSidebarIsOpen"
        class="app-sidebar"
        :class="{'is-visible': appSidebarIsOpen}"
        role="complementary"
        >
        <Directory
          :model="menu"
          ></Directory>
      </aside>
      <router-view />
    </div>
  </div>
</template>

<script>
  import SimOverlay from '../components/Overlay'
  import SimPanel from '../components/Panel'
  import SimIconText from '../components/IconText'
  import Directory from './utility/Directory'
  import common from './mixins'

  export default {
    name: 'Layout',
    mixins: [common],
    components: {
      SimOverlay,
      SimPanel,
      SimIconText,
      Directory,
    },
    data() {
      return {
        menu: [],
        shouldAppNavBeOpen: false,
        shouldAppSidebarBeOpen: false,
        shouldPanelBeOpen: false,
        shouldOverlayBeOpen: false,
        overlayDismissTo: '',
        panelDismissTo: '',
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes
      },
      appSidebarIsOpen() {
        return this.shouldAppSidebarBeOpen
      },
      appNavIsOpen() {
        return this.shouldAppNavBeOpen
      },
    },
    mounted() {
      this.menu = {
        children: this.routes,
      }
      const caller = (callback) => {
        if (callback && typeof callback === 'function') {
          callback.call()
        }
      }
      this.$root.$on('toggle-overlay', (dismissTo) => {
        this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen
        this.overlayDismissTo = dismissTo
      })
      this.$root.$on('open-overlay', (dismissTo) => {
        this.shouldOverlayBeOpen = true
        this.overlayDismissTo = dismissTo
      })
      this.$root.$on('close-overlay', (dismissTo) => {
        this.shouldOverlayBeOpen = false
        this.overlayDismissTo = dismissTo
      })
      this.$root.$on('toggle-panel', (dismissTo) => {
        this.shouldPanelBeOpen = !this.shouldPanelBeOpen
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('open-panel', (dismissTo) => {
        this.shouldPanelBeOpen = true
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('close-panel', (dismissTo) => {
        this.shouldPanelBeOpen = false
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('toggle-modal', (callback) => {
        this.shouldModalBeOpen = !this.shouldModalBeOpen
        caller(callback)
      })
      this.$root.$on('open-modal', (callback) => {
        this.shouldModalBeOpen = true
        caller(callback)
      })
      this.$root.$on('close-modal', (callback) => {
        this.shouldModalBeOpen = false
        caller(callback)
      })
    },
    methods: {
      setMenuButtonClasses() {
        const classes = []
        if (this.appSidebarIsOpen) {
          classes.push('target-is-visible')
        }
        // if(this.someOtherThingIsTrue) {
        //   classes.push('my-other-special-state')
        // }
        return classes.join(' ')
      },
      randomInt: (min, max) => common.getRandomInt(min, max),
      toggleAppSidebarVisibility() {
        this.shouldAppSidebarBeOpen = !this.shouldAppSidebarBeOpen
      },
      toggleAppNavVisibility() {
        this.shouldAppNavBeOpen = !this.shouldAppNavBeOpen
      },
    },
  }
</script>

<style lang="scss">
.sim-panel.active {
  --element-width: var(--panel-width);
  ~ .animatable {
    --parallax-amount: 0;
  }
}
.sim-overlay.active {
  ~ .animatable {
    --parallax-amount: 15vh;
  }
}
</style>
