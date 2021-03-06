const assert = require('assert');
const { exec } = require('../../../setup');

describe('#hasFragment', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<template id="template1">' +
                'Test 1' +
                '</template>' +
                '<template id="template2">' +
                'Test 2' +
                '</template>' +
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns true if any node has a document fragment', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment('template')
            ),
            true
        );
    });

    it('returns false if no nodes have a document fragment', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment('div')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment(
                    document.getElementById('template1')
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment(
                    document.querySelectorAll('template')
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment(
                    document.body.children
                )
            ),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasFragment([
                    document.getElementById('template1'),
                    document.getElementById('template2'),
                    document.getElementById('div1'),
                    document.getElementById('div2')
                ])
            ),
            true
        );
    });

});