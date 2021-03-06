/**
 * QuerySet Event Handlers
 */

Object.assign(QuerySet.prototype, {

    /**
     * Add an event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    addEvent(events, callback, useCapture = false) {
        this._dom.addEvent(this, events, callback, useCapture);

        return this;
    },

    /**
     * Add a delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    addEventDelegate(events, delegate, callback, useCapture = false) {
        this._dom.addEventDelegate(this, events, delegate, callback, useCapture);

        return this;
    },

    /**
     * Add a self-destructing delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    addEventDelegateOnce(events, delegate, callback, useCapture = false) {
        this._dom.addEventDelegateOnce(this, events, delegate, callback, useCapture);

        return this;
    },

    /**
     * Add a self-destructing event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    addEventOnce(events, callback, useCapture = false) {
        this._dom.addEventOnce(this, events, callback, useCapture);

        return this;
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    cloneEvents(others) {
        this._dom.cloneEvents(this, others);

        return this;
    },

    /**
     * Remove events from each node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    removeEvent(events, callback, useCapture = null) {
        this._dom.removeEvent(this, events, callback, useCapture);

        return this;
    },

    /**
     * Remove delegated events from each node.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @returns {QuerySet} The QuerySet object.
     */
    removeEventDelegate(events, delegate, callback, useCapture = null) {
        this._dom.removeEventDelegate(this, events, delegate, callback, useCapture);

        return this;
    },

    /**
     * Trigger events on each node.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @returns {QuerySet} The QuerySet object.
     */
    triggerEvent(events, options) {
        this._dom.triggerEvent(this, events, options);

        return this;
    },

    /**
     * Trigger an event for the first node.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    triggerOne(event, options) {
        return this._dom.triggerOne(this, event, options);
    }

});
