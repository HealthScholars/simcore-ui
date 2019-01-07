/* global describe, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import TagList from '../../../components/TagList'

describe('Tag ListItem', () => {
  it('renders selected items in a tag list', () => {
    const component = mount(TagList, {
      propsData: {
        selectedTags: [{
          id: 1,
          label: '1',
        }, {
          id: 2,
          label: '2',
        }],
      },
    })

    assert.equal(component.findAll('li').length, 2)
    assert.equal(component.find('li:nth-child(1)').text(), '1')
    assert.equal(component.find('li:nth-child(2)').text(), '2')
  })
})
