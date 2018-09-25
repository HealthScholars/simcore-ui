/* global before, describe, it */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import EventScheduler from '../../../components/EventScheduler'
import smallEvent from '../fixtures/small-event'

xdescribe('Event Scheduler', () => {
  before(() => {
    this.component = mount(EventScheduler, {
      propsData: {
        event: smallEvent,
        categories: [{
          id: 1,
          label: 'A',
        }, {
          id: 2,
          label: 'B',
        }, {
          id: 3,
          label: 'C',
        }],
        departments: [{
          id: 1,
          label: 'X',
        }, {
          id: 2,
          label: 'Y',
        }, {
          id: 3,
          label: 'Z',
        }],
      },
    })
  })
  describe('header', () => {
    it('shows the title as New Event', () => {
      const title = this.component.find('header span').text()
      assert.equal(title, 'New Event')
    })
    it('displays the date', () => {
      const date = this.component.find('.event-date').text()
      assert.equal(date, 'Sunday, July 1st, 2018')
    })
    it('displays the time', () => {
      const date = this.component.find('.event-time').text()
      assert.equal(date, '1am – 2:30am')
    })
  })
  describe('Event Information', () => {
    it('displays a saved title', () => {
      const title = this.component.find('#title').element.value
      assert.equal(title, 'A Title')
    })
    it('displays a saved description', () => {
      const description = this.component.find('#description').element.value
      assert.equal(description, 'A Description')
    })
    it('displays a list of categories', () => {
      const categories = this.component.findAll('#category option')
      assert.equal(categories.length, 3)
    })
    it('displays a selected department', () => {
      const department = this.component.find('#department input').element.value
      assert.equal(department, 'A Department')
    })
  })
  describe('submission', () => {
    it('saves a draft', () => {
      this.component.find('.save-draft').trigger('click')
      assert.deepEqual(this.component.emitted().saveDraft[0][0], smallEvent)
    })
    it('submits an event for approval', () => {
      this.component.find('form').trigger('submit')
      assert.deepEqual(this.component.emitted().submitEvent[0][0], smallEvent)
    })
  })
})
