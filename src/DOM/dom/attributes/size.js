/**
 * DOM Size
 */

Object.assign(DOM.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    height(nodes, innerOuter) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.heightWindow(
                node,
                Core.isUndefined(innerOuter) ?
                    0 :
                    innerOuter
            );
        }

        if (Core.isUndefined(innerOuter)) {
            innerOuter = 1;
        }

        if (Core.isDocument(node)) {
            return this.constructor._height(
                DOMNode.documentElement(node),
                innerOuter
            );
        }

        return this.constructor._height(node, innerOuter);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    width(nodes, innerOuter) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.widthWindow(
                node,
                Core.isUndefined(innerOuter) ?
                    0 :
                    innerOuter
            );
        }

        if (Core.isUndefined(innerOuter)) {
            innerOuter = 1;
        }

        if (Core.isDocument(node)) {
            return this.constructor._width(
                DOMNode.documentElement(node),
                innerOuter
            );
        }

        return this.constructor._width(node, innerOuter);
    }

});
