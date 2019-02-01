/* global describe, before, it, cy */
/* eslint prefer-arrow-callback: 0, newline-per-chained-call: 0, func-names: 0 */

function initializeServer() {
  cy.server()

  cy.fixture('purview_room_availabilities').as('purviewRoomAvailabilities')
  cy.fixture('purview_rooms').as('purviewRooms')

  cy.route(/\/purview_room_availabilities/, '@purviewRoomAvailabilities').as('purviewRoomAvailabilitiesRoute')
  cy.route(/\/purview_rooms/, '@purviewRooms').as('purviewRoomsRoute')
}

describe('Room Availability Calendar', function () {
  before(function () {
    initializeServer()
    cy.visit('/components/room-availability')
    cy.wait(['@purviewRoomAvailabilitiesRoute', '@purviewRoomsRoute'])
  })
  describe('Smoke test', function () {
    it('loads the component', function () {
      cy.get('h2').should('have.text', 'Room Availability')
    })
  })
  describe('Listing rooms', function () {
    xit('lists rooms', function () {
      cy.get('.rooms-list option').should('have.length', 2)
    })
    xit('allows the user to select a room', function () {
    })
  })
  describe('Showing availability', function () {
    it('shows 4 availabilities total')
    describe('9/13', function () {
      it('shows 3 availabilities on 9/13')
      it('shows an hour availability from 6-7am for room 50')
      it('shows an hour availability from 9-10am for room 50')
      it('shows a 2 hour availability from 5-7am for room 51')
    })
    describe('9/14', function () {
      it('shows 1 availability on 9/14')
      it('shows an hour availability from 6-7am for room 50')
    })
  })
})
