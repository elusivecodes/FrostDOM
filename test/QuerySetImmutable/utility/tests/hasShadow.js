const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #hasShadow', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').attachShadow({ mode: 'open' });
            document.getElementById('div3').attachShadow({ mode: 'closed' });
        });
    });

    it('returns true if any node has a shadow root', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .hasShadow()
            ),
            true
        );
    });

    it('returns false if no nodes have a shadow root', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div:not(.test)')
                    .hasShadow()
            ),
            false
        );
    });

    it('returns false for closed shadow roots', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#div3')
                    .hasShadow()
            ),
            false
        );
    });

});