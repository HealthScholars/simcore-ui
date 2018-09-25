import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities.json'
import instructors from '../test/e2e/fixtures/purview_users.json'
import equipment from '../test/e2e/fixtures/purview_equipment.json'
import availabilities from '../test/e2e/fixtures/availabilities.json'

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
