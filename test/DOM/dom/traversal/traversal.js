const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Traversal', function() {

    describe('#child', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1" class="parent">' +
                    '<div id="child1">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span></span>' +
                    '</div>' +
                    '<span id="child3">' +
                    '<span></span>' +
                    '</span>' +
                    '<span id="child4">' +
                    '<span></span>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2" class="parent">' +
                    '<div id="child5">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="child6">' +
                    '<span></span>' +
                    '</div>' +
                    '<span id="child7">' +
                    '<span></span>' +
                    '</span>' +
                    '<span id="child8">' +
                    '<span></span>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns the first child of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        '.parent'
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child5'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        '.parent',
                        node => node.tagName === 'SPAN'
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child7'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        '.parent',
                        'span'
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child7'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        document.getElementById('parent1'),
                        document.getElementById('child3')
                    ).map(node => node.id);
                }),
                [
                    'child3'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        document.body.children,
                        document.getElementById('parent1').children
                    ).map(node => node.id);
                }),
                [
                    'child1'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        document.querySelectorAll('.parent'),
                        document.querySelectorAll('span')
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child7'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.child(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.getElementById('child3'),
                            document.getElementById('child4'),
                            document.getElementById('child7'),
                            document.getElementById('child8')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child7'
                ]
            );
        });

    });

    describe('#children', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1" class="parent">' +
                    '<div id="child1">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span></span>' +
                    '</div>' +
                    '<span id="child3">' +
                    '<span></span>' +
                    '</span>' +
                    '<span id="child4">' +
                    '<span></span>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2" class="parent">' +
                    '<div id="child5">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="child6">' +
                    '<span></span>' +
                    '</div>' +
                    '<span id="child7">' +
                    '<span></span>' +
                    '</span>' +
                    '<span id="child8">' +
                    '<span></span>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns the all children of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        '.parent'
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2',
                    'child3',
                    'child4',
                    'child5',
                    'child6',
                    'child7',
                    'child8'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        '.parent',
                        node => node.tagName === 'SPAN'
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child4',
                    'child7',
                    'child8'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        '.parent',
                        'span'
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child4',
                    'child7',
                    'child8'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        document.getElementById('parent1'),
                        document.getElementById('child3')
                    ).map(node => node.id);
                }),
                [
                    'child3'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        document.body.children,
                        document.getElementById('parent1').children
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2',
                    'child3',
                    'child4'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        document.querySelectorAll('.parent'),
                        document.querySelectorAll('span')
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child4',
                    'child7',
                    'child8'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.children(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.getElementById('child3'),
                            document.getElementById('child4'),
                            document.getElementById('child7'),
                            document.getElementById('child8')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'child3',
                    'child4',
                    'child7',
                    'child8'
                ]
            );
        });

    });

    describe('#closest', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child2">' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('returns the closest ancestor of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        'a',
                        node => node.tagName === 'DIV'
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        'a',
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        document.getElementById('a1'),
                        document.getElementById('child1')
                    ).map(node => node.id);
                }),
                [
                    'child1'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        document.getElementById('child1').children,
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'parent1'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.closest(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ],
                        [
                            document.getElementById('child1'),
                            document.getElementById('child2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'child1',
                    'child2'
                ]
            );
        });

        // limit

    });

    describe('#commonAncestor', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent">' +
                    '<div id="child">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('returns the closest common ancestor of all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.commonAncestor(
                        'a'
                    ).id;
                }),
                'child'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.commonAncestor(
                        document.getElementById('a1')
                    ).id;
                }),
                'span1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.commonAncestor(
                        document.getElementById('span1').children
                    ).id;
                }),
                'span1'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.commonAncestor(
                        document.querySelectorAll('a')
                    ).id;
                }),
                'child'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.commonAncestor(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ]
                    ).id;
                }),
                'child'
            );
        });

    });

    describe('#contents', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1" class="parent">' +
                    'Test 1' +
                    '<div id="child1"></div>' +
                    'Test 2' +
                    '</div>' +
                    '<div id="parent2" class="parent">' +
                    'Test 3' +
                    '<div id="child2"></div>' +
                    'Test 4' +
                    '</div>';
            });
        });

        it('returns all children of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.contents(
                        '.parent'
                    ).map(node => node.textContent);
                }),
                [
                    'Test 1',
                    '',
                    'Test 2',
                    'Test 3',
                    '',
                    'Test 4'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.contents(
                        document.getElementById('parent1')
                    ).map(node => node.textContent);
                }),
                [
                    'Test 1',
                    '',
                    'Test 2'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.contents(
                        document.body.children
                    ).map(node => node.textContent);
                }),
                [
                    'Test 1',
                    '',
                    'Test 2',
                    'Test 3',
                    '',
                    'Test 4'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.contents(
                        document.querySelectorAll('.parent')
                    ).map(node => node.textContent);
                }),
                [
                    'Test 1',
                    '',
                    'Test 2',
                    'Test 3',
                    '',
                    'Test 4'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.contents(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    ).map(node => node.textContent);
                }),
                [
                    'Test 1',
                    '',
                    'Test 2',
                    'Test 3',
                    '',
                    'Test 4'
                ]
            );
        });

    });

    describe('#fragment', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<template id="template1">' +
                    'Test 1' +
                    '</template>' +
                    '<template id="template2">' +
                    'Test 2' +
                    '</template>';
            });
        });

        it('returns the document fragment of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.fragment(
                        'template'
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.fragment(
                        document.getElementById('template2')
                    ).textContent;
                }),
                'Test 2'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.fragment(
                        document.body.children
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.fragment(
                        document.querySelectorAll('template')
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.fragment(
                        [
                            document.getElementById('template1'),
                            document.getElementById('template2')
                        ]
                    ).textContent;
                }),
                'Test 1'
            );
        });

    });

    describe('#next', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent">' +
                    '<span id="span1">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span2" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span3">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span4">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span id="span5">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span6" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span7">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span8">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns the next sibling of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        '.span'
                    ).map(node => node.id);
                }),
                [
                    'span3',
                    'span7'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        '.span',
                        node => node.id === 'span7'
                    ).map(node => node.id);
                }),
                [
                    'span7'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        '.span',
                        '#span7'
                    ).map(node => node.id);
                }),
                [
                    'span7'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        document.getElementById('span6'),
                        document.getElementById('span7')
                    ).map(node => node.id);
                }),
                [
                    'span7'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const children = document.getElementById('parent2').children;
                    return dom.next(
                        children,
                        children
                    ).map(node => node.id);
                }),
                [
                    'span6',
                    'span7',
                    'span8'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        document.querySelectorAll('.span'),
                        document.querySelectorAll('#span7')
                    ).map(node => node.id);
                }),
                [
                    'span7'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.next(
                        [
                            document.getElementById('span2'),
                            document.getElementById('span6')
                        ],
                        [
                            document.getElementById('span3'),
                            document.getElementById('span7')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span3',
                    'span7'
                ]
            );
        });

    });

    describe('#nextAll', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span id="span1">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span2" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span3">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span4">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span id="span5">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span6" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span7">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span8">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns all next siblings of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        '.span'
                    ).map(node => node.id);
                }),
                [
                    'span3',
                    'span4',
                    'span7',
                    'span8'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        '.span',
                        node => node.id === 'span8'
                    ).map(node => node.id);
                }),
                [
                    'span8'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        '.span',
                        '#span4, #span8'
                    ).map(node => node.id);
                }),
                [
                    'span4',
                    'span8'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        document.getElementById('span2'),
                        document.getElementById('span4')
                    ).map(node => node.id);
                }),
                [
                    'span4'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const children = document.getElementById('parent2').children;
                    return dom.nextAll(
                        children,
                        children
                    ).map(node => node.id);
                }),
                [
                    'span6',
                    'span7',
                    'span8'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        document.querySelectorAll('.span'),
                        document.querySelectorAll('#span4, #span8')
                    ).map(node => node.id);
                }),
                [
                    'span4',
                    'span8'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.nextAll(
                        [
                            document.getElementById('span2'),
                            document.getElementById('span6')
                        ],
                        [
                            document.getElementById('span4'),
                            document.getElementById('span8')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span4',
                    'span8'
                ]
            );
        });

        // limit

    });

    describe('#offsetParent', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1" style="position: relative;">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child2" style="position: relative;">' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('returns the offset parent of the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.offsetParent(
                        'a'
                    ).id;
                }),
                'child1'
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.offsetParent(
                        document.getElementById('a1')
                    ).id;
                }),
                'child1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.offsetParent(
                        document.getElementById('span1').children
                    ).id;
                }),
                'child1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.offsetParent(
                        document.querySelectorAll('a')
                    ).id;
                }),
                'child1'
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.offsetParent(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ]
                    ).id;
                }),
                'child1'
            );
        });

    });

    describe('#parent', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child2">' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('returns the parents of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        'a',
                        node => node.id === 'span2'
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        'a',
                        '#span2'
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        document.getElementById('a2'),
                        document.getElementById('span2')
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        document.getElementById('span2').children,
                        document.getElementById('child2').children
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('#span2')
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parent(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ],
                        [
                            document.getElementById('span2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span2'
                ]
            );
        });

    });

    describe('#parents', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child2">' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('returns the parents of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'html',
                    'body',
                    'parent1',
                    'child1',
                    'span1',
                    'parent2',
                    'child2',
                    'span2'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        'a',
                        node => node.tagName === 'DIV'
                    ).map(node => node.id);
                }),
                [
                    'parent1',
                    'child1',
                    'parent2',
                    'child2'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        'a',
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'parent1',
                    'child1',
                    'parent2',
                    'child2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        document.getElementById('a1'),
                        document.getElementById('child1')
                    ).map(node => node.id);
                }),
                [
                    'child1'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        document.getElementById('child1').children,
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'parent1'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'parent1',
                    'child1',
                    'parent2',
                    'child2'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.parents(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ],
                        [
                            document.getElementById('parent1'),
                            document.getElementById('child1'),
                            document.getElementById('parent2'),
                            document.getElementById('child2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'parent1',
                    'child1',
                    'parent2',
                    'child2'
                ]
            );
        });

        // limit

    });

    describe('#prev', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent">' +
                    '<span id="span1">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span2">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span3" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span4">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span id="span5">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span6">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span7" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span8">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns the previous sibling of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        '.span'
                    ).map(node => node.id);
                }),
                [
                    'span2',
                    'span6'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        '.span',
                        node => node.id === 'span6'
                    ).map(node => node.id);
                }),
                [
                    'span6'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        '.span',
                        '#span6'
                    ).map(node => node.id);
                }),
                [
                    'span6'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        document.getElementById('span7'),
                        document.getElementById('span6')
                    ).map(node => node.id);
                }),
                [
                    'span6'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const children = document.getElementById('parent2').children;
                    return dom.prev(
                        children,
                        children
                    ).map(node => node.id);
                }),
                [
                    'span5',
                    'span6',
                    'span7'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        document.querySelectorAll('.span'),
                        document.querySelectorAll('#span6')
                    ).map(node => node.id);
                }),
                [
                    'span6'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prev(
                        [
                            document.getElementById('span3'),
                            document.getElementById('span7')
                        ],
                        [
                            document.getElementById('span2'),
                            document.getElementById('span6')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span2',
                    'span6'
                ]
            );
        });

    });

    describe('#prevAll', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span id="span1">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span2">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span3" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span4">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span id="span5">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span6">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span7" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span8">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns all previous siblings of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        '.span'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span5',
                    'span6'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        '.span',
                        node => node.id === 'span5'
                    ).map(node => node.id);
                }),
                [
                    'span5'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        '.span',
                        '#span1, #span5'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span5'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        document.getElementById('span3'),
                        document.getElementById('span1')
                    ).map(node => node.id);
                }),
                [
                    'span1'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const children = document.getElementById('parent2').children;
                    return dom.prevAll(
                        children,
                        children
                    ).map(node => node.id);
                }),
                [
                    'span5',
                    'span6',
                    'span7'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        document.querySelectorAll('.span'),
                        document.querySelectorAll('#span1, #span5')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span5'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.prevAll(
                        [
                            document.getElementById('span3'),
                            document.getElementById('span7')
                        ],
                        [
                            document.getElementById('span1'),
                            document.getElementById('span5')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span5'
                ]
            );
        });

        // limit

    });

    describe('#shadow', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>';
                const shadow1 = document.getElementById('div1').attachShadow({ mode: 'open' });
                const shadow2 = document.getElementById('div2').attachShadow({ mode: 'closed' });
                const text1 = document.createTextNode('Test 1');
                const text2 = document.createTextNode('Test 2');
                shadow1.appendChild(text1);
                shadow2.appendChild(text2);
            });
        });

        it('returns the shadow root of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        'div'
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('returns null for closed shadow roots', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        '#div2'
                    );
                }),
                null
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        document.getElementById('div1')
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        document.body.children
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        document.querySelectorAll('div')
                    ).textContent;
                }),
                'Test 1'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.shadow(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2')
                        ]
                    ).textContent;
                }),
                'Test 1'
            );
        });

    });

    describe('#siblings', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span id="span1">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span2">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span3" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span4">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span5">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span id="span6">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span7">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span8" class="span">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span9">' +
                    '<a></a>' +
                    '</span>' +
                    '<span id="span10">' +
                    '<a></a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('returns all siblings of each node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        '.span'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span4',
                    'span5',
                    'span6',
                    'span7',
                    'span9',
                    'span10'
                ]
            );
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        '.span',
                        node => node.id === 'span5'
                    ).map(node => node.id);
                }),
                [
                    'span5'
                ]
            );
        });

        it('works with query selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        '.span',
                        '#span1, #span10'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span10'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        document.getElementById('span3'),
                        document.getElementById('span1')
                    ).map(node => node.id);
                }),
                [
                    'span1'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const children = document.getElementById('parent2').children;
                    return dom.siblings(
                        children,
                        children
                    ).map(node => node.id);
                }),
                [
                    'span6',
                    'span7',
                    'span8',
                    'span9',
                    'span10'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        document.querySelectorAll('.span'),
                        document.querySelectorAll('#span1, #span10')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span10'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.siblings(
                        [
                            document.getElementById('span3'),
                            document.getElementById('span8')
                        ],
                        [
                            document.getElementById('span1'),
                            document.getElementById('span10')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span10'
                ]
            );
        });

    });

});