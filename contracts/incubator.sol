contract incubator {

    address owner;
    
    // This is where we keep all the startups.
    mapping (bytes32 => address) startups;
    bytes32[] startupNames;

    //modifier onlyOwner { //a modifier to reduce code replication
    //    if (msg.sender == owner) // this ensures that only the owner can access the function
    //}

    function incubator(){
        owner = msg.sender;
    }

    function addStartup(bytes32 name) returns (address addr) {
        startups[name] = new startup(name);
        startupNames.push(name);
        return startups[name];
    }

    function removeStartup(bytes32 name)  returns (bool result) {
        if (startups[name] == 0x0){
            return false;
        }
        startups[name] = 0x0;
        return true;
    }

    function getStartup(bytes32 name) constant returns (address addr) {
        return startups[name];
    }
    
    function getStartupLength() constant returns (uint startupsLength) {
        return startupNames.length;
    }
    
    function getStartupByPossition(uint poss) constant returns (address addr) {
        bytes32 name = startupNames[poss];
        return startups[name];
    }

    function remove()  {
        selfdestruct(owner);
    }

}

contract startup { 
    
    address owner;
    uint balance; 
    bytes32 name;
    
    function startup(bytes32 newName){
        owner = msg.sender;
        name = newName;
        balance = 0;
    }
    
    function balancer(uint _balance) 
    public { balance = _balance; } 
    function getbalance() returns (uint) { 
        return balance; 
    }
    function getData() returns (bytes32, uint) { 
        return (name, balance);
    }
    function getName() returns (bytes32) { 
        return name; 
    }
    function deposit(uint amount) returns (bool res) {
        // If the amount they send is 0, return false.
        if (amount == 0){
            return false;
        }
        balance += amount;
        return true;
    }

    // Attempt to withdraw the given 'amount' of Ether from the account.
    function withdraw(uint amount) returns (bool res) {
        // Skip if someone tries to withdraw 0 or if they don't have
        // enough Ether to make the withdrawal.
        if (balance < amount || amount == 0)
            return false;
        balance -= amount;
        return true;
    }
    
}