require('dotenv').config({
  path: __dirname + './.env'
});
const Web3Utils = require('../../packages/web3-utils');

const RPC_URL = process.env.RPC_URL;
const Sweb3 = require('../../packages/web3')

const homeProvider = new Sweb3.providers.HttpProvider(RPC_URL)
const web3 = new Sweb3(homeProvider)

const GAS_PRICE = Web3Utils.toWei(process.env.DEPLOYMENT_GAS_PRICE, 'gwei');
const GAS_LIMIT = process.env.DEPLOYMENT_GAS_LIMIT;
const GET_RECEIPT_INTERVAL_IN_MILLISECONDS = process.env.GET_RECEIPT_INTERVAL_IN_MILLISECONDS;

const deploymentPrivateKey= process.env.DEPLOYMENT_ACCOUNT_PRIVATE_KEY;
// const deploymentPrivateKey = Buffer.from(DEPLOYMENT_ACCOUNT_PRIVATE_KEY, 'hex')


module.exports = {
  web3,
  deploymentPrivateKey,
  RPC_URL,
  GAS_LIMIT,
  GAS_PRICE,
  GET_RECEIPT_INTERVAL_IN_MILLISECONDS,
  Web3Utils
}
