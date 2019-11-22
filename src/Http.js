import Requestor from "./Requestor";

export default class Http {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetch(endPoint, data, headers, config) {
        config.credentials = 'same-origin';
        config.headers = {
            ...headers,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        };

        const token = Requestor.getCsrfToken();
        if (token) {
            config.headers['X-CSRF-TOKEN'] = token;
        }

        if (JSON.stringify(data) !== '{}') {
            if (config.method === 'GET' || config.method === 'DELETE') {
                endPoint += '?' + this.buildQueryString(data);
            } else {
                config.body = JSON.stringify(data);
            }
        }

        const url = this.baseUrl + endPoint;
        const response = await window.fetch(url, config);

        if (response.ok) {
            return response.json();
        }
        else {
            throw response.json();
        }
    }

    buildQueryString(data) {
        const searchParameters = new URLSearchParams();

        Object.keys(data).forEach(function (parameterName) {
            searchParameters.append(parameterName, data[parameterName]);
        });

        return searchParameters.toString();
    }

    /**
     * 
     * @param {String} endPoint 
     * @param {Object} data 
     * @param {Object} headers 
     * @param {Object} config 
     * @returns {Promise<Any>}
     */
    post(endPoint, data = {}, headers = {}, config = {}) {
        config.method = 'POST';
        return this.fetch(endPoint, data, headers, config);
    }

    /**
     * 
     * @param {String} endPoint 
     * @param {Object} data 
     * @param {Object} headers 
     * @param {Object} config 
     * @returns {Promise<Any>}
     */
    patch(endPoint, data = {}, headers = {}, config = {}) {
        config.method = 'PATCH';
        return this.fetch(endPoint, data, headers, config);
    }

    /**
     * 
     * @param {String} endPoint 
     * @param {Object} data 
     * @param {Object} headers 
     * @param {Object} config 
     * @returns {Promise<Any>}
     */
    put(endPoint, data = {}, headers = {}, config = {}) {
        config.method = 'PUT';
        return this.fetch(endPoint, data, headers, config);
    }

    /**
     * 
     * @param {String} endPoint 
     * @param {Object} data 
     * @param {Object} headers 
     * @param {Object} config 
     * @returns {Promise<Any>}
     */
    get(endPoint, data = {}, headers = {}, config = {}) {
        config.method = 'GET';
        return this.fetch(endPoint, data, headers, config);
    }

    /**
     * 
     * @param {String} endPoint 
     * @param {Object} data 
     * @param {Object} headers 
     * @param {Object} config 
     * @returns {Promise<Any>}
     */
    delete(endPoint, data = {}, headers = {}, config = {}) {
        config.method = 'DELETE';
        return this.fetch(endPoint, data, headers, config);
    }
}
