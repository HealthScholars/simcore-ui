/* global describe, before, it */
/* eslint */
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import Calendar from '../../../components/Calendar'

dayjs.extend(advancedFormat)

xdescribe('Calendar', () => {
  before(() => {
    this.monthDays = {
      '1970-01-01': {
        someValue: 'Some Value',
      },
    }
  })
  describe('#componentClasses', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: dayjs('1970-01-01'),
          monthDays: this.monthDays,
          date: dayjs('1970-02-01'),
          dateFormat: 'YYYY-MM-DD',
        },
      })
    })
    it('returns a simple class string', () => {
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context')
    })
    it('returns a class string with the current month when its the current month', () => {
      this.component.setProps({
        date: dayjs('1970-01-01'),
        showExpandedWeek: false,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-current-month')
    })
    it('returns a class string with an expansion when showExpandedWeek is true', () => {
      this.component.setProps({
        date: dayjs('1970-02-01'),
        showExpandedWeek: true,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-expanded')
    })
    it('returns a class string with an expansion when bubbleIsOpen is true', () => {
      this.component.setProps({
        date: dayjs('1970-02-01'),
        showExpandedWeek: false,
        bubbleIsOpen: true,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-expanded')
    })
    it('returns a class string with an expansion and the current when both match', () => {
      this.component.setProps({
        date: dayjs('1970-01-01'),
        showExpandedWeek: true,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-current-month is-expanded')
    })
  })
  describe('#filterContainerClasses', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: dayjs('1970-01-01'),
          monthDays: this.monthDays,
          dateFormat: 'YYYY-MM-DD',
          date: dayjs('1970-01-01'),
        },
      })
    })
    xit('returns an empty string if no filters are active', () => {
      assert.equal(this.component.vm.filterContainerClasses, '')
    })
  })
  describe('#isCurrentMonth', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: dayjs('1970-01-01'),
          monthDays: this.monthDays,
          dateFormat: 'YYYY-MM-DD',
          date: dayjs('1970-01-01'),
        },
      })
    })
    it('returns true when it is the current month', () => {
      this.component.setProps({
        date: dayjs('1970-01-01'),
      })
      assert.ok(this.component.vm.isCurrentMonth)
    })
    it('returns false when it isn\'t the current month', () => {
      this.component.setProps({
        date: dayjs('1970-02-01'),
      })
      assert.ok(!this.component.vm.isCurrentMonth)
    })
  })
  xdescribe('#isInstructorContext', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: dayjs('1970-01-01'),
          monthDays: this.monthDays,
          dateFormat: 'YYYY-MM-DD',
          date: dayjs('1970-01-01'),
        },
      })
    })
    it('returns true when it\'s an instructor context', () => {
      assert.ok(this.component.vm.isInstructorContext)
    })
    it('returns false when it\'s not an instructor context', () => {
      assert.ok(!this.component.vm.isInstructorContext)
    })
  })
})
