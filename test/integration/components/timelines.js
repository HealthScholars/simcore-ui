/* global describe, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import TimeLines from '../../../components/TimeLines'

describe('TimeLines', () => {
  it('Renders basic text', () => {
    const component = mount(TimeLines)
    assert.ok(component)
  })
  it('#segments')
  it('#displayHour')
  it('#getHourClasses')
  it('#createTimeBlock')
})
