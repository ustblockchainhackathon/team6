const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
var fs = require('fs');


const accounts = require("./accounts.js").accounts;
const nodes = require("./ips.js").ips;

var erisdb; /* ErisDB Factory */
var erisdbURL; /* ErisDB RPC URL */
var pipe; /* Pipe for creating contracts */
var contractManager;/* Contract Manager for creating contracts*/
var account = accounts[0].address;
var incubatorSource =  fs.readFileSync("./contracts/incubator.sol", "utf8");


var incubatorInstanceGlobal = {}; 
var startupInstanceGlobal = {}; 
/* Compile the Incubator Contract*/
var compiledContract = solc.compile(incubatorSource);
//console.log(compiledContract)
var contractIncubatorFactory = {};
// console.log(contractFactory)
var contractStartupFactory = {};


/* Init server */
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working
router.get('/', function(req, res) {
    
    var contractInstance2 = contractFactory.at(incubatorInstanceGlobal.address);
    contractInstance2["changeGreet"].apply(contractInstance2, [ "hello hackathon", {from: account}, () => {
        contractInstance2["greet"].apply(contractInstance2, [(error,result)=> {
            if (error) {
              console.log(error);
            }
          else {
            console.log(result);
            res.json({ message: 'hooray! welcome to our api! ' + result});
        }
    } ])}]);
    
});

function parseStrToHex (str) {
  return Buffer.from(str).toString('hex');
}

function parseHexToStr (hex) {
  return  ((new Buffer(hex, "hex")).toString('utf8')).replace(/\0/g, '');
}

router.route('/startup/:startup_id')
  .get(function(req, res) {
      incubatorInstanceGlobal["getStartup"].apply(incubatorInstanceGlobal, [ parseStrToHex(req.params.startup_id), {from: account}, (error, result) => {
          var startupInstance = contractStartupFactory.at(result);
          startupInstance["getData"].apply(startupInstance, [(error,result)=> {
            if (error) {
              console.log("Startup ERROR: " + error);
            }
            else {
              // var resultSplit = result.split(",");
              console.log("Startup Data: " + result );
              // console.log("Startup Balance: " + resultSplit[1] );
              res.json({ message: {
                name: parseHexToStr(result[0]),
                balance: result[1]}
              });
            }
          }]);
      }]);
  });

router.route('/startup/:startup_id/balance')
  .get(function(req, res) {
      incubatorInstanceGlobal["getStartup"].apply(incubatorInstanceGlobal, [ parseStrToHex(req.params.startup_id), {from: account}, (error, result) => {
          var startupInstance = contractStartupFactory.at(result);
          startupInstance["getbalance"].apply(startupInstance, [(error,result)=> {
            if (error) {
              console.log("Startup ERROR: " + error);
            }
            else {
              console.log("Startup Balance: " + result );
              res.json({ message: "Startup Balance: " + result });
            }
          }]);
      }]);
  });

router.route('/startup/:startup_id/deposit/:amount')
  .get(function(req, res) {
      incubatorInstanceGlobal["getStartup"].apply(incubatorInstanceGlobal, [ parseStrToHex(req.params.startup_id), {from: account}, (error, result) => {
          var startupInstance = contractStartupFactory.at(result);
          startupInstance["deposit"].apply(startupInstance, [ req.params.amount, (error,result)=> {
            if (error) {
              console.log("Startup ERROR: " + error);
            }
            else {
              console.log("Startup Deposit: " + result );
              res.json({ message: "Startup Deposit: " + result });
            }
          }]);
      }]);
  });

router.route('/startup/:startup_id/withdraw/:amount')
.get(function(req, res) {
    incubatorInstanceGlobal["getStartup"].apply(incubatorInstanceGlobal, [ parseStrToHex(req.params.startup_id), {from: account}, (error, result) => {
        var startupInstance = contractStartupFactory.at(result);
        startupInstance["withdraw"].apply(startupInstance, [ req.params.amount, (error,result)=> {
          if (error) {
            console.log("Startup ERROR: " + error);
          }
          else {
            console.log("Startup withdraw: " + result );
            res.json({ message: "Startup withdraw: " + result });
          }
        }]);
    }]);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() { //appEnv.port
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


/*Initialize ERISDB*/
erisdb = erisDbFactory.createInstance("http://134.168.62.175:1337/rpc");
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */

contractIncubatorFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.incubator.interface)); //parameter is abi
// console.log(contractFactory)
contractStartupFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.startup.interface)); //parameter is abi

// /*Get account list*/
// erisdb.accounts().getAccounts((err, res) => { console.log(res.accounts.map(item => {
//   return ({
//     ADDR: item.address,
//     BALANCE: item.balance
//   })
// })) });


/* Send the contract */
contractIncubatorFactory.new.apply(contractIncubatorFactory, [ {from: account, data:compiledContract.contracts.incubator.bytecode}, (err, incubatorInstance)=> {
  console.log(incubatorInstance.address);
  incubatorInstanceGlobal = incubatorInstance;


  createStartup("chaintonic");
  createStartup("ustglobal");
  createStartup("unir");

 }]);

 function createStartup(startupName){
     incubatorInstanceGlobal["addStartup"].apply(incubatorInstanceGlobal, [ Buffer.from(startupName).toString('hex') , {from: account}, (error,result)=> {
     if (error) {
       console.log(error);
     }
    else {
      console.log("Incubator: " + result);
      var startupInstance = contractStartupFactory.at(result);
      startupInstance["getName"].apply(startupInstance, [(error,result)=> {
        if (error) {
          console.log("Startup ERROR: " + error);
        }
        else {
          console.log("Startup: " + parseHexToStr(result) );
        }
      }]);
    }
  }]);
 }
