
<p align="center">
  <img src="https://github.com/bredele/zeroin/blob/master/zeroin.png" width="300" height="220" alt="mitt">
  <br>
  <a href="https://www.npmjs.org/package/zeroin"><img src="https://img.shields.io/npm/v/zeroin.svg?style=flat" alt="npm"></a>
  <a href="https://travis-ci.org/bredele/zeroin"><img src="https://travis-ci.org/bredele/zeroin.svg?branch=master" alt="travis"></a>
  <a href="https://david-dm.org/bredele/zeroin"><img src="https://david-dm.org/bredele/zeroin/status.svg" alt="dependencies Status"></a>
  <a href='https://github.com/bredele/contributing-guide/blob/master/guidelines.m'><img src="https://bredele.github.io/contributing-guide/community-pledge.sv" alt="dependencies Status"></a>
</p>

# zeroin

Zeroin is a tiny functional event emitter made for the browser and 100% compatible with [Node's EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

-   **Functional:** methods don't rely on `this`
-   **Compatible:** exact same API than Nodejs event emitters
-   **Asynchronous:** create promises from a listener
-   **Useful:** use the wildcard `"*"` to listens for all events
-   **Small:** weighs less than 800 bytes gzipped

Zeroin has no dependencies and works in all mainstream browsers, included IE9+.

## Usage

Basic API.

```js
const zeroin = require('zeroin')

// create new event emitter
const emitter = zeroin()

// listen to an event
var handler = value => console.log(value)
emitter.on('hello', handler)

// listen to an event once
emitter.once('hello', handler)

// listen to all events
emitter.on('*', (type, value) => console.log(type, value))

// emit an event
emitter.emit('hello', 'world')

// remove all listeners for a given type
emitter.off('hello')
// remove specific listener
emitter.off('hello', handler)
// remove all listeners
emitter.off()

```

What makes zeroin special.

```js

const emitter = {}

// mixin object with zeroin API
zeroin(emitter)

// listen to an event and pass all the values associated to it
emitter.on('hello', (...values) => console.log(...values))

// prepend listener with .on or .once
emitter.on('hello', () => console.log('do something'), true)
emitter.once('hello', () => console.log('do something'), true)

// promises can be created from .on or .once
emitter.on('hello').then((...values) => console.log(...values))
emitter.once('hello').then((...values) => console.log(...values))


// emit an event and pass multiple values
emitter.emit('hello', 'world', 'universe')

```


## Installation

```shell
npm install zeroin --save
```

[![NPM](https://nodei.co/npm/zeroin.png)](https://nodei.co/npm/zeroin/)


## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

zeroin is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">guideline</a> before making a pull request. If you have any zeroin related project, component or other let everyone know in our wiki.

## License

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
