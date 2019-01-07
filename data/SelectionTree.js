import _ from 'lodash'

export default class SelectionTree {
  constructor({ heading = null, subheading = null, items = [], sort = 'name' }) {
    let orderedItems        = []
    let orderedItemIndices  = []
    const size              = items.length
    const originalItems     = items

    if (heading) {
      if (subheading) {
        // Build headings AND nested subheadings.
        orderedItems = _.orderBy(_.reduce(_.groupBy(items, heading),
          (headingItems, headingSubheadingItems, key) => {
            return [...headingItems, {
              name: key,
              subheadings: _.orderBy(_.reduce(_.groupBy(headingSubheadingItems, subheading),
                (orderedSubheadingItems, subeadingItems, subHeadingKey) => {
                  return [...orderedSubheadingItems, {
                    name: subHeadingKey,
                    items: _.orderBy(subeadingItems, sort),
                  }]
                }, []),
                sort),
            }]
          }, []),
        sort)

        // The item table of contents.
        _.each(orderedItems, (headingItem) => {
          _.each(headingItem.subheadings, (subheadingItem) => {
            _.each(subheadingItem.items, (item) => {
              orderedItemIndices.push(item.id)
            })
          })
        })
      } else {
        // Build headings only.
        orderedItems = _.orderBy(_.reduce(_.groupBy(items, heading),
          (orderedHeadingItems, headingItems, key) => {
            return [...orderedHeadingItems, {
              name: key,
              items: _.orderBy(headingItems, sort),
            }]
          }, []),
        sort)

        // The item table of contents.
        _.each(orderedItems, (headingItem) => {
          _.each(headingItem.items, (item) => {
            orderedItemIndices.push(item.id)
          })
        })
      }
    } else {
      orderedItems = _.orderBy(items, sort)
      // The item table of contents.
      orderedItemIndices = _.map(orderedItems, item => item.id)
    }

    this.size = size
    this.originalItems = originalItems
    this.indexes = orderedItemIndices
    this.items = orderedItems
  }

  getIndexByItemId(id) {
    return _.indexOf(this.indexes, id)
  }

  getItemByIndex(index) {
    const itemId = this.indexes[index]

    return _.find(this.originalItems, (item) => item.id === itemId)
  }
}
