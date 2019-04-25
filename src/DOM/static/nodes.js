/**
 * DOM (Static) Nodes
 */

Object.assign(DOM, {

    /**
     * Create a clone of a node.
     * @param {Node} node The input node.
     * @param {Boolean} deep Whether to deep clone the node.
     * @returns {Node} The cloned node.
     */
    _clone(node, deep) {
        return node.cloneNode(deep);
    },

    /**
     * Compare the position of two nodes in the DOM.
     * @param {Node} node The input node.
     * @param {Node} other The other node.
     * @returns {number} -1 if node is before other, 1 if other is before node, otherwise 0.
     */
    _compareNodes(node, other) {
        if (this._isSame(node, other)) {
            return 0;
        }

        const pos = node.compareDocumentPosition(other);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
            pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return -1;
        }

        if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
            pos & Node.DOCUMENT_POSITION_CONTAINS) {
            return 1;
        }

        return 0;
    },

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    _has(node, other) {
        return node.contains(other);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    _hasChildren(node) {
        return !!node.childElementCount;
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    _is(node, selector) {
        return node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    _isConnected(node) {
        return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    _isEqual(node, other) {
        return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    _isSame(node, other) {
        return node.isSameNode(other);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible(node) {
        if (Core.isWindow(node)) {
            return dom.context.visibilityState === 'visible';
        }

        if (Core.isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        return !!node.offsetParent;
    },

    /**
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {HTMLElement} node The input node.
     */
    _normalize(node) {
        node.normalize();
    }

});
