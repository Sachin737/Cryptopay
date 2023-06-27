// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionsCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferData {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferData[] transactions;

    function addToBlock(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactions.push(
            TransferData(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        transactionsCount += 1;

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions() public view returns (TransferData[] memory) {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionsCount;
    }
}
