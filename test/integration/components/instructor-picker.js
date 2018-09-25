/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import InstructorPicker from '../../../components/InstructorPicker'

xdescribe('InstructorPicker', () => {
  beforeEach(() => {
    this.component = shallowMount(InstructorPicker, {
      propsData: {
        availableInstructors: [{
          id: 1,
          firstname: 'a',
          lastname: 'b',
        }, {
          id: 2,
          firstname: 'c',
          lastname: 'd',
        }],
        selectedInstructors: [{
          id: 3,
          firstname: 'e',
          lastname: 'f',
        }],
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  describe('#instructorsWithALabel', () => {
    it('adds labels to the instructors list', () => {
      assert.deepEqual(this.component.vm.instructorsWithLabel, [{
        id: 1,
        firstname: 'a',
        lastname: 'b',
        label: 'b, a',
      }, {
        id: 2,
        firstname: 'c',
        lastname: 'd',
        label: 'd, c',
      }])
    })
  })
  describe('#selectedInstructorCount', () => {
    it('returns the count', () => {
      assert.equal(this.component.vm.selectedInstructorCount, 1)
    })
  })
  describe('#selectedInstructorsWithFocus', () => {
    it('adds focus the selected instructors list', () => {
      this.component.vm.currentlySelectedIndex = 0
      assert.deepEqual(this.component.vm.selectedInstructorsWithFocus, [{
        id: 3,
        firstname: 'e',
        lastname: 'f',
        isFocused: true,
      }])
    })
  })
  describe('#addInstructor', () => {
    it('emits an event to add an instructor', () => {
      this.component.vm.addInstructor()
      assert.ok(this.component.emitted().addInstructor)
    })
  })
  describe('#removeInstructor', () => {
    it('emits an event to remove an instructor', () => {
      this.component.vm.removeInstructor(5)
      assert.equal(this.component.emitted().removeInstructor[0][0], 5)
    })
  })
  describe('#selectInstructor', () => {
    it('emits an event to select an instructor', () => {
      this.component.vm.selectInstructor(5, 6)
      assert.deepEqual(this.component.emitted().selectInstructor[0], [5, 6])
    })
  })
  describe('#clearInstructor', () => {
    it('emits an event to clear an instructor', () => {
      this.component.vm.clearInstructor(5)
      assert.equal(this.component.emitted().clearInstructor[0][0], 5)
    })
  })
  describe('#focusNextItem', () => {
    it('increments the selected index', () => {
      assert.equal(this.component.vm.currentlySelectedIndex, 0)
      this.component.vm.focusNextItem(0)
      assert.equal(this.component.vm.currentlySelectedIndex, 1)
    })
    it('adds an instructor if it\'s the last element', () => {
      this.component.vm.focusNextItem(1)
      assert.equal(this.component.vm.currentlySelectedIndex, 2)
      assert.ok(this.component.emitted().addInstructor)
    })
  })
})
