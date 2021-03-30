const axios = require('axios').default

var apiPath = 'https://unusannusarchive.tk/api'

const unusannusarchive = {
  setAPIPath(path) {
    if (path.endsWith('/')) return apiPath = path.substr(0, path.length-1)
    return apiPath = path
  },

  swift: {
    v1: {
      getallmetadata: () => {
        return axios.get(`${apiPath}swift/v1/getallmetadata`)
      }
    }
  }
}

module.exports = unusannusarchive

export default unusannusarchive