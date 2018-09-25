/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import TimeMeter from '../../../components/TimeMeter'

xdescribe('TimeMeter', () => {
  beforeEach(() => {
    this.component = shallowMount(TimeMeter, {
      propsData: {
        duration: 1,
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  it('#setStretching', () => {
    assert.ok(!this.component.vm.isStretching)
    this.component.vm.setStretching(true)
    assert.ok(this.component.vm.isStretching)
    this.component.vm.setStretching(false)
    assert.ok(!this.component.vm.isStretching)
  })
  it('#setDuration', () => {
    this.component.vm.setDuration(2.5)
    assert.equal(this.component.emitted().setDuration[0][0], 2.5)
  })
})
