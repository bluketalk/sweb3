const Web3Utils = require('../../packages/web3-utils')
require('dotenv').config({
  path: __dirname + '/../.env'
});

const assert = require('assert');

const {deployContract,sendRawTx} = require('./deploymentUtils');
const {web3, deploymentPrivateKey, RPC_URL} = require('./web3');

const SimpleStorage = require('../build/contracts/SimpleStorage.json')

const DEPLOYMENT_GAS_PRICE =  Web3Utils.toWei(process.env.DEPLOYMENT_GAS_PRICE, 'gwei');

const {
  DEPLOYMENT_ACCOUNT_ADDRESS,
} = process.env;

async function deploySimpleStorage()
{
    console.log('======================= ')
  let nonce = await web3.eth.getTransactionCount(DEPLOYMENT_ACCOUNT_ADDRESS);
  console.log('nonce : ', nonce)
  console.log('deploying SimpleStorage ')
  const contract_SimpleStorage = await deployContract(SimpleStorage, [], {from: DEPLOYMENT_ACCOUNT_ADDRESS, nonce: nonce})
  console.log(' SimpleStorage: ', contract_SimpleStorage.options.address)
  nonce++;

//   contractAddr = "0xA9200B14E0bBd154a61793ea6080532a48bd3e7b";
//   contract_SimpleStorage = new web3.eth.Contract(SimpleStorage.abi, contractAddr);

//   console.log("contract_SimpleStorage = " ,contract_SimpleStorage)
  console.log("contract_SimpleStorage = " ,contract_SimpleStorage.methods)
//   console.log("myContract.options.jsonInterface = "  , JSON.stringify(contract_SimpleStorage))



    contract_2 = contract_SimpleStorage.clone()
    console.log("contract_2 = " ,contract_2.methods)


  console.log('\ntesting SimpleStorage : set ')
  //test set method
  const paramsData = await contract_2.methods.set(5)
    .encodeABI({from: DEPLOYMENT_ACCOUNT_ADDRESS});
  console.log("paramsData = " + paramsData);
  const tx = await sendRawTx({
    data: paramsData,
    nonce: nonce,
    to: contract_2.options.address,
    privateKey: deploymentPrivateKey,
    url: RPC_URL
  })
//   console.log("tx = ", tx)

  //test get method
  console.log('\ntesting SimpleStorage : get ')


  const aa = await contract_SimpleStorage.methods.get().call()
//   aa = await web3.eth.call({to:contract_SimpleStorage.options.address, data:param}).then(console.log);
// const param = await contract_SimpleStorage.methods.get().encodeABI({from: DEPLOYMENT_ACCOUNT_ADDRESS});
// console.log("param = ", param)
  console.log("get result = " , aa)

  const storedData = await contract_SimpleStorage.methods.storedData().call()
    console.log("storagteat = " , storedData)


  console.log('\n test complete')


}
// module.exports = deploySimpleStorage;
deploySimpleStorage()
