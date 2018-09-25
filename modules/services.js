import DateService from './date-service'
import LoadingService from './loading-service'
import BubbleService from './bubble-service'

export default {
  namespaced: true,
  modules: {
    date: DateService,
    loading: LoadingService,
    bubble: BubbleService,
  },
}
