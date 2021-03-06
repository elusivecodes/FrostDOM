const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getText', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the text contents of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .getText()
            ),
            'Test'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#invalid')
                    .getText()
            ),
            undefined
        );
    });

});