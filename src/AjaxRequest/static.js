/**
 * AjaxRequest (Static) Helpers
 */

Object.assign(AjaxRequest, {

    /**
     * Append a query string to a URL.
     * @param {string} url The input URL.
     * @param {string} key The query string key.
     * @param {string} value The query string value.
     * @returns {string} The new URL.
     */
    appendQueryString(url, key, value) {
        const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');
        const urlData = new URL(url, baseHref);
        urlData.searchParams.append(key, value);
        let newUrl = urlData.toString();

        if (newUrl.substring(0, url.length) === url) {
            return newUrl;
        }

        const pos = newUrl.indexOf(url);
        return newUrl.substring(pos);
    },

    /**
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @returns {FormData} The FormData object.
     */
    _parseFormData(data) {
        const values = this._parseValues(data);

        const formData = new FormData;

        for (const [key, value] of values) {
            if (key.substring(key.length - 2) === '[]') {
                formData.append(key, value);
            } else {
                formData.set(key, value);
            }
        }

        return formData;
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams(data) {
        const values = this._parseValues(data);

        const paramString = values
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        return encodeURI(paramString);
    },

    /**
     * Return an attributes array, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} value The input value.
     * @returns {array} The parsed attributes.
     */
    _parseValue(key, value) {
        if (Core.isArray(value)) {
            if (key.substring(key.length - 2) !== '[]') {
                key += '[]';
            }

            const values = [];
            for (const val of value) {
                values.push(
                    ...this._parseValue(key, val)
                );
            }

            return values;
        }

        if (Core.isObject(value)) {
            const values = [];
            for (const subKey in value) {
                values.push(
                    ...this._parseValue(
                        `${key}[${subKey}]`,
                        value[subKey]
                    )
                );
            }

            return values;
        }

        return [[key, value]];
    },

    /**
     * Return an attributes array from a data array or data object.
     * @param {array|object} data The input data.
     * @returns {array} The parsed attributes.
     */
    _parseValues(data) {

        if (Core.isArray(data)) {
            const values = [];

            for (const value of data) {
                values.push(
                    ...this._parseValue(
                        value.name,
                        value.value
                    )
                )
            }

            return values;
        }

        if (Core.isObject(data)) {
            const values = [];

            for (const key in data) {
                values.push(
                    ...this._parseValue(
                        key,
                        data[key]
                    )
                );
            }

            return values;
        }

        return data;
    }

});
