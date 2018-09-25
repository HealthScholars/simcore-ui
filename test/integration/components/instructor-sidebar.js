/* global describe, beforeEach, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import InstructorSidebar from '../../../components/SidebarInstructor'

describe('InstructorSidebar', () => {
  it('#updateAvailabilities', () => {
    const component = shallowMount(InstructorSidebar)
    assert.ok(component)
  })
})
