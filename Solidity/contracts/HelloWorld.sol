pragma solidity ^0.8.27;

contract HelloWorld {
    string saySomething;

    constructor() {
        saySomething = "Hello World!";
    }

    function speak() public view returns (string memory) {
        return saySomething;
    }
}