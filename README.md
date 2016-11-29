ikat
==============

object pattern-matching for node.

[![node](http://img.shields.io/badge/node->=_4.0.0-brightgreen.svg)]()
[![Twitter](https://img.shields.io/badge/twitter-@krodmannix-blue.svg?style=flat)](http://twitter.com/krodmannix)

## Motivation
Inspiration initially taken from functional languages that use pattern-matching, primarily [Elixir](http://elixir-lang.org/getting-started/pattern-matching.html). Primary use case is branching based on the qualities of a plain old javascript object. While there is certainly a way to achieve the same behavior with numerous `if`/`else` statements, `switch` cases, and other code that would be messy to maintain or easily understandable to a developer new to the project, pattern-matching seemed to be the obvious way to tackle this particular use case.

### Why not argument pattern matching?
The honest answer is that argument matching is quite hard in JavaScript due to the flexibility of the language. There's no such thing as _really_ overloading functions - sure, you can pass a variable number of arguments to a function no matter what the function definition is, but you can't create multiple function signatures with alternative number of arguments and argument types.

One's first thought might be to use the first `undefined` as an end of input indicator. However, `undefined` might be a valid (and desired) input. Using objects as the primary medium to match against should support most use cases, and with a little tinkering can (hopefully) support all use cases.

## Current Status
Under development & currently experimental.

**Warning**: Syntax is subject to change. Features will be added, and existing capabilities may be altered.

## Usage

- [Introduction](#introduction)
- [Primitives](#primitives)
- [Types](#types)
- [Greater Than](#gt)
- [Greater Than Or Equal](#gte)
- [Less Than](#lt)
- [Less Than Or Equal](#lte)
- [Undefined](#undefined)
- [Not Undefined](#notUndefined)
- [Null](#null)
- [Not Null](#notNull)
- [Default](#default)

### Introduction

`ikat` can generate a function that you can pass an object to, and will execute its associated function and return the function's value. Functions are executed and returned synchronously - if you need async behavior, I suggested returning a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

In addition to associating a function, you can associate a value to be returned as well. It is essentially a convenience method for a function that returns the value. This is shown in the example below.

Patterns will be matched in the order they are passed into the `ikat.build` function - i.e., the first pattern to match will execute the associated function.

Pattern matching is not strict - matching will still occur if additional keys exist on an object. Only the keys defined in the pattern will be checked.

Pattern validators can be passed in as a single value, or if multiple are required, passed in as an Array.

Example:

```javascript
const ikat = require('ikat');

// pattern 1
let pattern1 = {
  a: [Number],
  b: [String],
};

let patternFn1 = object => object.a;

// pattern 2
let pattern2 = {
  a: String,
  b: String,
};

let patternFn2 = object => object.b;

// pattern 3
let pattern3 = {
  a: Number,
  b: [Number],
};

let patternFn3 = 'Some value.';

let patternMatcher = ikat.build(
  [pattern1, patternFn1],
  [pattern2, patternFn2],
  [pattern3, patternFn3],
);

// execution
let data1 = {
  a: 118,
  b: 'hello',
}

let data2 = {
  a: 'foo',
  b: 'bar',
}

let data3 = {
  a: 10,
  b: 100,
}

console.log(patternMatcher(data1)); // 118

console.log(patternMatcher(data2)); // bar

console.log(patternMatcher(data3)); // 'Some value.'
```

### Primitives

Primitive types can be used as validators. Current types supported are:
* `Number`
* `String`
* `Boolean`

```javascript
let pattern = {
  a: Number,
  b: String,
  c: Boolean,
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 1,
  b: 'foobar',
  c: false,
};

patternMatcher(data); // 'it works!'
```

### Types

Primitive types can be used as validators. Current types supported are:
* `Function`
* `Array`
* `Object`
  * Note: This will only match POJO and not Object-inherited types (`Array`s, `Date`s, `Function`s, etc)

```javascript
let pattern = {
  a: Object,
  b: Function,
  c: Array,
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: {
    k: 1,
  },
  b: () => 10,
  c: [1],
};

patternMatcher(data); // 'it works!'
```

### gt

Numbers can be compared to be greater than. `String`s will not be coerced to `Number`s. Use the `ikat.gt(...)` function to add a **greater than** validator.

```javascript
let pattern = {
  a: ikat.gt(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 4,
};

patternMatcher(data); // 'it works!'
```

### gte

Numbers can be compared to be greater than or equal. `String`s will not be coerced to `Number`s. Use the `ikat.gte(...)` function to add a **greater than or equal** validator.

```javascript
let pattern = {
  a: ikat.gt(3),
  b: ikat.gt(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 3,
  b: 4,
};

patternMatcher(data); // 'it works!'
```

### lt

Numbers can be compared to be less than. `String`s will not be coerced to `Number`s. Use the `ikat.lt(...)` function to add a **less than** validator.

```javascript
let pattern = {
  a: ikat.gt(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 2,
};

patternMatcher(data); // 'it works!'
```

### lte

Numbers can be compared to be less than or equal. `String`s will not be coerced to `Number`s. Use the `ikat.lte(...)` function to add a **less than or equal** validator.

```javascript
let pattern = {
  a: ikat.gt(3),
  b: ikat.gt(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 3,
  b: 2,
};

patternMatcher(data); // 'it works!'
```

### undefined

Key is **either** `=== undefined` or not defined on the object. Use the `ikat.undefined()` function to add an **undefined** validator.

```javascript
let pattern = {
  a: ikat.undefined(),
  b: ikat.undefined(),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: undefined,
};

patternMatcher(data); // 'it works!'
```

### notUndefined

Key is `!== undefined`. Use the `ikat.notUndefined()` function to add an **not undefined** validator.

```javascript
let pattern = {
  a: ikat.notUndefined(),
  b: ikat.notUndefined(),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 1,
  b: null,
};

patternMatcher(data); // 'it works!'
```

### null

Key is `=== null`. Use the `ikat.null()` function to add an **null** validator.

```javascript
let pattern = {
  a: ikat.null(),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: null,
};

patternMatcher(data); // 'it works!'
```

### notNull

Key is `!== null`. Use the `ikat.notNull()` function to add an **not null** validator.

```javascript
let pattern = {
  a: ikat.notNull(),
  b: ikat.notNull(),
  c: ikat.notNull(),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 1,
  b: undefined,
};

patternMatcher(data); // 'it works!'
```

### default

If not pattern is matched, pass in a `default` function. This function will run when there's no pattern match. Use the `ikat.default()` rather than a pattern-object along with a success function to create a **default function**.

**Warning**: The default function must be the last pattern passed in. It is a bug to define a default function that is not the last pattern, and an `Error` will be thrown.

```javascript
let pattern = {
  a: String,
};

let defaultMarker= ikat.default();

let patternMatcher = ikat.build(
  [pattern, () => 'first pattern'],
  [defaultMarker, () => 'it works!'],
);

let data = {
  a: 1,
};

patternMatcher(data); // 'it works!'
```

## Tests

Tests can be run via the `npm test` command. [We aim to write tests](test/) for all supported behaviors.

## Linting

Linting can be run via the `npm run lint` command. All code must pass the [code quality checks](.eslintrc.json) provided by [eslint](http://eslint.org/).

## Contributing

Contributions are always welcome! This may come in the form of _constructive_ criticism via [GitHub issues](https://github.com/krmannix/ikat/issues), or direct PRs. Contributions will be required to pass all tests and must adhere to the guidelines set forth by the [eslint style guide](.eslintrc.json). This includes source files & test files.

## TODO:

* Support validators
  * ~~gt~~
  * ~~gte~~
  * ~~lt~~
  * ~~lte~~
  * ~~undefined~~
  * ~~notUndefined~~
  * ~~null~~
  * ~~notNull~~
  * ~~default~~
  * ~~Map, Set, Date type matching~~
  * `instanceof`
  * `contains` (`Array`)
  * `contains` (`String`)
  * `regex`
  * Custom validators
  * Pretty errors
  * Non-happy path tests for proper handling
* ~~Support single field patterns~~
  * ~~{ a: Number } instead of { a: [Number] }~~
* ~~Success return values~~
* Add benchmarking
* Add code coverage
* Add CI integration
* Nested object support

Have suggestions? Add them via a [GitHub issue](https://github.com/krmannix/ikat/issues)!
