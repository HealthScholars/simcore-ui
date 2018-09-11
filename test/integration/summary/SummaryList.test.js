/* global describe, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import SummaryList from '../../../components/Summary/SummaryList'

describe('SummaryList', () => {
  beforeEach(() => {
    this.summaryList = shallowMount(SummaryList, {
      propsData: {
        title: 'Equipment',
        content: [
          'Metiman',
          'Monitor Sonsonite',
        ],
      },
    })
  })

  describe('#render', () => {
    it('renders with all items', () => {
      console.log(this.summaryList.findAll('li').length)
      expect(this.summaryList.html()).to.have.string('<ul><li><!----> Metiman</li><li><!----> Monitor Sonsonite</li></ul>')
    })

    it('renders an empty message if there are no items', () => {
      const emptySummaryList = shallowMount(SummaryList, {
        propsData: {
          title: 'Equipment',
          content: [],
        },
      })

      expect(emptySummaryList.html()).to.have.string('<ul>\n      (none)\n    </ul>')
    })
  })
})
