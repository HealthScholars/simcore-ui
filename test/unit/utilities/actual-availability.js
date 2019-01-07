const assert = require('assert')
const {
  getPersonActualAvailability,
  getEquipmentAvailability,
  getRoomAvailability,
} = require('../../../utilities/actual-availability')

describe('#getPersonActualAvailability', () => {
  it('returns a day of availability if given no events and no availabilities', () => {
    const id = 1
    const dates = ['2018-07-01']
    const events = []

    const expectedAvailabilities = {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    }

    assert.deepEqual(getPersonActualAvailability(id, dates, events), expectedAvailabilities)
  })
  it('returns 2 days of availability if given no events and no availabilities', () => {
    const id = 1
    const dates = ['2018-07-01', '2018-07-02']
    const events = []

    const expectedAvailabilities = {
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
    }

    assert.deepEqual(getPersonActualAvailability(id, dates, events), expectedAvailabilities)
  })
  it('returns a day of availability if given no conflicting events', () => {
    const id = 1
    const dates = ['2018-07-01']
    const events = [{
      date: '2018-07-01',
      startTime: 1,
      duration: 1,
      sessions: [{
        learners: [{
          id: 2,
        }],
      }],
    }]

    const expectedAvailabilities = {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    }

    assert.deepEqual(getPersonActualAvailability(id, dates, events), expectedAvailabilities)
  })
  it('returns a day of reduced availability if given a conflicting event as a learner', () => {
    const id = 1
    const dates = ['2018-07-01']
    const events = [{
      date: '2018-07-01',
      startTime: 1,
      duration: 20,
      sessions: [{
        learners: [{
          id: 1,
        }],
      }],
    }]

    const expectedAvailabilities = {
      '2018-07-01': [
        0.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    }

    assert.deepEqual(getPersonActualAvailability(id, dates, events), expectedAvailabilities)
  })
  it('returns a day of reduced availability if given a conflicting event as an instructor', () => {
    assert.deepEqual(getPersonActualAvailability(1, ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 20,
      sessions: [{
        instructors: [{
          id: 1,
        }],
      }],
    }], {}), {
      '2018-07-01': [
        0.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns a day of reduced availability if given multiple conflicts', () => {
    assert.deepEqual(getPersonActualAvailability(1, ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 1,
      sessions: [{
        instructors: [{
          id: 1,
        }],
      }],
    }, {
      date: '2018-07-01',
      startTime: 12,
      duration: 1,
      sessions: [{
        learners: [{
          id: 1,
        }],
      }],
    }], {}), {
      '2018-07-01': [
        0.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
        13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('removes a time that isn\'t explicitly stated as available', () => {
    assert.deepEqual(getPersonActualAvailability(1, ['2018-07-01'], [], {
      1: [{
        '2018-07-01 00:00:00': {
          startTime: 1,
          duration: 10,
        },
      }],
    }), {
      '2018-07-01': [
        1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
      ],
    })
  })
})

describe('#getEquipmentAvailability', () => {
  it('returns a day of availability if given no events and no availabilities', () => {
    assert.deepEqual(getEquipmentAvailability(1, ['2018-07-01'], [], {}), {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns a day of availability if given no conflicting events', () => {
    assert.deepEqual(getPersonActualAvailability(1, ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 1,
      sessions: [{
        learners: [{
          id: 2,
        }],
      }],
    }], {}), {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns a day of reduced availability if given a conflicting event', () => {
    assert.deepEqual(getEquipmentAvailability(1, ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 20,
      equipment: [{
        id: 1,
      }],
    }], {}), {
      '2018-07-01': [
        0.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns a day of reduced availability if given multiple conflicts', () => {
    assert.deepEqual(getEquipmentAvailability(1, ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 1,
      equipment: [{
        id: 1,
      }],
    }, {
      date: '2018-07-01',
      startTime: 12,
      duration: 1,
      equipment: [{
        id: 1,
      }],
    }], {}), {
      '2018-07-01': [
        0.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
        13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
})

describe('#getRoomAvailability', () => {
  it('returns a day of availability if a matching room and no events', () => {
    assert.deepEqual(getRoomAvailability(['Wall Gas'], ['2018-07-01'], [], [{
      id: 1,
      custom_attributes: [{
        id: 1,
        value: 'Wall Gas',
      }],
    }]), {
      '2018-07-01': [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })

  it('returns a day of reduced availability if given a conflicting event', () => {
    assert.deepEqual(getRoomAvailability(['Wall Gas'], ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 20,
      sessions: [{
        rooms: [{
          id: 1,
        }],
      }],
    }], [{
      id: 1,
      custom_attributes: [{
        id: 1,
        value: 'Wall Gas',
      }],
    }]), {
      '2018-07-01': [
        0.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
  it('returns a day of reduced availability if given multiple conflicts', () => {
    assert.deepEqual(getRoomAvailability(['Wall Gas'], ['2018-07-01'], [{
      date: '2018-07-01',
      startTime: 1,
      duration: 1,
      sessions: [{
        rooms: [{
          id: 1,
        }],
      }],
    }, {
      date: '2018-07-01',
      startTime: 12,
      duration: 1,
      sessions: [{
        rooms: [{
          id: 1,
        }],
      }],
    }], [{
      id: 1,
      custom_attributes: [{
        id: 1,
        value: 'Wall Gas',
      }],
    }]), {
      '2018-07-01': [
        0.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
        6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
        13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
      ],
    })
  })
})
