const assert = require('assert');
const { exec } = require('../../../setup');

describe('#sanitize', function() {

    it('returns a sanitized HTML string', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.sanitize(
                    '<script>' +
                    'window.alert(123);' +
                    '</script>' +
                    '<div class="div">' +
                    '<a href="#" title="Test 1" target="_blank" rel="nofollow" onclick="window.alert(123)">Test</a>' +
                    '</div>'
                )
            ),
            '<div class="div">' +
            '<a href="#" title="Test 1" target="_blank" rel="nofollow">Test</a>' +
            '</div>'
        );
    });

    it('sanitizes a HTML string with allowed tags', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.sanitize(
                    '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                    {
                        div: []
                    }
                )
            ),
            '<div></div>'
        );
    });

    it('sanitizes a HTML string with allowed attributes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.sanitize(
                    '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                    {
                        div: ['class', 'id'],
                        span: []
                    }
                )
            ),
            '<div id="div" class="test">' +
            '<span>Test</span>' +
            '</div>'
        );
    });

    it('sanitizes a HTML string with allowed wildcard attributes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.sanitize(
                    '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                    {
                        '*': ['class', 'id'],
                        div: [],
                        span: []
                    }
                )
            ),
            '<div id="div" class="test">' +
            '<span id="span" class="test">Test</span>' +
            '</div>'
        );
    });

});