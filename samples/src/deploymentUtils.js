const Web3 = require('../../packages/sweb3js')
const Tx = require('ethereumjs-tx')
const fetch = require('node-fetch')
const assert = require('assert')
const {
    web3,
    Web3Utils,
    // deploymentPrivateKey,
    RPC_URL,
    GAS_LIMIT,
    HOME_DEPLOYMENT_GAS_PRICE,
    FOREIGN_DEPLOYMENT_GAS_PRICE,
    GET_RECEIPT_INTERVAL_IN_MILLISECONDS
} = require('./web3')

const deploymentPrivateKey = process.env.DEPLOYMENT_ACCOUNT_PRIVATE_KEY;


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};


async function deployContract(contractJson, args, {
    from,
    network,
    nonce
}) {
    let url
    let gasPrice

    url = RPC_URL
    gasPrice = HOME_DEPLOYMENT_GAS_PRICE
    const options = {
        from
    }
    const instance = new web3.eth.Contract(contractJson.abi, options)
    const result = await instance
        .deploy({
            data: contractJson.bytecode,
            arguments: args
        })
        .encodeABI()
    const tx = await sendRawTx({
        data: result,
        nonce: Web3Utils.toHex(nonce),
        to: null,
        privateKey: deploymentPrivateKey,
        url,
        gasPrice: gasPrice
    })
    // if (tx.errorMessage !== null) {
    if(tx.status !== '0x1'){
        throw new Error('Tx failed')
    }
    instance.options.address = tx.contractAddress
    instance.deployedBlockNumber = tx.blockNumber
    return instance
}

async function sendRawTxHome(options) {
    return sendRawTx({
        ...options,
        gasPrice: HOME_DEPLOYMENT_GAS_PRICE
    })
}

async function sendRawTxForeign(options) {
    return sendRawTx({
        ...options,
        gasPrice: FOREIGN_DEPLOYMENT_GAS_PRICE
    })
}

async function sendRawTx({
    data,
    nonce,
    to,
    privateKey,
    url,
    gasPrice,
    value
}) {
    try {

        const current = await web3.eth.getBlockNumber();
        const transaction = {
            privateKey: privateKey,
            nonce: nonce,
            quota: parseInt(GAS_LIMIT),
            data: data,
            chainId: 1,
            version: 1,
            to,
            validUntilBlock: current + 88,
            value
        };


        console.log("trasaction = ", transaction)
        const signedData = web3.eth.signer(transaction)

        const result = await sendNodeRequest(
            url,
            'sendRawTransaction',
            signedData
        )
        console.log('pending txHash', result.hash)
        const receipt = await getReceipt(result.hash, url)
        receipt.status = receipt.errorMessage == null ? "0x1" : "0x0"
        return receipt
    } catch (e) {
        console.error(e)
    }
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

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getReceipt(txHash, url) {
    await timeout(GET_RECEIPT_INTERVAL_IN_MILLISECONDS)
    let receipt = await sendNodeRequest(url, 'getTransactionReceipt', txHash)
    // console.log("receipt = ", receipt)
    if (receipt === null || receipt.blockNumber === null) {
        receipt = await getReceipt(txHash, url)
    }
    return receipt
}

function add0xPrefix(s) {
    if (s.indexOf('0x') === 0) {
        return s
    }

    return `0x${s}`
}

function privateKeyToAddress(privateKey) {
    return new Web3().eth.accounts.privateKeyToAccount(add0xPrefix(privateKey)).address
}

module.exports = {
    deployContract,
    sendNodeRequest,
    getReceipt,
    sendRawTx,
    sendRawTxHome,
    sendRawTxForeign,
    privateKeyToAddress
}
