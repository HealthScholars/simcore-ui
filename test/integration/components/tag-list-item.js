/* global describe, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import TagListItem from '../../../components/TagListItem'

describe('Tag List Item', () => {
  it('renders a label', () => {
    const component = mount(TagListItem, {
      propsData: {
        label: 'Hi',
      },
    })
    assert.equal(component.find('p').text(), 'Hi')
  })
  it('emits a remove event when button is clicked', () => {
    const component = mount(TagListItem, {
      propsData: {
        label: 'Hi',
      },
    })
    component.find('button').trigger('click')
    assert.equal(component.emitted().remove.length, 1)
  })
})
