/* global describe, before, it, cy */
/* eslint prefer-arrow-callback: 0, newline-per-chained-call: 0, func-names: 0 */

function initializeServer(){
  cy.server()

  cy.fixture('purview_users').as('purviewUsers')
  cy.fixture('purview_availabilities').as('purviewAvailabilities')
  cy.fixture('availabilities').as('availabilities')

  cy.route(/\/purview_users/, '@purviewUsers').as('purviewUsersRoute')
  cy.route(/\/purview_availabilities/, '@purviewAvailabilities').as('purviewAvailabilitiesRoute')
  cy.route(/\/availabilities/, '@availabilities').as('availabilitiesRoute')
}

describe('Calendar', function () {
  before(function () {
    initializeServer()
    cy.visit('/components/calendar')
    cy.wait(['@purviewUsersRoute', '@purviewAvailabilitiesRoute', '@availabilitiesRoute'])
  })
  describe('My Availability', function () {
    it('loads the component', function () {
      cy.get('h2').should('have.text', 'Calendar')
    })
    describe('grid', function () {
      it('shows the hour grid', function () {
        cy.get('.is-today').as('today').find('.sim-timelines').should('not.exist')
        cy.get('@today').find('.sim-calendar--grid--tools svg').click({ force: true })
        cy.get('@today').find('.sim-timelines').should('exist')
      })
      it('adds a block from 6am to 7am', function () {
        cy.get('.sim-calendar--grid').as('grid').find('.sim-timeblock').should('have.length', 1)
        cy.get('@grid').find('.is-hour-6').click()
        cy.get('@grid').find('.sim-timeblock').as('timeblock').should('have.length', 2)
        cy.get('@timeblock').find('.sim-timeblock--info--hours').contains('1 hour')
      })
      it('expands the block from 1 hour to 4 hours by adjusting the end time', function () {
        cy.get('.sim-calendar--grid').as('grid')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('1 hour')
        cy.get('@grid').find('.sim-timeblock > .sim-timeblock--handle--down').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 45 })
          .trigger('mouseup')
        cy.get('@hours').contains('4 hours')
      })
      it('contracts the block from 4 hours to 2 hours by adjusting the end time', function () {
        cy.get('.sim-calendar--grid').as('grid')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('4 hours')
        cy.get('@grid').find('.sim-timeblock > .sim-timeblock--handle--down').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: -10 })
          .trigger('mouseup')
        cy.get('@hours').contains('2 hours')
      })
      it('moves a block from a 6am start to a 1pm start', function () {
        cy.get('.sim-calendar--grid').as('grid').find('.sim-timeblock').eq(1).should('have.attr', 'style', '--start:6; --duration:2;')
        cy.get('@grid').find('.sim-timeblock--mover').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 105 })
          .trigger('mouseup')
        cy.get('@grid').find('.sim-timeblock--info--hours').eq(1).contains('2 hours')
        cy.get('.sim-calendar--grid').find('.sim-timeblock').eq(1).should('have.attr', 'style', '--start:13; --duration:2;')
      })
      it('expands the block from 2 hours to 4 hours by adjusting the start time', function () {
        cy.get('.sim-calendar--grid').as('grid')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('2 hours')
        cy.get('@grid').find('.sim-timeblock > .sim-timeblock--handle--up').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 25 })
          .trigger('mouseup')
        cy.get('@hours').contains('4 hours')
      })
      it('contracts the block from 4 hours to 2 hours by adjusting the start time', function () {
        cy.get('.sim-calendar--grid').as('grid')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('4 hours')
        cy.get('@grid').find('.sim-timeblock > .sim-timeblock--handle--up').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 50 })
          .trigger('mouseup')
        cy.get('@hours').contains('2 hours')
      })
      it('removes a block through the handle', function () {
        cy.get('.sim-calendar--grid').as('grid').find('.sim-timeblock').eq(1).as('timeblock').should('exist')
        cy.get('@timeblock').find('.sim-timeblock--remover').click()
        cy.get('@grid').find('.sim-timeblock').should('have.length', 1)
      })
      it('collapses the view', function () {
        cy.get('.is-today').as('today').find('.sim-timelines').should('exist')
        cy.get('@today').find('.sim-calendar--grid--tools svg').click({ force: true })
        cy.get('@today').find('.sim-timelines').should('not.exist')
      })
    })
    describe('day-control panel', function () {
      it('adds a block from 6am to 7am', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel').find('.sim-timeblock').should('have.length', 1)
        cy.get('@day-control-panel').find('.is-hour-6').click()
        cy.get('@day-control-panel').find('.sim-timeblock').as('timeblock').should('have.length', 2)
        cy.get('@day-control-panel').find('.sim-timeblock--info--hours').contains('1 hour')
      })
      it('expands the block from 1 hour to 4 by adjusting the end time', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('1 hour')
        cy.get('@day-control-panel').as('day-control-panel').find('.sim-timeblock > .sim-timeblock--handle--down').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 75 })
          .trigger('mouseup')
        cy.get('@hours').contains('4 hours')
      })
      it('contracts the block from 4 hours to 2 by adjusting the end time', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock--info--hours').as('hours').eq(1).contains('4 hours')
        cy.get('@day-control-panel').find('.sim-timeblock > .sim-timeblock--handle--down').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 40 })
          .trigger('mouseup')
        cy.get('@hours').contains('2 hours')
      })
      it('moves a block from a 6am start to a 1pm start', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock').eq(1).should('have.attr', 'style', '--start:6; --duration:2;')
        cy.get('@day-control-panel').find('.sim-timeblock--mover').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 135 })
          .trigger('mouseup')
        cy.get('@day-control-panel').find('.sim-timeblock--info--hours').eq(1).contains('2 hours')
        cy.get('@day-control-panel').find('.sim-timeblock').eq(1).should('have.attr', 'style', '--start:13; --duration:2;')
      })
      it('expands the block from 2 hours to 4 by adjusting the start time', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('2 hours')
        cy.get('@day-control-panel').find('.sim-timeblock > .sim-timeblock--handle--up').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 85 })
          .trigger('mouseup')
        cy.get('@hours').contains('4 hours')
      })
      it('contracts the block from 4 hours to 2 by adjusting the start time', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock--info--hours').eq(1).as('hours').contains('4 hours')
        cy.get('@day-control-panel').find('.sim-timeblock > .sim-timeblock--handle--up').eq(1)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 115 })
          .trigger('mouseup')
        cy.get('@hours').contains('2 hours')
      })
      it('removes a block through the handle', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock').eq(1).as('timeblock').should('exist')
        cy.get('@timeblock').find('.sim-timeblock--remover').click()
        cy.get('@day-control-panel').find('.sim-timeblock').should('have.length', '1')
      })
      it('removes a block through the top nav', function () {
        cy.get('.sim-calendar--day-control-panel').as('day-control-panel')
          .find('.sim-timeblock').should('have.length', 1)
        cy.get('@day-control-panel').find('.is-hour-6').click()
        cy.get('@day-control-panel').find('.sim-timeblock').eq(1).should('exist')
        cy.get('@day-control-panel').find('.sim-timepicker--display-date').as('display-date').contains('3 hours')
        cy.get('@display-date').find('.sim-timepicker--remove-blocks').click()
        cy.get('@day-control-panel').find('.sim-timeblock').should('not.exist')
      })
    })
    describe('navigation', function () {
      describe('month', function () {
        it('navigates backward', function () {
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
          cy.get('.load-previous-month').click()
          cy.get('.sim-timepicker--display-date').contains('Wednesday, Jun 13')
        })
        it('navigates forward', function () {
          cy.get('.sim-timepicker--display-date').contains('Wednesday, Jun 13')
          cy.get('.load-next-month').click()
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
        })
      })
      describe('day', function () {
        it('navigates backward', function () {
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
          cy.get('.load-previous-day').click()
          cy.get('.sim-timepicker--display-date').contains('Thursday, Jul 12')
        })
        it('navigates to today', function () {
          cy.get('.sim-timepicker--display-date').contains('Thursday, Jul 12')
          cy.get('.load-today').click()
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
        })
        it('navigates forward', function () {
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
          cy.get('.load-next-day').click()
          cy.get('.sim-timepicker--display-date').contains('Saturday, Jul 14')
        })
      })
      describe('control panel', function () {
        it('navigates backward', function () {
          cy.get('.sim-timepicker--display-date').contains('Saturday, Jul 14')
          cy.get('.sim-timepicker--prev-day').click()
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
        })
        it('navigates forward', function () {
          cy.get('.sim-timepicker--display-date').contains('Friday, Jul 13')
          cy.get('.sim-timepicker--next-day').click()
          cy.get('.sim-timepicker--display-date').contains('Saturday, Jul 14')
        })
      })
    })
  })
  describe('Filter Availabilities', function () {
    before(() => {
      cy.get('.sim-calendar--filters').should('not.be.visible')
      cy.get('.sim-switch input').click()
      cy.get('.sim-calendar--filters').should('be.visible')
    })
    describe('duration filter', function () {
      it('changes the duration from 1 hour to 2 hours', function () {
        cy.get('.sim-calendar--filters').as('filters')
          .find('.sim-timeblock--info--hours').as('hours').contains('1 hour')
        cy.get('@filters').find('.sim-timeblock > .sim-timeblock--handle--down')
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: 55 })
          .trigger('mouseup')
        cy.get('@hours').contains('2 hours')
      })
      it('changes the duration from 2 hours to 1.5 hours', function () {
        cy.get('.sim-calendar--filters').as('filters')
          .find('.sim-timeblock--info--hours').as('hours').contains('2 hours')
        cy.get('@filters').find('.sim-timeblock > .sim-timeblock--handle--down')
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientY: -20 })
          .trigger('mouseup')
        cy.get('@hours').contains('1½ hours')
      })
    })
    describe('instructor filter', function () {
      it('adds a specific instructor', function () {
        cy.get('.sim-datalist > ul').as('instructors-list')
          .find('li').as('instructors').should('have.length', 2)
        cy.get('@instructors-list')
          .find('[placeholder="Any Available Instructor"]').as('instructor-entry').type('Carr{enter}{enter}')
        cy.get('@instructors').should('have.length', 2)
        cy.get('@instructor-entry').should('have.value', 'Dowd, Carrie')
      })
      it('adds an available instructor', function () {
        cy.get('.sim-datalist > ul').as('instructors-list')
          .find('li').as('instructors').should('have.length', 3)
        cy.get('@instructors-list')
          .find('.control--add-item').click()
        cy.get('@instructors-list').find('li').should('have.length', 4)
        cy.get('@instructors-list').find('li').eq(2)
          .find('input').should('have.attr', 'placeholder', 'Any Available Instructor')
      })
      it('removes an available instructor', function () {
        cy.get('.sim-datalist > ul').as('instructors-list')
          .find('li').as('instructors').should('have.length', 4)
        cy.get('@instructors-list')
          .find('.control--add-item').click()
        cy.get('@instructors-list').find('li').should('have.length', 5)
        cy.get('@instructors-list').find('li').eq(3)
          .find('input').should('have.attr', 'placeholder', 'Any Available Instructor')

        cy.get('@instructors-list').find('li').eq(3)
          .find('.sim-autofinder--remove-item').click()
        cy.get('@instructors-list').find('li').should('have.length', 4)
      })
    })
  })
  describe('Events', function () {
    before(() => {
      initializeServer()
      cy.visit('/components/calendar')
      cy.wait(['@purviewUsersRoute', '@purviewAvailabilitiesRoute', '@availabilitiesRoute'])

      cy.get('.sim-calendar--filters').should('not.be.visible')
      cy.get('.sim-switch input').click()
      cy.get('.sim-calendar--filters').should('be.visible')

      cy.get('.sim-datalist > ul').as('instructors-list')
        .find('li [placeholder="Any Available Instructor"]').type('Carr{enter}')
    })
    describe('event scheduling', function () {
      it('expands the day', function () {
        cy.get('.sim-calendar').should('not.have.class', 'is-expanded')
        cy.get('.sim-calendar-day.is-today .sim-calendar--grid--tools > span').click({ force: true })
        cy.get('.sim-calendar').should('have.class', 'is-expanded')
      })
      it('selects a timeslot', function () {
        cy.get('.sim-calendar--grid').as('grid')
          .find('.sim-timeblock[style="--start:6; --duration:1;"]').eq(0).as('6am').click()
        cy.get('.local--day--pending-blocks').find('.sim-timeblock--info--hours').contains('1 hour')
      })
      it('shows the correct instructor options', function () {
        cy.get('.sim-slide--content--section--specific .sim-datalist ul > li').as('specific-instructors').should('have.length', 1)
        cy.get('@specific-instructors').contains('Dowd, Carrie')
        cy.get('.sim-slide--content--section--general').as('general-instructors').find('.sim-datalist ul > li').as('general-instructor').should('have.length', 1)
        cy.get('@general-instructor').contains('Birch, Adam')
        cy.get('@general-instructors').contains('Available Instructors: 1')
      })
      it('chooses one of the available instructors', function () {
        cy.get('.sim-slide--content--section--general .sim-datalist ul > li span').as('general-instructor').should('not.have.class', 'selected')
        cy.get('@general-instructor').find('input').click()
        cy.get('@general-instructor').should('have.class', 'selected')
      })
      // No booking capability right now
      xit('books an event')
    })
  })
})
