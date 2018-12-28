# sweb3-eth-contract

This is a sub package of [web3.js][repo]

This is the contract package to be used in the `sweb3-eth` package.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install sweb3-eth-contract
```

### In the Browser

Build running the following in the [web3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/sweb3-eth-contract.js` in your html file.
This will expose the `Web3EthContract` object on the window object.


## Usage

```js
// in node.js
var Web3EthContract = require('sweb3-eth-contract');

// set provider for all later instances to use
Web3EthContract.setProvider('ws://localhost:8546');

var contract = new Web3EthContract(jsonInterface, address);
contract.methods.somFunc().send({from: ....})
.on('receipt', function(){
    ...
});
```


[docs]: http://web3js.readthedocs.io/en/1.0/
[repo]: https://github.com/ijustgoon/sweb3


