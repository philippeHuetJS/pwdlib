# pwdlib

[![CI status](https://img.shields.io/github/actions/workflow/status/philippeHuetJS/pwdlib/ci.yml)](https://github.com/philippeHuetJS/pwdlib/actions)
[![MIT license](https://img.shields.io/github/license/philippeHuetJS/pwdlib)](https://github.com/philippeHuetJS/pwdlib/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/philippeHuetJS/pwdlib)](https://github.com/philippeHuetJS/pwdlib/releases)

HMAC One-Time Password library

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm](https://www.npmjs.com/) registry.

```sh
$ npm install pwdlib
```

## API

```js
var Digit = require('pwdlib')
```

TypeScript:

```typescript
import Digit from 'pwdlib'
```

### Digit.sign(length)

```js
var code = Digit.sign(6)
console.log(code) // 197576
```

### Digit.verify(code)

```js
var result = Digit.verify(code)
console.log(result) // true
```

## Description

Signs and verifies an unique code with SHA-512 algorithm for a two-factors authentication.

## Test

```sh
$ npm run test
```

## Documentation

Find [here](https://www.npmjs.com/package/otplib) the official documentation.

## License

[MIT](LICENSE)
