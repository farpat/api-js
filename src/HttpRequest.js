/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
const fetch = async function (endPoint, data, headers, config) {
  config.credentials = 'same-origin'
  config.headers = {
    ...headers,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type'    : 'application/json',
    'Accept'          : 'application/json'
  }

  const token = HttpRequest.getCsrfToken()
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token
  }

  if (JSON.stringify(data) !== '{}') {
    if (config.method === 'GET' || config.method === 'DELETE') {
      endPoint += '?' + buildQueryString(data)
    } else {
      config.body = JSON.stringify(data)
    }
  }

  const url = this.baseUrl + (endPoint.slice(0, 1) === '/' ? endPoint.slice(1) : endPoint)
  const response = await window.fetch(url, config)

  if (response.ok) {
    return response.json()
  } else {
    throw response.json()
  }
}

/**
 *
 * @param {Object} data
 * @returns {string}
 */
const buildQueryString = function (data) {
  const searchParameters = new URLSearchParams()

  Object.keys(data).forEach(function (parameterName) {
    searchParameters.append(parameterName, data[parameterName])
  })

  return searchParameters.toString()
}

export default class HttpRequest {
  constructor (baseUrl) {
    if (baseUrl !== '') {
      this.baseUrl = baseUrl + (baseUrl.slice(-1) === '/' ? '' : '/')
    } else {
      this.baseUrl = ''
    }
  }

  /**
   *
   * @param baseUrl
   * @returns {HttpRequest}
   */
  static new (baseUrl = '') {
    return new HttpRequest(baseUrl)
  }

  /**
   * @param {String} metaKey
   * @returns {String|null}
   */
  static getCsrfToken (metaKey = 'csrf-token') {
    if (HttpRequest.csrfToken === undefined) {
      const csrfTokenElement = document.querySelector(`meta[name="${metaKey}"]`)
      HttpRequest.csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null
    }
    return HttpRequest.csrfToken
  }

  /**
   *
   * @param {String} endPoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Object} config
   * @returns {Promise<Any>}
   */
  post (endPoint, data = {}, headers = {}, config = {}) {
    config.method = 'POST'
    return fetch.call(this, endPoint, data, headers, config)
  }

  /**
   *
   * @param {String} endPoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Object} config
   * @returns {Promise<Any>}
   */
  patch (endPoint, data = {}, headers = {}, config = {}) {
    config.method = 'PATCH'
    return fetch.call(this, endPoint, data, headers, config)
  }

  /**
   *
   * @param {String} endPoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Object} config
   * @returns {Promise<Any>}
   */
  put (endPoint, data = {}, headers = {}, config = {}) {
    config.method = 'PUT'
    return fetch.call(this, endPoint, data, headers, config)
  }

  /**
   *
   * @param {String} endPoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Object} config
   * @returns {Promise<Any>}
   */
  get (endPoint, data = {}, headers = {}, config = {}) {
    config.method = 'GET'
    return fetch.call(this, endPoint, data, headers, config)
  }

  /**
   *
   * @param {String} endPoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Object} config
   * @returns {Promise<Any>}
   */
  delete (endPoint, data = {}, headers = {}, config = {}) {
    config.method = 'DELETE'
    return fetch.call(this, endPoint, data, headers, config)
  }
}
