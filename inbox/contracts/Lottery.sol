pragma solidity ^0.4.17;

contract Lottery{

    int public money;
    address public manager;
    address[] public players;

    // * msg - ?
    function Lottery() public {
        manager = msg.sender;
    }

    function enter(String address, int amount) payable {
        money += amount;
        players.add(address);
    }

    function pickWinner() public{


    }


}