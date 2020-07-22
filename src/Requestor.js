import Http from './Http'

export default class Requestor {
  /**
   * @param baseUrl
   * @returns {Http}
   */
  static newRequest (baseUrl = '') {
    return new Http(baseUrl)
  }

  /**
   * @returns {String|null}
   */
  static getCsrfToken () {
    if (Requestor.csrfToken === undefined) {
      const csrfTokenElement = document.querySelector('meta[name="csrf-token"]')
      Requestor.csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : null
    }
    return Requestor.csrfToken
  }
}
