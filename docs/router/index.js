import Vue from 'vue'
import Router from 'vue-router'

// Nav
import Hello from '../Hello'
import GettingStarted from '../GettingStarted'
import ComponentLibrary from '../ComponentLibrary'
import StyleLibrary from '../StyleLibrary'
import Extras from '../Extras'

// Docs: Components
import DocAutocomplete from '../pages/components/Autocomplete'
import DocSingleSelector from '../pages/components/SingleSelector'
import DocBadges from '../pages/components/Badge'
import DocBulkCheck from '../pages/components/BulkCheck'
import DocCalendar from '../pages/components/Calendar'
import DocDatalist from '../pages/components/Datalist'
import DocDatepicker from '../pages/components/Datepicker'
import DocFilterBy from '../pages/components/FilterBy'
import DocForm from '../pages/components/Form'
import DocIconText from '../pages/components/IconText'
import DocLoader from '../pages/components/Loader'
import DocModal from '../pages/components/Modal'
import DocOverlay from '../pages/components/Overlay'
import DocPanel from '../pages/components/Panel'
import DocProgress from '../pages/components/Progress'
import DocSelection from '../pages/components/Selection'
import DocSummaryBlock from '../pages/components/SummaryBlock'
import DocSwitch from '../pages/components/Switch'
import DocTag from '../pages/components/Tag'
import DocTimePicker from '../pages/components/TimePicker'
import DocTooltip from '../pages/components/Tooltip'

// Docs: Styles
import GuideIntro from '../pages/styles/GuideIntro'
import GuideLogo from '../pages/styles/Logo'
import GuideColor from '../pages/styles/Color'
import GuideGrid from '../pages/styles/Grid'
import GuideTypography from '../pages/styles/Typography'
import GuideButtons from '../pages/styles/Buttons'

// Docs: Extras
import ExtrasIntro from '../pages/extras/ExtrasIntro'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      label: 'Home',
      icon: 'fa-home fa-fw',
      component: Hello,
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      label: 'Getting Started',
      icon: 'fa-star fa-fw',
      component: GettingStarted,
    },
    {
      path: '/components',
      label: 'Component Library',
      icon: 'fa-cubes fa-fw',
      component: ComponentLibrary,
      children: [
        {
          path: '',
          redirect: 'icon-text',
        },
        {
          path: 'autocomplete',
          name: 'autocomplete',
          label: 'Autocomplete',
          components: {
            details: DocAutocomplete,
          },
        },
        {
          path: 'badge',
          name: 'badge',
          label: 'Badge',
          components: {
            details: DocBadges,
          },
        },
        {
          path: 'bulkcheck',
          name: 'bulkcheck',
          label: 'Bulk Check',
          components: {
            details: DocBulkCheck,
          },
        },
        {
          path: 'calendar',
          name: 'calendar',
          label: 'Calendar',
          components: {
            details: DocCalendar,
          },
        },
        {
          path: 'datalist',
          name: 'datalist',
          label: 'Datalist',
          components: {
            details: DocDatalist,
          },
        },
        {
          path: 'datepicker',
          name: 'datepicker',
          label: 'Datepicker',
          components: {
            details: DocDatepicker,
          },
        },
        {
          path: 'filter-by',
          name: 'filter-by',
          label: 'FilterBy',
          components: {
            details: DocFilterBy,
          },
        },
        {
          path: 'form',
          name: 'form',
          label: 'Form',
          components: {
            details: DocForm,
          },
        },
        {
          path: 'icon-text',
          name: 'icon-text',
          label: 'Icon + Text',
          components: {
            details: DocIconText,
          },
        },
        {
          path: 'loader',
          name: 'loader',
          label: 'Loader',
          components: {
            details: DocLoader,
          },
        },
        {
          path: 'modal',
          name: 'modal',
          label: 'Modal',
          components: {
            details: DocModal,
          },
        },
        {
          path: 'overlay',
          name: 'overlay',
          label: 'Overlay',
          components: {
            details: DocOverlay,
          },
        },
        {
          path: 'panel',
          name: 'panel',
          label: 'Panel',
          components: {
            details: DocPanel,
          },
        },
        {
          path: 'progress',
          name: 'progress',
          label: 'Progress',
          components: {
            details: DocProgress,
          },
        },
        {
          path: 'selection',
          name: 'selection',
          label: 'Selection',
          components: {
            details: DocSelection,
          },
        },
        {
          path: 'single-selector',
          name: 'single-selector',
          label: 'SingleSelector',
          components: {
            details: DocSingleSelector,
          },
        },
        {
          path: 'SummaryBlock',
          name: 'SummaryBlock',
          label: 'SummaryBlock',
          components: {
            details: DocSummaryBlock,
          },
        },
        {
          path: 'switch',
          name: 'switch',
          label: 'Toggle Switch',
          components: {
            details: DocSwitch,
          },
        },
        {
          path: 'tag',
          name: 'tag',
          label: 'Tag',
          components: {
            details: DocTag,
          },
        },
        {
          path: 'time-picker',
          name: 'timepicker',
          label: 'Time Picker',
          components: {
            details: DocTimePicker,
          },
        },
        {
          path: 'tooltip',
          name: 'tooltip',
          label: 'Tooltip',
          components: {
            details: DocTooltip,
          },
        },
      ],
    },
    {
      path: '/styles',
      label: 'Guidelines',
      icon: 'fa-paint-brush fa-fw',
      component: StyleLibrary,
      children: [
        {
          path: '',
          redirect: 'guide-intro',
        },
        {
          path: 'guide-intro',
          name: 'guide-intro',
          label: 'Intro',
          components: {
            details: GuideIntro,
          },
        },
        {
          path: 'logo',
          name: 'logo',
          label: 'Brand Logo',
          components: {
            details: GuideLogo,
          },
        },
        {
          path: 'color',
          name: 'color',
          label: 'Color',
          components: {
            details: GuideColor,
          },
        },
        {
          path: 'grid',
          name: 'grid',
          label: 'Grid',
          components: {
            details: GuideGrid,
          },
        },
        {
          path: 'typography',
          name: 'typography',
          label: 'Typography',
          components: {
            details: GuideTypography,
          },
        },
        {
          path: 'buttons',
          name: 'buttons',
          label: 'Buttons',
          components: {
            details: GuideButtons,
          },
        },
      ],
    },
    {
      path: '/extras',
      label: 'Other Things',
      icon: 'fa-code fa-fw',
      component: Extras,
      children: [
        {
          path: '',
          redirect: 'extras-intro',
        },
        {
          path: 'extras-intro',
          name: 'extras-intro',
          label: 'Intro',
          components: {
            details: ExtrasIntro,
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
})
