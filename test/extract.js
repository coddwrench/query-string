var test = require('ava');
var fn = require('../dist/index');

test('should extract query string from url', function (t) {
	t.is(fn.extract('http://foo.bar/?abc=def&hij=klm'), 'abc=def&hij=klm');
	t.is(fn.extract('http://foo.bar/?'), '');
	t.is(fn.extract('http://foo.bar/?regex=ab?c'), 'regex=ab?c');
});

test('should handle strings not containing query string', function (t) {
	t.is(fn.extract('http://foo.bar/'), '');
	t.is(fn.extract(''), '');
});

test('should throw for invalid values', function (t) {
	t.throws(fn.extract.bind(fn, null), TypeError);
	t.throws(fn.extract.bind(fn, undefined), TypeError);
});
