pragma solidity ^0.4.17;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Inbox {

    string public message;

    function Inbox(string initialMessage) public{
        message = initialMessage;
    }

    function setMessage(string newMessage) public{
        message = newMessage;
    }

    function getMessage() public view returns(string){
        return message;
    }

}