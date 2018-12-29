const Web3Utils = require('../../packages/sweb3-utils')
require('dotenv').config({
    path: __dirname + '/../.env'
});
const fetch = require('node-fetch')


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

    b_2 = await web3.eth.getBalance("0x0b4697efc7dd8b6da69f1cd4e99ce838918cf715");
    console.log("b_2 = ", Web3Utils.fromWei(b_2))

    console.log('======================= ')
    let privatekey = "0x2e62777168ae1828f4010fdc22f083768ddf0658eefb75d6421f6dfd7e94a728"
    const addr = privateKeyToAddress(privatekey)

    let amount = Web3Utils.toWei("10000")
    let valu = Web3Utils.numberToHex(amount)
    let nonce = await web3.eth.getTransactionCount(addr);
    const current = await web3.eth.getBlockNumber();
    const transaction = {
        privateKey: privatekey,
        nonce: nonce,
        quota: 99999999,
        chainId: 1,
        version: 0,
        to:"0x0b4697efc7dd8b6da69f1cd4e99ce838918cf715",
        validUntilBlock: current + 88,
        value:valu
    };


    const signedData = web3.eth.signer(transaction)
    const result = await sendNodeRequest(
        RPC_URL,
        'sendRawTransaction',
        signedData
    )


    // const result =  web3.eth.sendSignedTransaction(signedData).then(console.log)
    console.log('pending txHash', result)


    // const receipt = await getReceipt(result.hash, url)
    // receipt.status = receipt.errorMessage == null ? "0x1" : "0x0"



    // const test = privateKeyToAddress(privatekey)
    // console.log("test================= ", test)
    // let b = await web3.eth.getBalance(test);
    // console.log("b = ", b)

    // let nonce_2 = await web3.eth.getTransactionCount(test);

    // let b_2 = await web3.eth.getBalance("0x0b4697efc7dd8b6da69f1cd4e99ce838918cf715");
    // console.log("b_2 = ", b_2)

    // amount = Web3Utils.toWei("10000")
    // valu = Web3Utils.numberToHex(amount)
    // console.log("valu = ", valu)

    // tx = await sendRawTx({
    //     data: null,
    //     nonce: nonce_2,
    //     to: "0x0b4697efc7dd8b6da69f1cd4e99ce838918cf715",
    //     privateKey: privatekey,
    //     value: valu,
    //     url: RPC_URL
    // })

    // tr = await web3.eth.getTransactionReceipt(tx.transactionHash)

    // console.log("tx = ", tr)

    // b_2 = await web3.eth.getBalance("0x0b4697efc7dd8b6da69f1cd4e99ce838918cf715");
    // console.log("b_2 = ", Web3Utils.fromWei(b_2))



}

async function sendNodeRequest(url, method, signedData) {
    const request = await fetch(url, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            jsonrpc: '2.0',
            method,
            params: [signedData],
            id: 1
        })
    })
    const json = await request.json()
    console.log("json = ", json)
    if (method === 'sendRawTransaction') {
        assert.equal(json.result.hash.length, 66, `Tx wasn't sent ${json}`)
    }
    return json.result
}
// module.exports = run;
run()
