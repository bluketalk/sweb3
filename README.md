   web3.js library for CITA base on ethereum web3.js-1.0 

 ### installation
    npm install sweb3js

 ### usage
    const Web3 = require('sweb3js')
    const homeProvider = new Web3.providers.HttpProvider("http://127.0.0.1"1337")
    const web3 = new Web3(homeProvider)


### base use
    const address = "0x2866BB02Cbb43F2Fc5dd081d6B68222Ab75b3190"

    //balance
    console.log('\n\n======================= ')
    let balance = await web3.eth.getBalance(address);
    console.log("balance = ", balance)

    //getBlockNumber
    console.log('\n\n======================= ')
    let blocknumber = await web3.eth.getBlockNumber();
    console.log("blocknumber = ", blocknumber)

    //getCode     get contract code
    console.log('\n\n======================= ')
    contractAddr = "0x73F1313e3301c93630475be5c2E745E2f9f54524";
    let code = await web3.eth.getCode(contractAddr);
    console.log("code = ", code)

    //getBlock
    console.log('\n\n======================= ')
    let block = await web3.eth.getBlock(100);
    console.log("block = ", block)
    block = await web3.eth.getBlock("0x3d41915363dea9c4c7bd67067d0c861331a4a06de2ae4731000fcf61d9dca4b9");
    console.log("block = ", block)

    //getTransactionReceipt
    console.log('\n\n======================= ')
    let receipt = await web3.eth.getTransactionReceipt("0x3d41915363dea9c4c7bd67067d0c861331a4a06de2ae4731000fcf61d9dca4b9");
    console.log("receipt = ", receipt)

    //getTransactionCount
    console.log('\n\n======================= ')
    let nonce = await web3.eth.getTransactionCount(address);
    console.log("nonce = ", nonce)

    //getTransactionCount
    console.log('\n\n======================= ')
    let transaction = await web3.eth.getTransaction("0x0b377d47516fcf26e9454cc71b9aec7ef04e394a5df6c8aee542870e62489728");
    console.log("transaction = ", transaction)

    //getMetaData
    console.log('\n\n======================= ')
    let metadata = await web3.eth.getMetaData("latest");
    console.log("metadata = ", metadata)

    //getAbi
    console.log('\n\n======================= ')
    let abi = await web3.eth.getAbi("0xffffffffffffffffffffffffffffffffff010001", "latest");
    console.log("abi = ", abi)


    //getBlockHeader
    console.log('\n\n======================= ')
    let blockheader = await web3.eth.getBlockHeader("latest");
    console.log("blockheader = ", blockheader)


    //getPeerCount
    console.log('\n\n======================= ')
    let peercount = await web3.eth.getPeerCount();
    console.log("peercount = ", peercount)

### contract

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
