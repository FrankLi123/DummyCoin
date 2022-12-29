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

    // function pickWinner() public{


    // }


    function pickWinner() public{

        require(msg.sender == manager);

        uint index = random() % players.length;
        players[index].trnasfer(this.balance);
        players = new address[](0);
    }

}