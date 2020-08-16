const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#withProperty', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').test = 'Test 1';
            document.getElementById('div3').test = 'Test 2';
        });
    });

    it('returns nodes with a specified property', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withProperty('div', 'test')
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withProperty(
                    document.getElementById('div1'),
                    'test'
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withProperty(
                    document.querySelectorAll('div'),
                    'test'
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withProperty(
                    document.body.children,
                    'test'
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withProperty([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], 'test').map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

});