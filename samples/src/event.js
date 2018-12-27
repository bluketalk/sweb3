const Web3Utils = require('web3-utils')
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

    // Instantiation contract from a address
    contractAddr = "0xA9200B14E0bBd154a61793ea6080532a48bd3e7b";
    contract_2 = new web3.eth.Contract(SimpleStorage.abi, contractAddr);
    console.log("contract_2 = " ,contract_2.methods)


    contract_2.getPastEvents("allEvents",{fromBlock: 0, toBlock: 'latest'}, function(error, result){

        if (!error)
            console.log(result);
            console.log("Event are as following:-------");

            for(index in result){
                re = result[index]
                console.log("=============================================     " + index + "     ==============================================");
                str = JSON.stringify(re, null, 4)
                console.log(str);

                // for(key in re){
                //     console.log(key + " : " + re[key]);
                // }
                // console.log("=== args === ");
                // for(key in re.returnValues){
                //     console.log(key + " : " + re.returnValues[key]);
                // }

                console.log("-------\n");
            }

            console.log("Event ending-------\n");

        });





}
// module.exports = deploySimpleStorage;
deploySimpleStorage()
