/* global describe, before, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import IconText from '../../../components/IconText'

describe('IconText', () => {
  before(() => {
    mount(IconText, {
      propsData: {
        icon: '',
        iconType: '',
        text: '',
        circle: false,
        round: false,
        square: false,
      },
    })
  })
  describe('#render', () => {
    describe('simple', () => {
      before(() => {
        this.component = mount(IconText, {
          propsData: {
            text: 'Simple',
          },
        })
      })
      it('Renders basic text', () => {
        assert.equal(this.component.text(), 'Simple')
      })
    })
  })
})
