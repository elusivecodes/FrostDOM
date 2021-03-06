/**
 * DOM Attributes
 */

Object.assign(DOM.prototype, {

    /**
     * Get attribute value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [attribute] The attribute name.
     * @returns {string|object} The attribute value, or an object containing attributes.
     */
    getAttribute(nodes, attribute) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        if (attribute) {
            return node.getAttribute(attribute);
        }

        return this.constructor._getAttributes(node, attribute);
    },

    /**
     * Get dataset value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @returns {*} The dataset value, or an object containing the dataset.
     */
    getDataset(nodes, key) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        if (key) {
            key = Core.camelCase(key);

            return this.constructor._parseDataset(node.dataset[key]);
        }

        const dataset = {};

        for (const k in node.dataset) {
            dataset[k] = this.constructor._parseDataset(node.dataset[k]);
        }

        return dataset;
    },

    /**
     * Get the HTML contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The HTML contents.
     */
    getHTML(nodes) {
        return this.getProperty(nodes, 'innerHTML');
    },

    /**
     * Get a property value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty(nodes, property) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return node[property];
    },

    /**
     * Get the text contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The text contents.
     */
    getText(nodes) {
        return this.getProperty(nodes, 'textContent');
    },

    /**
     * Get the value property of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The value.
     */
    getValue(nodes) {
        return this.getProperty(nodes, 'value');
    },

    /**
     * Remove an attribute from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    removeAttribute(nodes, attribute) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            node.removeAttribute(attribute);
        }
    },

    /**
     * Remove a dataset value from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} key The dataset key.
     */
    removeDataset(nodes, key) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            key = Core.camelCase(key);

            delete node.dataset[key];
        }
    },

    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    removeProperty(nodes, property) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            delete node[property];
        }
    },

    /**
     * Set an attribute value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    setAttribute(nodes, attribute, value) {
        nodes = this.parseNodes(nodes);

        const attributes = this.constructor._parseData(attribute, value);

        for (const node of nodes) {
            this.constructor._setAttributes(node, attributes);
        }
    },

    /**
     * Set a dataset value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     */
    setDataset(nodes, key, value) {
        nodes = this.parseNodes(nodes);

        const dataset = this.constructor._parseData(key, value, true);

        for (const node of nodes) {
            this.constructor._setDataset(node, dataset);
        }
    },

    /**
     * Set the HTML contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    setHTML(nodes, html) {
        this.empty(nodes);

        this.setProperty(nodes, 'innerHTML', html);
    },

    /**
     * Set a property value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    setProperty(nodes, property, value) {
        nodes = this.parseNodes(nodes);

        const properties = this.constructor._parseData(property, value);

        for (const node of nodes) {
            for (const property in properties) {
                node[property] = properties[property];
            }
        }
    },

    /**
     * Set the text contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    setText(nodes, text) {
        this.empty(nodes);

        this.setProperty(nodes, 'textContent', text);
    },

    /**
     * Set the value property of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} value The value.
     */
    setValue(nodes, value) {
        this.setProperty(nodes, 'value', value);
    }

});
