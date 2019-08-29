import Http from './Http';

export default class Requestor {
    /**
     * @param baseUrl
     * @returns {Http}
     */
    static newRequest(baseUrl = '') {
        return new Http(baseUrl);
    }

    static getCsrfToken() {
        if (Requestor.csrfToken === undefined) {
            Requestor.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        return Requestor.csrfToken;
    }
}
