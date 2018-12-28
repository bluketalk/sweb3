# sweb3-bzz

This is a sub package of [web3.js][repo]

This is the swarm package.   
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install sweb3-bzz
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/sweb3-bzz.js` in your html file.
This will expose the `Web3Personal` object on the window object.


## Usage

```js
// in node.js
var Web3Bzz = require('sweb3-bzz');

var bzz = new Web3Bzz('http://swarm-gateways.net');
```


[docs]: http://web3js.readthedocs.io/en/1.0/
[repo]: https://github.com/ijustgoon/sweb3


