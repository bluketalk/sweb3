const Web3Utils = require('../../packages/sweb3-utils');
require('dotenv').config({
  path: __dirname + '/../.env'
});

const assert = require('assert');

const {deployContract,sendRawTx} = require('./deploymentUtils');
const {web3, deploymentPrivateKey, RPC_URL} = require('./web3');

const SimpleStorage = require('../build/contracts/SimpleStorage.json')


const {
  DEPLOYMENT_ACCOUNT_ADDRESS,
} = process.env;

async function deploySimpleStorage()
{
    console.log('======================= ')

    let nonce = await web3.eth.getTransactionCount(DEPLOYMENT_ACCOUNT_ADDRESS);
    console.log('nonce : ', nonce)
     //deploy contract
    console.log('deploying SimpleStorage ')
    const contract_SimpleStorage = await deployContract(SimpleStorage, [], {from: DEPLOYMENT_ACCOUNT_ADDRESS, nonce: nonce})
    console.log(' SimpleStorage: ', contract_SimpleStorage.options.address)
    nonce++;

    //or Instantiation contract from a address
    // contractAddr = "0x73F1313e3301c93630475be5c2E745E2f9f54524";
    // contract_2 = new web3.eth.Contract(SimpleStorage.abi, contractAddr);
    // console.log("contract_2 = " ,contract_2.methods)


    //send a contract transaction
    console.log('\ntesting SimpleStorage : set ')
    //test set method
    const paramsData = await contract_SimpleStorage.methods.set(5).encodeABI({from: DEPLOYMENT_ACCOUNT_ADDRESS});
    console.log("paramsData = " + paramsData);
    const tx = await sendRawTx({
    data: paramsData,
        nonce: nonce,
        to: contract_SimpleStorage.options.address,
        privateKey: deploymentPrivateKey,
        url: RPC_URL
    })


    //call contract method
    //test get method
    console.log('\ntesting SimpleStorage : get ')
    const re = await contract_SimpleStorage.methods.get().call()
    console.log("get result = " , re)
    // or 功能同上
    // const param = await contract_SimpleStorage.methods.get().encodeABI({from: DEPLOYMENT_ACCOUNT_ADDRESS});
    // re = await web3.eth.call({to:contract_SimpleStorage.options.address, data:param});
    // console.log("get result = = ", re)





}
// module.exports = deploySimpleStorage;
deploySimpleStorage()
