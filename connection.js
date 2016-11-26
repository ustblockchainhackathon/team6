var erisDbFactory = require('eris-db');
const ERIS_URL = "http://134.168.56.174:1337/rpc"

erisdb = erisDbFactory.createInstance(ERIS_URL);
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

erisdb.blockchain().getLatestBlock( (err, res) => {
   console.log(res)
 });
