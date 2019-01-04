/* global describe, before, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import TimeBlock from '../../../components/TimeBlock'

xdescribe('TimeBlock', () => {
  xdescribe('#render', () => {
    before(() => {
      this.component = mount(TimeBlock, {
        propsData: {
        },
      })
    })
    it('Renders basic text', () => {
      assert.ok(true)
    })
  })
  xdescribe('Computed Properties', () => {
    it('#segmentSize')
    it('#timeShiftOffset')
    it('#displayBlockTime')
    it('#displayBlockHours')
    it('#blockClasses')
    it('#blockStyles')
  })
  xdescribe('Methods', () => {
    it('#setStretchingStart')
    it('#setDurationFromStart')
    it('#setDurationFromEnd')
    it('#startMove')
    it('#move')
    it('#doneMoving')
    it('#startStretchDown')
    it('#stretchDown')
    it('#doneStretchingDown')
    it('#startStretchUp')
    it('#stretchUp')
    it('#doneStretchingUp')
  })
})
