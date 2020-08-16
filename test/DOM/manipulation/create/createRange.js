const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#createRange', function() {

    it('creates a new range', async function() {
        assert.equal(
            await exec(_ =>
                dom.createRange() instanceof Range
            ),
            true
        );
    });

});