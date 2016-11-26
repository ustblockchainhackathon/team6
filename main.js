const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
const accounts = require("./accounts.js").accounts;
const nodes = require("./ips.js").ips;

var erisdb; /* ErisDB Factory */
var erisdbURL; /* ErisDB RPC URL */
var pipe; /* Pipe for creating contracts */
var contractManager;/* Contract Manager for creating contracts*/
var account = accounts[0].address;
var greeterSource = 'contract greeter { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet() constant returns (string) { return greeting; } }'


/* Init server */
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(3000, '0.0.0.0', function() { //appEnv.port
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

/*Initialize ERISDB*/
erisdb = erisDbFactory.createInstance(nodes[0]);
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */

/*Get account list*/
erisdb.accounts().getAccounts((err, res) => { console.log(res.accounts.map(item => {
  return ({
    ADDR: item.address,
    BALANCE: item.balance
  })
})) });

/* Compile the Greeter Contract*/
var compiledContract = solc.compile(greeterSource);
//console.log(compiledContract)
var contractFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.greeter.interface)); //parameter is abi
// console.log(contractFactory)

/* Send the contract */
contractFactory.new.apply(contractFactory, ["Hello World",
 {from: account, data:compiledContract.contracts.greeter.bytecode}, (err, contractInstance)=> {
  console.log(contractInstance.address);
  contractInstance["greet"].apply(contractInstance, [(error,result)=> {
     if (error) {
       console.log(error);
     }
    else {
      console.log(result);
    }
  }]);

 }]);
