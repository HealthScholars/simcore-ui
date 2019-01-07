/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import TimeMeterLines from '../../../components/TimeMeterLines'

xdescribe('TimeMeterLines', () => {
  beforeEach(() => {
    this.component = shallowMount(TimeMeterLines, {
      propsData: {
        maximumDuration: 6,
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  it('shows 13 segment markers', () => {
    assert.equal(this.component.findAll('.sim-timelines > li').length, 13)
  })
  describe('#segmentSize', () => {
    it('returns a length of approximately 16 for the segment size', () => {
      assert.equal(Math.floor(this.component.vm.segmentSize), 16)
    })
  })
  describe('#segments', () => {
    it('returns an array of 12 half-hour segments', () => {
      assert.deepEqual(
        this.component.vm.segments,
        [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      )
    })
  })
  describe('#getHourClasses', () => {
    it('returns an hour class', () => {
      assert.equal(
        this.component.vm.getHourClasses(1), 'is-hour is-hour-1',
      )
    })
    it('returns a half-hour class', () => {
      assert.equal(
        this.component.vm.getHourClasses(1.5), 'is-half-hour is-hour-1-half',
      )
    })
  })
})
