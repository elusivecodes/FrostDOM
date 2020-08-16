const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#isSame', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node is identical to any other node', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame('div', '#div2, #div4')
            ),
            true
        );
    });

    it('returns false if no nodes are identical to any other node', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame('div', 'span')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    document.getElementById('div2'),
                    '#div2, #div4'
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    document.querySelectorAll('div'),
                    '#div2, #div4'
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    document.body.children,
                    '#div2, #div4'
                )
            ),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.isSame(fragment, fragment);
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.isSame(shadow, shadow);
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], '#div2, #div4')
            ),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    'div',
                    document.getElementById('div2')
                )
            ),
            true
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    'div',
                    document.querySelectorAll('#div2, #div4')
                )
            ),
            true
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame(
                    'div',
                    document.body.children
                )
            ),
            true
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.isSame(
                    [
                        document.querySelector('#div1'),
                        fragment,
                    ],
                    fragment
                );
            }),
            true
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.isSame(
                    [
                        document.querySelector('#div1'),
                        shadow,
                    ],
                    shadow
                );
            }),
            true
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isSame('div', [
                    document.querySelector('#div2'),
                    document.querySelector('#div4')
                ])
            ),
            true
        );
    });

});