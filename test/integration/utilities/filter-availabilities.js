const assert = require('assert')
const {
  filterAvailabilities,
} = require('../../../utilities/filter-availabilities')

describe('#filterAvailabilities', () => {
  it('adds a matching availability to the total availabilities', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [],
        generalInstructors: [1],
      }],
    }])
  })
  it('adds multiple matching availabilities to the total availabilities', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }, {
        '2018-07-02 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
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
  it('adds matching availabilities from multiple instructors to the total availabilities', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
      2: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [],
        generalInstructors: [1, 2],
      }],
    }])
  })
  it('adds matching availabilities from multiple instructors and days to the total availabilities', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }, {
        '2018-07-02 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
      2: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }, {
        '2018-07-02 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [],
        generalInstructors: [1, 2],
      }],
    }, {
      date: '2018-07-02',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [],
        generalInstructors: [1, 2],
      }],
    }])
  })
  it('filters out durations that are too short', () => {
    const filter = {
      duration: 2,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [],
    }])
  })
  it('splits durations that are longer than needed', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 2,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [],
        generalInstructors: [1],
      }, {
        startTime: 1.5,
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
  it('returns nothing if there aren\'t enough instructors', () => {
    const filter = {
      duration: 1,
      instructorCount: 2,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [],
    }])
  })
  it('returns nothing if a required instructor isn\'t available', () => {
    const filter = {
      duration: 1,
      instructors: [2],
      instructorCount: 1,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [],
    }])
  })
  it('adds a required matching availability to the total availabilities', () => {
    const filter = {
      duration: 1,
      instructorCount: 1,
      instructors: [1],
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 1,
        specificInstructors: [1],
        generalInstructors: [],
      }],
    }])
  })
  it('returns a complex set of multi-day matches', () => {
    const filter = {
      duration: 2,
      instructors: [2],
      instructorCount: 2,
    }
    const instructors = {
      1: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 2.5,
        },
      }, {
        '2018-07-03 01:00:00': {
          startTime: 1,
          duration: 2,
        },
      }],
      2: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 3,
        },
      }, {
        '2018-07-03 01:00:00': {
          startTime: 1,
          duration: 2,
        },
      }],
      3: [{
        '2018-07-01 01:00:00': {
          startTime: 1,
          duration: 2,
        },
      }, {
        '2018-07-02 01:00:00': {
          startTime: 1,
          duration: 1,
        },
      }],
    }
    assert.deepEqual(filterAvailabilities(instructors, filter), [{
      date: '2018-07-01',
      availabilities: [{
        startTime: 1,
        duration: 2,
        specificInstructors: [2],
        generalInstructors: [1, 3],
      }, {
        startTime: 1.5,
        duration: 2,
        specificInstructors: [2],
        generalInstructors: [1],
      }],
    }, {
      date: '2018-07-02',
      availabilities: [],
    }, {
      date: '2018-07-03',
      availabilities: [{
        startTime: 1,
        duration: 2,
        specificInstructors: [2],
        generalInstructors: [1],
      }],
    }])
  })
})
