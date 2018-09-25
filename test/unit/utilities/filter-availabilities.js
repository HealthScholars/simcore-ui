/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

const assert = require('assert')
const {
  normalize,
  groupUserDays,
  filterDuration,
  splitLongDurations,
  aggregateDaysWithSpecificUsers,
  filterEnoughInstructors,
} = require('../../../utilities/filter-availabilities')

describe('filter-availabilities', () => {
  describe('#normalize', () => {
    it('returns an empty array if passed an empty object', () => {
      assert.deepEqual(normalize({}), [])
    })
    it('returns an empty user array if passed an empty user object', () => {
      assert.deepEqual(normalize({
        '1': []
      }), [{
        id: 1,
        days: []
      }])
    })
    it('formats single availability as an array', () => {
      assert.deepEqual(normalize({
        '1': [{
          '2018-07-01 00:00:00': {
            startTime: 1,
            duration: 1,
          },
        }]
      }), [{
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }])
    })
    it('formats multiple availabilities in a single day', () => {
      assert.deepEqual(normalize({
        '1': [{
          '2018-07-01 01:00:00': {
            startTime: 1,
            duration: 1,
          }
        }, {
          '2018-07-01 02:00:00': {
            startTime: 2,
            duration: 2,
          },
        }]
      }), [{
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 2,
            duration: 2,
          }]
        }]
      }])
    })
    it('formats availabilities in a multiple days', () => {
      assert.deepEqual(normalize({
        '1': [{
          '2018-07-01 01:00:00': {
            startTime: 1,
            duration: 1,
          }
        }, {
          '2018-07-01 02:00:00': {
            startTime: 2,
            duration: 2,
          },
        }, {
          '2018-07-02 02:00:00': {
            startTime: 1,
            duration: 1,
          },
        }]
      }), [{
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 2,
            duration: 2,
          }]
        }, {
          date: '2018-07-02',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }])
    })
    it('formats multiple users availabilities', () => {
      assert.deepEqual(normalize({
        '1': [{
          '2018-07-01 01:00:00': {
            startTime: 1,
            duration: 1,
          }
        }],
        '2': [{
          '2018-07-01 01:00:00': {
            startTime: 1,
            duration: 1,
          }
        }]
      }), [{
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }, {
        id: 2,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }])
    })
  })

  describe('#filterDuration', () => {
    it('keeps all availabilities if all are more than duration', () => {
      const user = {
        days: [{
          availabilities: [{
            duration: 2,
          }, {
            duration: 2,
          }]
        }]
      }
      const filteredDurations = filterDuration(1)(user)

      assert.deepEqual(filteredDurations, user)
    })
    it('removes all availabilities if none are greater than or equal to duration', () => {
      const user = {
        days: [{
          availabilities: [{
            duration: 1,
          }, {
            duration: 1,
          }]
        }]
      }
      const filteredDurations = filterDuration(2)(user)

      assert.deepEqual(filteredDurations, {
        days: [{
          availabilities: []
        }]
      })
    })
    it('keeps only availabilities than are equal to or less than duration', () => {
      const user = {
        days: [{
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 2,
            duration: 2,
          }]
        }]
      }
      const filteredDurations = filterDuration(2)(user)

      assert.deepEqual(filteredDurations, {
        days: [{
          availabilities: [{
            startTime: 2,
            duration: 2,
          }]
        }]
      })
    })
  })

  describe('#splitLongDurations', () => {
    it('keeps an availability of the minimum duration', () => {
      const user = {
        days: [{
          availabilities: [{
            duration: 1,
          }]
        }]
      }
      const splitDurations = filterDuration(1)(user)
      assert.deepEqual(splitDurations, user)
    })
    it('splits a long availability', () => {
      const user = {
        days: [{
          availabilities: [{
            startTime: 1,
            duration: 2,
          }]
        }]
      }
      const splitDurations = splitLongDurations(1)(user)
      assert.deepEqual(splitDurations, {
        days: [{
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 1.5,
            duration: 1,
          }, {
            startTime: 2,
            duration: 1,
          }]
        }]
      })
    })
    it('splits a long availability and keeps a minimum one', () => {
      const user = {
        days: [{
          availabilities: [{
            startTime: 1,
            duration: 2,
          }, {
            startTime: 5,
            duration: 1,
          }]
        }]
      }
      const splitDurations = splitLongDurations(1)(user)
      assert.deepEqual(splitDurations, {
        days: [{
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 1.5,
            duration: 1,
          }, {
            startTime: 2,
            duration: 1,
          }, {
            startTime: 5,
            duration: 1,
          }]
        }]
      })
    })
  })
  describe('#aggregateDaysWithSpecificUsers', () => {
    it('should add a specific user to a day', () => {
      const user = {
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }
      const aggregatedDay = aggregateDaysWithSpecificUsers([1])([], user)

      assert.deepEqual(aggregatedDay, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          duration: 1,
          specificInstructors: [1],
          generalInstructors: [],
        }],
      }])
    })
    it('should add a specific user to multiple availabilities', () => {
      const user = {
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 2,
            duration: 1,
          }]
        }]
      }
      const aggregatedDay = aggregateDaysWithSpecificUsers([1])([], user)

      assert.deepEqual(aggregatedDay, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          duration: 1,
          specificInstructors: [1],
          generalInstructors: [],
        }, {
          startTime: 2,
          duration: 1,
          specificInstructors: [1],
          generalInstructors: [],
        }],
      }])
    })
    it('should add a general user to availabilities', () => {
      const user = {
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }, {
            startTime: 2,
            duration: 1,
          }]
        }]
      }
      const aggregatedDay = aggregateDaysWithSpecificUsers([])([], user)

      assert.deepEqual(aggregatedDay, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          duration: 1,
          specificInstructors: [],
          generalInstructors: [1],
        }, {
          startTime: 2,
          duration: 1,
          specificInstructors: [],
          generalInstructors: [1],
        }],
      }])
    })
    it('should add a general user to multiple days', () => {
      const user = {
        id: 1,
        days: [{
          date: '2018-07-01',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }, {
          date: '2018-07-02',
          availabilities: [{
            startTime: 1,
            duration: 1,
          }]
        }]
      }
      const aggregatedDay = aggregateDaysWithSpecificUsers([])([], user)

      assert.deepEqual(aggregatedDay, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          duration: 1,
          specificInstructors: [],
          generalInstructors: [1],
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 1,
          duration: 1,
          specificInstructors: [],
          generalInstructors: [1],
        }],
      }])
    })
  })

  describe('#filterEnoughInstructors', () => {
    it('should leave availabilities with enough instructors untouched', () => {
      const day = {
        availabilities: [{
          specificInstructors: [],
          generalInstructors: [1],
        }],
      }

      const filteredDays = filterEnoughInstructors(1)(day)

      assert.deepEqual(filteredDays, day)
    })
    it('should remove all availabilities without enough instructors', () => {
      const day = {
        availabilities: [{
          specificInstructors: [],
          generalInstructors: [1],
        }],
      }

      const filteredDays = filterEnoughInstructors(2)(day)

      assert.deepEqual(filteredDays, {
        availabilities: []
      })
    })
    it('should count specific and general instructors toward the total', () => {
      const day = {
        availabilities: [{
          specificInstructors: [1],
          generalInstructors: [2],
        }],
      }

      const filteredDays = filterEnoughInstructors(2)(day)

      assert.deepEqual(filteredDays, day)
    })
  })

  describe('#filterRequiredInstructors', () => {
    it('should keep all availabilities if they all contain all required instructors')
    it('should remove availabilities if they don\'t contain all required instructors')
    it('should keep the availabilities if they contain all required instructors')
  })
})
