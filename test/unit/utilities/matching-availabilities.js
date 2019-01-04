const assert = require('assert')
const { matchingAvailabilities } = require('../../../utilities/matching-availabilities')


/*
const dayjs = require('dayjs')
const { times } = require('lodash')

function getDaysInMonth(date) {
  const daysInMonth = []
  const monthDate = dayjs(date).startOf('month')

  return times(monthDate.daysInMonth(), () => {
    daysInMonth.push(monthDate.format('YYYY-MM-DD'))
    monthDate.add(1, 'day')
  })
}
*/

xdescribe('matchingAvailabilities', () => {
  it('returns a day of availabilities if given no filters', () => {
    assert.deepEqual(matchingAvailabilities(['2018-07-01'], [], {}), {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns 2 days of availabilities if given no filters', () => {
    assert.deepEqual(matchingAvailabilities(['2018-07-01', '2018-07-02'], [], {}), {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
      '2018-07-02': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })

  it('filters non-matching instructors', () => {
    assert.deepEqual(matchingAvailabilities(['2018-07-01'], [{
      sessions: [{
        instructors: [{
          id: 1,
        }],
      }],
    }], {
      instructors: [{
        id: 2,
      }],
    }), {
      '2018-07-01': [],
    })
  })

  it('filters non-matching learners', () => {
    assert.deepEqual(matchingAvailabilities(['2018-07-01'], [{
      sessions: [{
        learners: [{
          id: 1,
        }],
      }],
    }], {
      learners: [{
        id: 2,
      }],
    }), {
      '2018-07-01': [],
    })
  })

  it('filters non-matching equipment', () => {
    assert.deepEqual(matchingAvailabilities(['2018-07-01'], [{
    }], {
      equipment: [{
        id: 2,
      }],
    }), {
      '2018-07-01': [],
    })
  })
})
