const assert = require('assert');
const { exec } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const fadeOut = progress => {
    const amount = (1 - progress).toFixed(2);
    return parseFloat(amount);
};

const testFadeOut = async selector => {
    const data = await getAnimationStyle(selector, 'opacity');

    const amount = fadeOut(data.progress);
    assert.strictEqual(data.opacity, `${amount}`);
};

describe('#fadeOut', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a fade-out animation to each node', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                debug: true
            });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(150)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-out animation to each node with duration', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                duration: 100,
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-out animation to each node (linear)', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                duration: 100,
                type: 'linear',
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100);
            await testAnimation('#test4', linear, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-out animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                duration: 100,
                type: 'ease-in',
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeIn, 100);
            await testAnimation('#test4', easeIn, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-out animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                duration: 100,
                type: 'ease-out',
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeOut, 100);
            await testAnimation('#test4', easeOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-out animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.fadeOut('.animate', {
                duration: 100,
                type: 'linear',
                infinite: true,
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        });
    });

    it('can be stopped', async function() {
        await exec(async _ => {
            const animation = dom.fadeOut('.animate', {
                duration: 100,
                debug: true
            });
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop();
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('can be stopped (without finishing)', async function() {
        await exec(async _ => {
            const animation = dom.fadeOut('.animate', {
                duration: 100,
                debug: true
            });
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop(false);
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        });
    });

    it('resolves when the animation is stopped', async function() {
        await exec(async _ => {
            const animation = dom.fadeOut('.animate', {
                duration: 100,
                debug: true
            });
            dom.stop();
            await animation;
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('throws when the animation is stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async _ => {
                try {
                    const animation = dom.fadeOut('.animate', {
                        duration: 100,
                        debug: true
                    });
                    animation.stop(false);
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        );
    });

    it('does not stop all animations', async function() {
        await exec(async _ => {
            const animation = dom.fadeOut('.animate', {
                duration: 100
            });
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop();
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        });
    });

    it('resolves when the animation is completed', async function() {
        await exec(async _ => {
            await dom.fadeOut('.animate', {
                duration: 100,
                debug: true
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('throws when all animation are stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async _ => {
                try {
                    const animation = dom.fadeOut('.animate', {
                        duration: 1000,
                        debug: true
                    });
                    dom.stop('.animate', false);
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        await exec(_ => {
            dom.fadeOut(
                document.getElementById('test2'),
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
            await testAnimation('#test2', easeInOut, 100);
            await testFadeOut('#test2');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.fadeOut(
                document.querySelectorAll('.animate'),
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.fadeOut(
                document.body.children,
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testAnimation('#test1', easeInOut, 100);
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test3', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test1');
            await testFadeOut('#test2');
            await testFadeOut('#test3');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.fadeOut([
                document.getElementById('test2'),
                document.getElementById('test4')
            ], {
                duration: 100,
                debug: true
            });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

});