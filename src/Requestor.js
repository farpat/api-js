import HttpRequest from './HttpRequest'

export default class Requestor {
  /**
   * @param baseUrl
   * @returns {HttpRequest}
   */
  static newRequest (baseUrl = '') {
    return new HttpRequest(baseUrl)
  }

  /**
   * @param {String} metaKey
   * @returns {String|null}
   */
  static getCsrfToken (metaKey = 'csrf-token') {
    if (Requestor.csrfToken === undefined) {
      const csrfTokenElement = document.querySelector(`meta[name="${metaKey}"]`)
      Requestor.csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null
    }
    return Requestor.csrfToken
  }
}
