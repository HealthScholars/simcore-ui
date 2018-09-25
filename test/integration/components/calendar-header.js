/* global describe, beforeEach, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import dayjs from 'dayjs'
import CalendarHeader from '../../../components/CalendarHeader'

xdescribe('CalendarHeader', () => {
  beforeEach(() => {
    this.component = mount(CalendarHeader, {
      propsData: {
        selectedDate: dayjs('2018-07-13'),
        canScheduleEvents: true,
      },
    })
  })
  it('displays the date', () => {
    assert.equal(this.component.find('.current-month').text(), 'July 2018')
  })
  it('goes to the previous month', () => {
    this.component.find('.load-previous-month').trigger('click')
    assert.ok(this.component.emitted().loadPreviousMonth[0])
  })
  it('goes to the next month', () => {
    this.component.find('.load-next-month').trigger('click')
    assert.ok(this.component.emitted().loadNextMonth[0])
  })
  it('goes to the previous day', () => {
    this.component.find('.load-previous-day').trigger('click')
    assert.ok(this.component.emitted().loadPreviousDay[0])
  })
  it('goes to the current day', () => {
    this.component.find('.load-today').trigger('click')
    assert.ok(this.component.emitted().loadToday[0])
  })
  it('goes to the next day', () => {
    this.component.find('.load-next-day').trigger('click')
    assert.ok(this.component.emitted().loadNextDay[0])
  })
  it('toggles between availability and scheduling events', () => {
    this.component.find('.sim-switch input').trigger('click')
    assert.ok(this.component.emitted().toggleContext[0])
  })
  it('hides the toggle if the user can\'t schedule events', () => {
    const component = mount(CalendarHeader, {
      propsData: {
        selectedDate: dayjs('2018-07-13'),
        canScheduleEvents: false,
      },
    })
    assert.ok(!component.find('.sim-calendar--header--mode').exists())
  })
})
