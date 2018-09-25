/* global describe, before, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import CalendarDay from '../../../components/CalendarDay'

xdescribe('CalendarDay', () => {
  describe('#render', () => {
    describe('simple', () => {
      before(() => {
        this.component = shallowMount(CalendarDay, {
          propsData: {
          },
        })
      })
      it('Renders basic text', () => {
        assert.equal(this.component.text(), '')
      })
    })
  })
  it('#isBeforeToday')
  it('#dayClasses')
  it('#showTimeblockControls')
  it('#showTimelines')
  it('#expandIcon')
  it('#toggleExpandedWeek')
  it('#createTimeBlock')
  it('#updateAvailabilities')
  it('#removeTimeBlock')
  it('#updateTimeBlock')
})
