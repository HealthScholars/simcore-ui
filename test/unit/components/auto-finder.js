/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
// import AutoFinder from '../../../components/Autofinder'

xdescribe('AutoFinder', () => {
  beforeEach(() => {
    this.component = shallowMount(AutoFinder, {
      propsData: {
        options: [{
          id: 1,
          label: 'a',
        }, {
          id: 2,
          label: 'b',
        }],
        selectedItem: {
          id: 2,
          label: 'b',
        },
        canRemove: true,
        isFocused: true,
        index: 2,
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  describe('#remove', () => {
    it('emits a remove event', () => {
      this.component.vm.remove()
      assert.ok(this.component.emitted().remove)
    })
  })
  describe('#select', () => {
    it('focuses the next item when selected', () => {
      this.component.vm.select()
      assert.ok(this.component.emitted().focusNextItem[0])
      assert.ok(!this.component.emitted().select)
    })
  })
  describe('#updateInput', () => {
    it('emits a clear event if an item has already been found and resets the highlight', () => {
      this.component.vm.updateInput({
        target: {
          value: 'a',
        },
      })
      assert.ok(this.component.emitted().clear)
      assert.equal(this.component.vm.highlightedId, -1)
    })
    it('sets the search term if an item has not been found', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      this.component.vm.updateInput({
        target: {
          value: 'a',
        },
      })
      assert.ok(!this.component.emitted().clear)
      assert.equal(this.component.vm.searchTerm, 'a')
    })
  })
  describe('#blur', () => {
    it('resets the search box if an item hasn\'t been selected', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      this.component.vm.searchTerm = 'a'
      this.component.vm.blur()
      assert.ok(!this.component.vm.searchTerm)
    })
  })
  describe('#setHighlightedOption', () => {
    it('sets the highighted option', () => {
      this.component.vm.setHighlightedOption(2)
      assert.equal(this.component.vm.highlightedId, 2)
    })
  })
  describe('#inputValue', () => {
    it('returns the label if an item is selected', () => {
      assert.equal(this.component.vm.inputValue, 'b')
    })
    it('returns the search term if an item isn\'t selected', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      this.component.vm.searchTerm = 'c'
      assert.equal(this.component.vm.inputValue, 'c')
    })
  })
  describe('#icon', () => {
    it('returns a checkbox if an item is found', () => {
      assert.equal(this.component.vm.icon, '#icon--checkbox--checked')
    })
    it('returns a circle if an item isn\'t found', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      assert.equal(this.component.vm.icon, '#icon--checkbox--available')
    })
  })
  describe('#optionsOpen', () => {
    it('opens the options if a search is entered', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      assert.ok(!this.component.vm.optionsOpen)
      this.component.vm.searchTerm = 'a'
      assert.ok(this.component.vm.optionsOpen)
    })
    it('closes the options if a search is empty', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      this.component.vm.searchTerm = ''
      assert.ok(!this.component.vm.optionsOpen)
    })
    it('closes the options if an item is selected', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {
            id: 2,
          },
        },
      })
      this.component.vm.searchTerm = 'a'
      assert.ok(!this.component.vm.optionsOpen)
    })
  })
  describe('#foundItem', () => {
    it('indicates that an item has been found', () => {
      assert.ok(this.component.vm.foundItem)
    })
    it('indicates that an item has not been found', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      assert.ok(!this.component.vm.foundItem)
    })
  })
  describe('#firstId', () => {
    it('returns the first id', () => {
      assert.equal(this.component.vm.firstId, 1)
    })
    it('returns -1 if there is no first id', () => {
      this.component = shallowMount(AutoFinder, {
        propsData: {
          options: [],
          selectedItem: {},
        },
      })
      assert.equal(this.component.vm.firstId, -1)
    })
  })
  describe('#currentIndex', () => {
    it('returns the index of the currently highlighted element', () => {
      assert.equal(this.component.vm.currentIndex, 0)
    })
  })
  describe('#nextIndex', () => {
    it('returns the next address if it\'s before the end', () => {
      assert.equal(this.component.vm.nextIndex, 1)
    })
    it('returns the last index if it\'s at the end', () => {
      this.component.vm.highlightedId = 2
      assert.equal(this.component.vm.nextIndex, 1)
    })
  })
  describe('#previousIndex', () => {
    it('returns the first index if it\'s at the beginning', () => {
      assert.equal(this.component.vm.previousIndex, 0)
    })
    it('returns the previous index if it\'s after the beginning', () => {
      this.component.vm.highlightedId = 2
      assert.equal(this.component.vm.previousIndex, 0)
    })
  })
  describe('#highlightedId', () => {
    it('returns the default highlighted ID', () => {
      assert.equal(this.component.vm.highlightedId, 1)
    })
  })
  describe('#matchingOptions', () => {
    it('returns the current matching options', () => {
      assert.deepEqual(this.component.vm.matchingOptions, [{
        id: 1,
        label: 'a',
        isHighlighted: true,
      }, {
        id: 2,
        label: 'b',
        isHighlighted: false,
      }])
    })
  })
  describe('#highlightPrevious', () => {
    it('highlights the previous match if it\'s after the beginning', () => {
      this.component.vm.highlightedId = 2
      this.component.vm.highlightPrevious()
      assert.equal(this.component.vm.highlightedId, 1)
    })
    it('highlights the first match if it\'s at the beginning', () => {
      assert.equal(this.component.vm.highlightedId, 1)
      this.component.vm.highlightPrevious()
      assert.equal(this.component.vm.highlightedId, 1)
    })
  })
  describe('#highlightNext', () => {
    it('highlights the next match if it\'s before the end', () => {
      assert.equal(this.component.vm.highlightedId, 1)
      this.component.vm.highlightNext()
      assert.equal(this.component.vm.highlightedId, 2)
    })
    it('highlights the last match if it\'s at the end', () => {
      this.component.vm.highlightedId = 2
      this.component.vm.highlightNext()
      assert.equal(this.component.vm.highlightedId, 2)
    })
  })
})
