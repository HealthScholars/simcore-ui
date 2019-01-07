/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import TimeMeterBlock from '../../../components/TimeBlockMeter'

xdescribe('TimeMeterBlock', () => {
  beforeEach(() => {
    this.component = shallowMount(TimeMeterBlock, {
      propsData: {
        duration: 1,
        maximumDuration: 6,
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  describe('#displayDuration', () => {
    it('displays an hour', () => {
      assert.equal(this.component.find('.sim-timeblock--info--hours').text(), '1 hour')
    })
    it('displays multiple hours', () => {
      this.component = shallowMount(TimeMeterBlock, {
        propsData: {
          duration: 2,
        },
      })
      assert.equal(this.component.find('.sim-timeblock--info--hours').text(), '2 hours')
    })
  })
  describe('#segmentSize', () => {
    it('displays the correct segment size', () => {
      assert.equal(Math.floor(this.component.vm.segmentSize), 16)
    })
  })
  describe('#blockStyles', () => {
    it('returns the block styles for a one hour duration', () => {
      assert.ok(/^--start: 0;--duration: 1;--segment-size: 16/.test(this.component.vm.blockStyles))
    })
  })
  describe('#setStretchingStart', () => {
  })
  describe('#setDurationFromEnd', () => {
  })
  describe('#stretchDown', () => {
  })
  describe('#doneStretchingDown', () => {
  })
  describe('#boundDuration', () => {
    it('returns the minimum if the number is lower than the minimum', () => {
      assert.equal(this.component.vm.boundDuration(1, 2, null), 2)
    })
    it('returns the maximum if the number is more than it', () => {
      assert.equal(this.component.vm.boundDuration(5, null, 4), 4)
    })
    it('returns the number if its between the minimum and the maximum', () => {
      assert.equal(this.component.vm.boundDuration(5, 1, 10), 5)
    })
  })
  describe('#getMetrics', () => {
  })
})
