const assert = require('assert')
const {
  getEquipmentBookings,
  getRoomBookings,
  getPersonBookings,
} = require('../../../utilities/events-to-availabilities')

describe('event-conflicts', () => {
  describe('#getEquipmentBookings', () => {
    it('returns an array if given an array', () => {
      const events = []
      assert.deepEqual(getEquipmentBookings(events), {})
    })
    it('returns an item if given a single equipment event', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          equipment: [{
            id: 1,
          }],
        }],
      }]
      assert.deepEqual(getEquipmentBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
        },
      })
    })
    it('returns items if given a multi equipment event', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          equipment: [{
            id: 1,
          }, {
            id: 2,
          }],
        }],
      }]
      assert.deepEqual(getEquipmentBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
          2: [1, 1.5],
        },
      })
    })
  })
  it('returns items if given a multiple events', () => {
    const events = [{
      date: '2018-01-01',
      start_time: 1,
      duration: 1,
      sessions: [{
        equipment: [{
          id: 1,
        }, {
          id: 2,
        }],
      }],
    }, {
      date: '2018-01-02',
      start_time: 2,
      duration: 2,
      sessions: [{
        equipment: [{
          id: 1,
        }],
      }],
    }]
    assert.deepEqual(getEquipmentBookings(events), {
      '2018-01-01': {
        1: [1, 1.5],
        2: [1, 1.5],
      },
      '2018-01-02': {
        1: [2, 2.5, 3, 3.5],
      },
    })
  })
  describe('#getRoomBookings', () => {
    it('returns an array if given an array', () => {
      const events = []
      assert.deepEqual(getRoomBookings(events), [])
    })
    it('also works if given a room', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          rooms: [{
            id: 1,
          }, {
            id: 2,
          }],
        }],
      }, {
        date: '2018-01-02',
        start_time: 2,
        duration: 2,
        sessions: [{
          rooms: [{
            id: 1,
          }],
        }],
      }]
      assert.deepEqual(getRoomBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
          2: [1, 1.5],
        },
        '2018-01-02': {
          1: [2, 2.5, 3, 3.5],
        },
      })
    })
  })
  describe('#getPersonBookings', () => {
    it('returns bookings for learners', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          learners: [{
            id: 1,
          }],
        }],
      }]

      assert.deepEqual(getPersonBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
        },
      })
    })
    it('returns bookings for instructors', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          instructors: [{
            id: 1,
          }],
        }],
      }]

      assert.deepEqual(getPersonBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
        },
      })
    })
    it('returns bookings for learners and instructors', () => {
      const events = [{
        date: '2018-01-01',
        start_time: 1,
        duration: 1,
        sessions: [{
          learners: [{
            id: 1,
          }],
          instructors: [{
            id: 2,
          }],
        }],
      }]

      assert.deepEqual(getPersonBookings(events), {
        '2018-01-01': {
          1: [1, 1.5],
          2: [1, 1.5],
        },
      })
    })
  })
})
