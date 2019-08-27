import Http from './Http';

export default class Requestor {
    constructor() {
        Requestor.csrfToken = '';
    }

    /**
     * @param baseUrl
     * @returns {Http}
     */
    static newRequest(baseUrl = '') {
        return new Http(baseUrl);
    }

    static getCsrfToken() {
        if (Requestor.csrfToken === '') {
            Requestor.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        }

        return Requestor.csrfToken;
    }
}
