/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */

import assert from 'assert'
import SelectionTree from '../../../data/SelectionTree'

const exampleItems = [
  {
    'id': 1,
    'name': 'Option B',
    'facility': 'Heading A',
    'department': 'Subheading A',
  },
  {
    'id': 2,
    'name': 'Option C',
    'facility': 'Heading B',
    'department': 'Subheading B',
  },
  {
    'id': 3,
    'name': 'Option D',
    'facility': 'Heading B',
    'department': 'Subheading A',
  },
  {
    'id': 4,
    'name': 'Option E',
    'facility': 'Heading A',
    'department': 'Subheading B',
  },
  {
    'id': 5,
    'name': 'Option C', // Duplicate names are valid under distinct Header/SubHeaders.
    'facility': 'Heading A',
    'department': 'Subheading B',
  },
]

const treeWithoutHeadingsOrSubheadings = new SelectionTree({
  items: exampleItems,
})

const treeWithHeadingsOnly = new SelectionTree({
  items: exampleItems,
  heading: 'facility',
})

const treeWithHeadingsAndSubheadings = new SelectionTree({
  items: exampleItems,
  heading: 'facility',
  subheading: 'department',
})

describe('filter-availabilities', () => {
  describe('#construct', () => {
    // TODO: Handle invalid option types.
    // - groupBy
    // TODO: Handle invalid items.
    // - orderBy
    it('doesn\'t group items when no string is provided for heading or subheading', () => {
      const expectedHeadingsAndSubheadings = [
        {
          'id': 1,
          'name': 'Option B',
          'facility': 'Heading A',
          'department': 'Subheading A',
        },
        {
          'id': 2,
          'name': 'Option C',
          'facility': 'Heading B',
          'department': 'Subheading B',
        },
        {
          'id': 5,
          'name': 'Option C', // Duplicate names are valid under distinct Header/SubHeaders.
          'facility': 'Heading A',
          'department': 'Subheading B',
        },
        {
          'id': 3,
          'name': 'Option D',
          'facility': 'Heading B',
          'department': 'Subheading A',
        },
        {
          'id': 4,
          'name': 'Option E',
          'facility': 'Heading A',
          'department': 'Subheading B',
        },
      ]

      assert.deepEqual(treeWithoutHeadingsOrSubheadings.items, expectedHeadingsAndSubheadings)
    })
    it('groups headings without subheadings when a string is provided for only the heading', () => {
      const expectedHeadingsAndSubheadings = [
        {
          'name': 'Heading A',
          'items': [
            {
              'id': 1,
              'name': 'Option B',
              'facility': 'Heading A',
              'department': 'Subheading A',
            },
            {
              'id': 5,
              'name': 'Option C',
              'facility': 'Heading A',
              'department': 'Subheading B',
            },
            {
              'id': 4,
              'name': 'Option E',
              'facility': 'Heading A',
              'department': 'Subheading B',
            },
          ],
        },
        {
          'name': 'Heading B',
          'items': [
            {
              'id': 2,
              'name': 'Option C',
              'facility': 'Heading B',
              'department': 'Subheading B',
            },
            {
              'id': 3,
              'name': 'Option D',
              'facility': 'Heading B',
              'department': 'Subheading A',
            },
          ],
        },
      ]

      assert.deepEqual(treeWithHeadingsOnly.items, expectedHeadingsAndSubheadings)
    })
    it('groups headings and subheadings when strings are provided for each', () => {
      const expectedHeadingsAndSubheadings = [
        {
          'name': 'Heading A',
          'subheadings': [
            {
              'name': 'Subheading A',
              'items': [
                {
                  'id': 1,
                  'name': 'Option B',
                  'facility': 'Heading A',
                  'department': 'Subheading A',
                },
              ],
            },
            {
              'name': 'Subheading B',
              'items': [
                {
                  'id': 5,
                  'name': 'Option C',
                  'facility': 'Heading A',
                  'department': 'Subheading B',
                },
                {
                  'id': 4,
                  'name': 'Option E',
                  'facility': 'Heading A',
                  'department': 'Subheading B',
                },
              ],
            },
          ],
        },
        {
          'name': 'Heading B',
          'subheadings': [
            {
              'name': 'Subheading A',
              'items': [
                {
                  'id': 3,
                  'name': 'Option D',
                  'facility': 'Heading B',
                  'department': 'Subheading A',
                },
              ],
            },
            {
              'name': 'Subheading B',
              'items': [
                {
                  'id': 2,
                  'name': 'Option C',
                  'facility': 'Heading B',
                  'department': 'Subheading B',
                },
              ],
            },
          ],
        },
      ]

      assert.deepEqual(treeWithHeadingsAndSubheadings.items, expectedHeadingsAndSubheadings)
    })
    it('sorts item indexes by item name when no string is provided for heading or subheading', () => {
      const expectedSortedIndexes = [1, 2, 5, 3, 4]

      assert.deepEqual(treeWithoutHeadingsOrSubheadings.indexes, expectedSortedIndexes)
    })
    it('sorts item indexes by heading name then item name when a string is only provided for heading', () => {
      const expectedSortedIndexes = [1, 5, 4, 2, 3]

      assert.deepEqual(treeWithHeadingsOnly.indexes, expectedSortedIndexes)
    })
    it('sorts item indexes by heading name, subheading name then item name when a string is provided for heading and subheading', () => {
      const expectedSortedIndexes = [1, 5, 4, 3, 2]

      assert.deepEqual(treeWithHeadingsAndSubheadings.indexes, expectedSortedIndexes)
    })
  })
})
