/* global describe, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import TimePicker from '../../../components/TimePicker'

xdescribe('TimePicker', () => {
  it('Renders basic text', () => {
    const component = mount(TimePicker)
    assert.ok(component)
    assert.ok(true)
  })
  it('#timelineClasses')
  it('#setMoving')
  it('#createTimeBlock')
  it('#removeTimeBlock')
  it('#removeAllTimeBlocks')
  it('#updateTimeBlock')
})
