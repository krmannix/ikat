ikat
==============

object pattern-matching for node.

[![node](http://img.shields.io/badge/node->=_4.0.0-brightgreen.svg)]()
[![Twitter](https://img.shields.io/badge/twitter-@krodmannix-blue.svg?style=flat)](http://twitter.com/krodmannix)

## Use Case Examples

### Data Validation

Use pattern-matching to validate data passed into your system, rejecting invalid objects and allowing valid objects to pass through. Below is a simple example dealing with `Player` objects that include `name`, `birthday` and `age`.

```javascript
const ikat = require('ikat');

let PlayerPattern = {
  name: String, // `name` must be string
  birthday: Date, // `birthday` must be a Date
  age: [Number, ikat.gt(13)], // `age` must be a Number and greater than 13
}

let onSuccess = (player) => {
  return player;
};

let onFailure = () => {
  throw new Error('invalid player');
}

let validatePlayer = ikat.build(
  [PlayerPattern, onSuccess],
  [ikat.default(), onFailure] // will execute if PlayerPattern is not matched
)

let player1 = {
  name: 'Kevin',
  birthday: new Date(),
  age: 23,
};

let player2 = {
  name: 'Steve',
  birthday: new Date(),
  age: 11, // will not match because it is less than 13
};

// the `PlayerPattern` will be matched for player1, so
// onSuccess will be executed, which will return the object passed into
// the `validatePlayer()` function
let player = validatePlayer(player1); // player is set to player1

// the `PlayerPattern` will not be matched for player2, so
// onFailure will be executed, which will throw an Error
let player = validatePlayer(player2); // an Error is thrown
```

### Mongoose Query Index Selection

A real-world example, and from which `ikat` was sprung. Instead of letting Mongo attempt to select the correct query, we can dictate which index we want based on the keys included in the query object to make sure our query uses the most effecient index. We'll use an example of `User` that has indexed keys of `email`, and `company`, with a compound index on `firstName` and `lastName`.

```javascript
const ikat = require('ikat');

const emailExists = { email: ikat.notUndefined() };
const emailIndex = { email: 1 };

const companyExists = { company: ikat.notUndefined() };
const companyIndex = { company: 1 };

const emailExists = {
  firstName: ikat.notUndefined(),
  lastName: ikat.notUndefined(),
};
const nameIndex = {
  firstName: 1,
  lastName: 1,
};

const default = emailIndex;

let chooseIndex = ikat.build(
  [nameExists, nameIndex],
  [emailExists, emailIndex],
  [companyExists, companyIndex]
);

let query1 = {
  firstName: 'Ron'
  company: 'Google',
};

let query2 = {
  firstName: 'Dave'
  lastName: 'Roberts',
  email: 'daveroberts@toysrus.com',
};

let query3 = {
  email: 'kevin@tablelist.com',
  company: 'Tablelist',
};

// queryHint1 will choose the company index. While firstName is on the query, ikat will only match if both firstName and lastName are not undefined
let queryHint1 = {
  hint: chooseIndex(query1),
};

// queryHint2 will choose the firstName - lastName compound index
let queryHint2 = {
  hint: chooseIndex(query2),
};

// queryHint3 will choose the email index. While both the emailExists and companyExists objects are matched, ikat works in order, so it will choose the first index it matches with. This way, you can determine which indexes you'd prefer to use if multiple conditions are matched
let queryHint3 = {
  hint: chooseIndex(query3),
};
```

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
- [Equal](#equal)
- [Not Equal](#notEqual)
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

##### Syntax
A _pattern_ is an object that allows _validators_ to be assigned to keys within the object.

```javascript
const pattern = {
  score: Number, // the score key has a "Number" type validator
  username: String,
};

// this object will match the pattern
let validObject = {
  score: 6,
  username: 'kevin',
};

// this object will not match the pattern
let invalidObject = {
  score: 'N/A',
  username: 'alex',
}
```

Multiple _validators_ can be assigned on a key. These validators are AND'd together, as in they will all need to be true for the key to be matched.

```javascript
const pattern = {
  score: [Number, ikat.lt(10)], // the score key has a "Number" type validator and a less-than 10 validator
  username: String,
};

// this object will match the pattern
let validObject = {
  score: 8,
  username: 'kevin',
};

// this object will not match the pattern
let invalidObject = {
  score: 18,
  username: 'alex',
}
```

_Patterns_ are associated with _success functions_ that will be executed if the pattern is matched.

_ikat_ will create a matching function based on the _patterns_ it is provided via the _build()_ function. The arguments to the _build()_ function are `Array`s of 2 elements. The first element is the _pattern_ while the second element is the _success function_.

```javascript
const pattern = {
  score: Number,
  username: String,
};

const onSuccess = () => {
  console.log('Awesome! Nice score.');
};

// match() is a function create by ikat.build()
// it will execute the function associated with the patterm
// that is matched with the object passed into the function
const match = ikat.build([
  [pattern, onSuccess]
]);

// this object will match the pattern
let validObject = {
  score: 8,
  username: 'kevin',
};

// this object will not match the pattern
let invalidObject = {
  score: 'N/A',
  username: 'alex',
};

match(validObject); // prints "Awesome! Nice score"

match(invalidObject); // does not print anything
```

These _success functions_ take in the object passed to the _match_ function.

```javascript
const pattern = {
  score: Number,
  username: String,
};

const onSuccess = validObject => {
  return {
    scoreMultiplier: 2,
    totalScore: validObject.score * 2,
  };
};

// match() is a function create by ikat.build()
// it will execute the function associated with the patterm
// that is matched with the object passed into the function
const match = ikat.build([
  [pattern, onSuccess]
]);

// this object will match the pattern
let validObject = {
  score: 8,
  username: 'kevin',
};

let score = match(validObject);
// score is now:
// {
//    scoreMultiplier: 2,
//    totalScore: 16,
// }
```

More examples:

```javascript
const ikat = require('ikat');

// pattern 1
let pattern1 = {
  a: Number,
  b: Number,
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
  a: [Number], // square brackets are optional - see note below
  b: String,
};

let patternFn3 = 'Some value.';

let patternMatcher = ikat.build(
  [pattern1, patternFn1],
  [pattern2, patternFn2],
  [pattern3, patternFn3],
);

// execution
let data1 = {
  a: 10,
  b: 100,
}

let data2 = {
  a: 'foo',
  b: 'bar',
}

let data3 = {
  a: 118,
  b: 'hello',
}

console.log(patternMatcher(data1)); // 18

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

### equal

Compare strict equality (`===`). Values will not be coerced. Use the `ikat.equal(...)` function to add a **strict equal** validator.

```javascript
let pattern = {
  a: ikat.equal(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: 3,
};

patternMatcher(data); // 'it works!'
```

### notEqual

Compare strict inequality (`!==`). Values will not be coerced. Use the `ikat.notEqual(...)` function to add a **strict not equal** validator.

```javascript
let pattern = {
  a: ikat.notEqual(3),
};

let patternMatcher = ikat.build(
  [pattern, () => 'it works!'],
);

let data = {
  a: '3',
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
