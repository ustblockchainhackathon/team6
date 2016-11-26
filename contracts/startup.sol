contract Startup { 
    
    address owner;
    uint balance; 
    
    function Startup(){
        owner = msg.sender;
    }
    
    function balancer(uint _balance) 
    public { balance = _balance; } 
    function getbalance() constant returns (uint) { 
        return balance; 
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