const assert = require('assert');
const { exec } = require('../../../setup');

describe('#getData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            dom.setData('#test1', 'test', 'Test 1');
        });
    });

    it('returns an object with all data for the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.getData('div')
            ),
            {
                test: 'Test 1'
            }
        );
    });

    it('returns data for the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData('div', 'test')
            ),
            'Test 1'
        );
    });

    it('returns undefined for an undefined key', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData('div', 'invalid')
            ),
            undefined
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData('#invalid', 'test')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData(
                    document.getElementById('test1'),
                    'test'
                )
            ),
            'Test 1'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData(
                    document.querySelectorAll('div'),
                    'test'
                )
            ),
            'Test 1'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData(
                    document.body.children,
                    'test'
                )
            ),
            'Test 1'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test 2');
                return dom.getData(fragment, 'test');
            }),
            'Test 2'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test 2');
                return dom.getData(shadow, 'test');
            }),
            'Test 2'
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test 2');
                return dom.getData(document, 'test');
            }),
            'Test 2'
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test 2');
                return dom.getData(window, 'test');
            }),
            'Test 2'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getData([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'test')
            ),
            'Test 1'
        );
    });

});