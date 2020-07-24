window._csrfToken = undefined

/**
 *
 * @param {String} url
 * @param {Object} data
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

  if (JSON.stringify(data) !== '{}') {
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
    throw response.json()
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
export function getCsrfToken (metaKey = 'csrf-token') {
  if (window._csrfToken === undefined) {
    const csrfTokenElement = document.querySelector(`meta[name="${metaKey}"]`)
    window._csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null
  }
  return window._csrfToken
}

/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
export function jsonPost (endPoint, data = {}, headers = {}, config = {}) {
  config.method = 'POST'
  return jsonFetch(endPoint, data, headers, config)
}

/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
export function jsonPatch (endPoint, data = {}, headers = {}, config = {}) {
  config.method = 'PATCH'
  return jsonFetch(endPoint, data, headers, config)
}

/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
export function jsonPut (endPoint, data = {}, headers = {}, config = {}) {
  config.method = 'PUT'
  return jsonFetch(endPoint, data, headers, config)
}

/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
export function jsonGet (endPoint, data = {}, headers = {}, config = {}) {
  config.method = 'GET'
  return jsonFetch(endPoint, data, headers, config)
}

/**
 *
 * @param {String} endPoint
 * @param {Object} data
 * @param {Object} headers
 * @param {Object} config
 * @returns {Promise<Any>}
 */
export function jsonDelete (endPoint, data = {}, headers = {}, config = {}) {
  config.method = 'DELETE'
  return jsonFetch(endPoint, data, headers, config)
}
