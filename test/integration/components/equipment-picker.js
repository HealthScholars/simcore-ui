/* global describe, before, beforeEach, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import EquipmentPicker from '../../../components/EquipmentPicker'

describe('EquipmentPicker', () => {
  before(() => {
    this.component = mount(EquipmentPicker)
  })
  it('renders the header', () => {
    const component = mount(EquipmentPicker)
    assert.equal(component.find('header').text(), 'Equipment: 0')
  })
  describe('List items', () => {
    describe('listing a single empty item', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [],
            selectedItems: [{}],
          },
        })
      })
      it('shows 1 item', () => {
        assert.equal(this.component.findAll('li').length, 1)
      })
    })
    describe('listing multiple selected items', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [],
            selectedItems: [{}, {}],
          },
        })
      })
      it('shows 2 items', () => {
        assert.equal(this.component.findAll('li').length, 2)
      })
    })
  })
  describe('Remove items', () => {
    describe('not removing the first item', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [],
            selectedItems: [{}],
          },
        })
      })
      it('lists 1 item', () => {
        assert.equal(this.component.findAll('li').length, 1)
      })
      it('doesn\'t show a remove icon', () => {
        assert.ok(!this.component.find('.sim-autofinder--remove-item').exists())
      })
    })
    describe('removing items other than the first', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [],
            selectedItems: [{}, {}, {}],
          },
        })
      })
      it('lists 3 item', () => {
        assert.equal(this.component.findAll('li').length, 3)
      })
      it('doesn\'t show a remove icon for the last element', () => {
        assert.ok(!this.component.find('li:last-child').find('.sim-autofinder--remove-item').exists())
      })
      it('shows a remove icon for the first and second elements', () => {
        assert.ok(this.component.find('li:nth-child(1)').find('.sim-autofinder--remove-item').exists())
        assert.ok(this.component.find('li:nth-child(2)').find('.sim-autofinder--remove-item').exists())
      })
    })
    describe('removing items by clicking the remove icon', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [],
            selectedItems: [{}, { id: 1 }, {}],
          },
        })
      })
      it('triggers the removeEquipment event when the remove icon is clicked', () => {
        this.component.find('li:nth-child(2)').find('.sim-autofinder--remove-item').trigger('click')
        assert.equal(this.component.emitted().removeEquipment[0][0].id, 1)
      })
    })
  })
  describe('Adding items', () => {
    describe('adding a single item', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [{ id: 1, label: 'A' }],
            selectedItems: [{}],
          },
        })
      })
      it('triggers the addEquipment event with an item is selected', () => {
        this.component.find('li:first-child').find('.sim-autofinder--search--input').setValue('A')
        this.component.find('li:first-child').find('.sim-autofinder--search--input').trigger('keydown.enter')
        assert.equal(this.component.emitted().addEquipment[0][0].id, 1)
      })
    })
    describe('adding multiple items', () => {
      beforeEach(() => {
        this.component = mount(EquipmentPicker, {
          propsData: {
            availableItems: [{ id: 1, label: 'A' }, { id: 2, label: 'B' }],
            selectedItems: [{}, {}],
          },
        })
      })
      it('triggers the addEquipment event multiple times with the correct values', () => {
        this.component.find('li:nth-child(2)').find('.sim-autofinder--search--input').setValue('B')
        this.component.find('li:nth-child(2)').find('.sim-autofinder--search--input').trigger('keydown.enter')
        assert.equal(this.component.emitted().addEquipment[0][0].id, 2)

        this.component.setData({
          selectedItems: [{}, {}, {}],
        })

        this.component.find('li:nth-child(3)').find('.sim-autofinder--search--input').setValue('A')
        this.component.find('li:nth-child(3)').find('.sim-autofinder--search--input').trigger('keydown.enter')
        assert.equal(this.component.emitted().addEquipment[1][0].id, 1)
      })
    })
  })
})
