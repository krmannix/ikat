Ikat
==============

object pattern-matching for node.

[![node](http://img.shields.io/badge/node->=_4.0.0-brightgreen.svg)]()
[![Twitter](https://img.shields.io/badge/twitter-@krodmannix-blue.svg?style=flat)](http://twitter.com/krodmannix)

## Motivation
Inspiration initially taken from functional languages that use pattern-matching, primarily [Elixir](http://elixir-lang.org/getting-started/pattern-matching.html). Primary use case is branching based on the qualities of a plain old javascript object. While there is certainly a way to achieve the same behavior with numerous if/else statements, switch cases, and other code that would be messy to maintain or easily understandable to a developer new to the project, pattern-matching seemed to be the obvious way to tackle this particular use case.

## Current Status
**Warning**: Under development & currently experimental. Syntax is subject to change. Features will be added, and existing capabilities may be altered.

## Usage

- [Introduction](#introduction)
- [Primitives](#primitives)
- [Types](#types)
- [Greater Than](#gt)
- [Greater Than Or Equal](#gte)
- [Less Than](#lt)
- [Less Than Or Equal](#lte)

### Introduction

`Ikat` can generate a function that you can pass an object to, and will execute its associated function and return the function's value. Functions are executed and returned synchronously - if you need async behavior, I suggested returning a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Patterns will be matched in the order they are passed into the `Ikat.build` function - i.e., the first pattern to match will execute the associated function.

Pattern matching is not strict - matching will still occur if additional keys exist on an object. Only the keys defined in the pattern will be checked.

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
  a: [String],
  b: [String],
};

let patternFn2 = object => object.b;

let patternMatcher = ikat.build(
  [pattern1, patternFn1],
  [pattern2, patternFn2],
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

console.log(patternMatcher(data1)); // 118

console.log(patternMatcher(data2)); // bar
```

### Primitives

Primitive types can be used as validators. Current types supported are:
* `Number`
* `String`
* `Boolean`

```javascript
let pattern = {
  a: [Number],
  b: [String],
  c: [Boolean],
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
  a: [Object],
  b: [Function],
  c: [Array],
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
  a: [ikat.gt(3)],
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
  a: [ikat.gt(3)],
  b: [ikat.gt(3)],
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
  a: [ikat.gt(3)],
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
  a: [ikat.gt(3)],
  b: [ikat.gt(3)],
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

## Tests

Tests can be run via the `npm test` command. [We aim to write tests](test/) for all supported behaviors.

## Linting

Linting can be run via the `npm run lint` command. All code must pass the code quality checks provided by [eslint](http://eslint.org/).

## Contributing

Contributions are always welcome! This may come in the form of _constructive_ criticism via GitHub issues, or direct PRs. Contributions will be required to pass all tests and must adhere to the guidelines set forth by the [eslint style guide](.eslintrc.json). This includes source files & test files.

## TODO:

* Support validators
  * ~~gt~~
  * ~~gte~~
  * ~~lt~~
  * ~~lte~~
  * `contains` (`Array`)
  * `contains` (`String`)
  * `instanceof`
  * `regex`
  * ~~Map, Set, Date type matching~~
  * Custom validators
* Add benchmarking
* Add code coverage
* Support single field patterns
  * `{ a: Number }` instead of `{ a: [Number] }`

Have suggestions? Add them via a GitHub issue!
