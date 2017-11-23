var test = require('ava');
var fn = require('../dist/index');

test('stringify', function (t) {
	t.is(fn.stringify({
		foo: 'bar'
	}), 'foo=bar');
	t.is(fn.stringify({
		foo: 'bar',
		bar: 'baz'
	}), 'bar=baz&foo=bar');
});

test('different types', function (t) {
	t.is(fn.stringify(), '');
	t.is(fn.stringify(0), '');
});

test('URI encode', t => {
	t.is(fn.stringify({
		'foo bar': 'baz faz'
	}), 'foo%20bar=baz%20faz');
	t.is(fn.stringify({
		'foo bar': 'baz\'faz'
	}), 'foo%20bar=baz%27faz');
});

test('no encoding', function (t) {
	t.is(fn.stringify({
		'foo:bar': 'baz:faz'
	}, {
		encode: false
	}), 'foo:bar=baz:faz');
});

test('handle array value', function (t) {
	t.is(fn.stringify({
		abc: 'abc',
		foo: ['bar', 'baz']
	}), 'abc=abc&foo=bar&foo=baz');
});

test('array order', function (t) {
	t.is(fn.stringify({
		abc: 'abc',
		foo: ['baz', 'bar']
	}), 'abc=abc&foo=baz&foo=bar');
});

test('handle empty array value', function (t) {
	t.is(fn.stringify({
		abc: 'abc',
		foo: []
	}), 'abc=abc');
});

test('should not encode undefined values', function (t) {
	t.is(fn.stringify({
		abc: undefined,
		foo: 'baz'
	}), 'foo=baz');
});

test('should encode null values as just a key', function (t) {
	t.is(fn.stringify({
		'x y z': null,
		'abc': null,
		'foo': 'baz'
	}), 'abc&foo=baz&x%20y%20z');
});

test('handle null values in array', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: [null, 'baz']
	}), 'bar&bar=baz&foo');
});

test('handle undefined values in array', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: [undefined, 'baz']
	}), 'bar=baz&foo');
});

test('handle undefined and null values in array', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: [undefined, null, 'baz']
	}), 'bar&bar=baz&foo');
});

test('strict encoding', function (t) {
	t.is(fn.stringify({
		foo: '\'bar\''
	}), 'foo=%27bar%27');
	t.is(fn.stringify({
		foo: ['\'bar\'', '!baz']
	}), 'foo=%27bar%27&foo=%21baz');
});

test('loose encoding', function (t) {
	t.is(fn.stringify({
		foo: '\'bar\''
	}, {
		strict: false
	}), 'foo=\'bar\'');
	t.is(fn.stringify({
		foo: ['\'bar\'', '!baz']
	}, {
		strict: false
	}), 'foo=\'bar\'&foo=!baz');
});

test('array stringify representation with array indexes', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: ['one', 'two']
	}, {
		arrayFormat: 'index'
	}), 'bar[0]=one&bar[1]=two&foo');
});

test('array stringify representation with array brackets', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: ['one', 'two']
	}, {
		arrayFormat: 'bracket'
	}), 'bar[]=one&bar[]=two&foo');
});

test('array stringify representation with a bad array format', function (t) {
	t.is(fn.stringify({
		foo: null,
		bar: ['one', 'two']
	}, {
		arrayFormat: 'badinput'
	}), 'bar=one&bar=two&foo');
});

test('array stringify representation with array indexes and sparse array', function (t) {
	var a = ['one', 'two'];
	a[10] = 'three';
	t.is(fn.stringify({
		bar: a
	}, {
		arrayFormat: 'index'
	}), 'bar[0]=one&bar[1]=two&bar[2]=three');
});
