import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities.json'
import instructors from '../test/e2e/fixtures/purview_users.json'
import equipment from '../test/e2e/fixtures/purview_equipment.json'
import availabilities from '../test/e2e/fixtures/availabilities.json'
import rooms from '../test/e2e/fixtures/purview_rooms.json'
import scenarios from '../test/e2e/fixtures/purview_scenarios.json'
import departments from '../test/e2e/fixtures/purview_departments.json'
import events from '../test/e2e/fixtures/clinic_events.json'

export default function mockHttpResponses(axios){
  axios.interceptors.request.use(config => {
    config.url = `http://localhost:0/${config.url}`
    return config
  })
  axios.interceptors.response.use(response => {}, error => {
    let data
    switch(true) {
      case /\/purview_users/.test(error.config.url): {
        data = instructors
        break
      }
      case /\/purview_availabilities/.test(error.config.url): {
        data = purviewAvailabilities
        break
      }
      case /\/availabilities/.test(error.config.url): {
        data = availabilities
        break
      }
      case /\/purview_equipment/.test(error.config.url): {
        data = equipment
        break
      }
      case /\/purview_rooms/.test(error.config.url): {
        data = rooms
        break
      }
      case /\/purview_scenarios/.test(error.config.url): {
        data = scenarios
        break
      }
      case /\/purview_departments/.test(error.config.url): {
        data = departments
        break
      }
      case /\/clinic_events/.test(error.config.url): {
        data = events
        break
      }
      case /\/events/.test(error.config.url): {
        data = error.config.data
        break
      }
      case /\/fileUpload/.test(error.config.url): {
        data = {
          location: "https://s3.us-east-2.amazonaws.com/healthscholars-production/calendar/attachments/version-2/1538080951831-test.txt"
        }
        break
      }
    }
    return Promise.resolve({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
    })
  })

  return axios
}
