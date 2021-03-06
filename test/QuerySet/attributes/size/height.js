const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #height', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey; overflow-y: scroll;">' +
                '<div style="display: block; width: 1px; height: 2500px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .height()
            ),
            1050
        );
    });

    it('returns the content box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.CONTENT_BOX)
            ),
            1000
        );
    });

    it('returns the border box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.BORDER_BOX)
            ),
            1052
        );
    });

    it('returns the margin box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.MARGIN_BOX)
            ),
            1152
        );
    });

    it('returns the scroll box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.SCROLL_BOX)
            ),
            2550
        );
    });

    it('returns the height of the first node (hidden)', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.queryMutable('div')
                    .height();
            }),
            1050
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .height()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable(document)
                    .height()
            ),
            1152
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable(window)
                    .height()
            ),
            600
        );
    });

});