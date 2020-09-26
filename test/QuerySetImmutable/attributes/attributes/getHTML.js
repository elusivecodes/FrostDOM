const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getHTML', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the HTML contents of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .getHTML()
            ),
            '<span>Test</span>'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .getHTML()
            ),
            undefined
        );
    });

});