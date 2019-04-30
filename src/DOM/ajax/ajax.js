/**
 * DOM AJAX
 */

Object.assign(DOM.prototype, {

    /**
     * Perform an XHR request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    ajax(options) {
        options = {
            url: window.location,
            headers: {},
            ...DOM.ajaxDefaults,
            ...options
        };

        if (!options.cache) {
            const url = new URL(options.url);
            url.searchParams.append('_', Date.now());
            options.url = url.toString();
        }

        if ('Content-Type' in options.headers && !options.headers['Content-Type']) {
            options.headers['Content-Type'] = options.contentType;
        }

        if (!('X-Requested-With' in options.headers)) {
            options.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;

            xhr.open(options.method, options.url, true);

            for (const key of options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }

            if (options.responseType) {
                xhr.responseType = options.responseType;
            }

            xhr.onload = e => {
                if (xhr.status > 400) {
                    reject({
                        status: xhr.status,
                        xhr: xhr,
                        event: e
                    });
                } else {
                    resolve({
                        response: xhr.response,
                        xhr: xhr,
                        event: e
                    });
                }
            };

            xhr.onerror = e =>
                reject({
                    status: xhr.status,
                    xhr: xhr,
                    event: e
                });

            if (options.uploadProgress) {
                xhr.upload.onprogress = e =>
                    options.uploadProgress(e.loaded / e.total, xhr, e);
            }

            if (options.beforeSend) {
                options.beforeSend(xhr);
            }

            if (options.data && options.processData) {
                if (options.contentType === 'application/json') {
                    options.data = JSON.stringify(options.data);
                } else if (options.contentType === 'application/x-www-form-urlencoded') {
                    options.data = DOM._parseParams(options.data);
                } else {
                    options.data = DOM._parseFormData(options.data);
                }
            }
            xhr.send(options.data);
        });
    },

    /**
     * Perform an XHR GET request.
     * @param {string} url The URL of the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    get(url, options) {
        return this.ajax({
            url,
            ...options
        });
    },

    /**
     * Perform an XHR POST request.
     * @param {string} url The URL of the request.
     * @param {Boolean|string|array|object} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    post(url, data, options) {
        return this.ajax({
            url,
            data,
            method: 'POST',
            ...options
        });
    },

    /**
     * Perform an XHR request for a file upload.
     * @param {string} url The URL of the request.
     * @param {Boolean|string|array|object} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=false] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=false] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    upload(url, data, options) {
        return this.ajax({
            url,
            data,
            method: 'POST',
            contentType: false,
            ...options
        });
    }

});