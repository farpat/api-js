window._csrfToken = undefined

/**
 *
 * @param {String} url
 * @param {Object|FormData} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
async function jsonFetch (url, data, headers, config) {
  config.credentials = 'same-origin'
  config.headers = {
    ...headers,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type'    : 'application/json',
    'Accept'          : 'application/json'
  }

  const token = getCsrfToken()
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token
  }

  if (data instanceof FormData) {
    config.body = data
    delete config.headers['Content-Type']
  } else if (Object.keys(data).length !== 0) {
    if (config.method === 'GET' || config.method === 'DELETE') {
      url += '?' + buildQueryString(data)
    } else {
      config.body = JSON.stringify(data)
    }
  }

  const response = await window.fetch(url, config)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

/**
 *
 * @param {Object} data
 * @returns {string}
 */
function buildQueryString (data) {
  const searchParameters = new URLSearchParams()

  Object.keys(data).forEach(function (parameterName) {
    searchParameters.append(parameterName, data[parameterName])
  })

  return searchParameters.toString()
}

/**
 * @param {String} metaKey
 * @returns {String|null}
 */
function getCsrfToken (metaKey = 'csrf-token') {
  if (window._csrfToken === undefined) {
    const csrfTokenElement = document.querySelector(`meta[name="${metaKey}"]`)
    window._csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null
  }
  return window._csrfToken
}

/**
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
function jsonPost (url, data = {}, headers = {}, config = {}) {
  config.method = 'POST'
  return jsonFetch(url, data, headers, config)
}

/**
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
function jsonPatch (url, data = {}, headers = {}, config = {}) {
  config.method = 'PATCH'
  return jsonFetch(url, data, headers, config)
}

/**
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
function jsonPut (url, data = {}, headers = {}, config = {}) {
  config.method = 'PUT'
  return jsonFetch(url, data, headers, config)
}

/**
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
function jsonGet (url, data = {}, headers = {}, config = {}) {
  config.method = 'GET'
  return jsonFetch(url, data, headers, config)
}

/**
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
function jsonDelete (url, data = {}, headers = {}, config = {}) {
  config.method = 'DELETE'
  return jsonFetch(url, data, headers, config)
}

export {
  getCsrfToken, jsonPost, jsonPatch, jsonPut, jsonGet, jsonDelete
}
