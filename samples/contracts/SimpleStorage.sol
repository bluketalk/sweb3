pragma solidity ^0.4.24;

contract SimpleStorage {
    uint public storedData;

    event testEvent(string name);

    function set(uint x) public {
        emit testEvent("test event");
        storedData = x;
    }

    function get() public constant returns (uint retVal) {
        return storedData;
    }
}
