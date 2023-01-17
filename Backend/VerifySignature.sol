// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Name {
    function getMessageHash(
        string memory name,
        string memory email
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked( name, email));
    }
}