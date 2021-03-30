const axios = require('axios').default

var apiPath = 'https://unusannusarchive.tk/api'

function videoIdError(docsurl) {
  return new Error(`Please provide a video id! (example: "s01.e001")\nPlease visit the documentation for more info: ${apiPath}/${docsurl}`)
}

function songIdError(docsurl) {
  return new Error(`Please provide a song id! (example: "01")\nPlease visit the documentation for more info: ${apiPath}/docs?page=${docsurl}`)
}

function genRequest(path, type) {
  return new Promise((resolve, reject) => {
    axios.get(path).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

const api = {
  setAPIPath(path) {
    if (path.endsWith('/')) return apiPath = path.substr(0, path.length-1)
    return apiPath = path
  },

  swift: {
    v1: {
      getallmetadata() {
        return genRequest(`${apiPath}/swift/v1/getallmetadata`)
      }
    }
  },

  v1: {
    getallmetadata() {
      return genRequest(`${apiPath}/v1/getallmetadata`)
    },

    getallsongdata() {
      return genRequest(`${apiPath}/v1/getallsongdata`)
    },

    gets00metadata() {
      return genRequest(`${apiPath}/v1/gets00metadata`)
    },

    gets01metadata() {
      return genRequest(`${apiPath}/v1/gets01metadata`)
    },

    getsongdata(songId) {
      if (!songId) throw songIdError('/api/v1/getsongdata')
      return genRequest(`${apiPath}/v1/getsongdata/${songId}`)
    },

    getvideodata(videoId) {
      if (!videoId) throw videoIdError('/api/v1/getvideodata')
      return genRequest(`${apiPath}/v1/getvideodata/${videoId}`)
    },

    getvidpreviews(videoId) {
      if (!videoId) throw videoIdError('/api/v1/getvidpreviews')
      return genRequest(`${apiPath}/v1/getvidpreviews/${videoId}`)
    }
  },

  v2: {
    metadata: {
      music: {
        all() {
          return genRequest(`${apiPath}/v2/metadata/music/all`)
        },

        song(songId) {
          if (!songId) throw songIdError('/api/v2/metadata/music/song')
          return genRequest(`${apiPath}/v2/metadata/music/song/${songId}`)
        }
      },

      video: {
        season: {
          s00() {
            return genRequest(`${apiPath}/v2/metadata/video/season/s00`)
          },

          s01() {
            return genRequest(`${apiPath}/v2/metadata/video/season/s01`)
          }
        },

        all() {
          return genRequest(`${apiPath}/v2/metadata/video/all`)
        },
        
        episode(videoId) {
          if (!videoId) throw videoIdError('/api/v2/metadata/video/episode')
          return genRequest(`${apiPath}/v2/metadata/video/episode/${videoId}`)
        }
      }
    },

    preview(videoId) {
      if (!videoId) throw videoIdError('/api/v2/preview')
      return genRequest(`${apiPath}/v2/preview/${videoId}`)
    }
  }
}

module.exports = api