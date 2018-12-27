const Web3Utils = require('../../packages/web3-utils')
require('dotenv').config({
    path: __dirname + '/../.env'
});

const assert = require('assert');

const {
    sendRawTx
} = require('./deploymentUtils');
const {
    web3,
    RPC_URL
} = require('./web3');

const {
    privateKeyToAddress
} = require('./deploymentUtils')

const {
    DEPLOYMENT_ACCOUNT_ADDRESS,
} = process.env;

async function run() {
    console.log('======================= ')
    privatekey = "0x39adacbb4376b6b77f85e324b4ec2b432bb1421e3e29de466ea2ab3a4b79102e"

    const test = privateKeyToAddress(privatekey)
    console.log("test================= ", test)
    let b = await web3.eth.getBalance(test);
    console.log("b = ", b)

    let nonce_2 = await web3.eth.getTransactionCount(test);

    let b_2 = await web3.eth.getBalance("0xffa509c45749d5018da86b55ac60c7b96ff0bf95");
    console.log("b_2 = ", b_2)

    amount = Web3Utils.toWei("100")
    valu = Web3Utils.numberToHex(amount)
    console.log("valu = ", valu)

    tx = await sendRawTx({
        data: null,
        nonce: nonce_2,
        to: "0xffa509c45749d5018da86b55ac60c7b96ff0bf95",
        privateKey: privatekey,
        value: valu,
        url: RPC_URL
    })

    tr = await web3.eth.getTransactionReceipt(tx.transactionHash)

    console.log("tx = ", tr)

    b_2 = await web3.eth.getBalance("0xffa509c45749d5018da86b55ac60c7b96ff0bf95");
    console.log("b_2 = ", Web3Utils.fromWei(b_2))



}
// module.exports = run;
run()
