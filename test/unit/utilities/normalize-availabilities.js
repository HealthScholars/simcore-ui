/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

const assert = require('assert')
const {
  normalize,
} = require('../../../utilities/normalize-availabilities')

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
