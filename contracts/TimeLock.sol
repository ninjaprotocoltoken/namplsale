// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TimeLock is Ownable {

    
    //private record of deployment date
    uint256 currentDate;
    
    uint256 public UNLOCK_TIMESTAMP = 1735660800;// 2025-1-1 
    //address to send tokens back to 
    address public receiver = 0x7570B6D338B1C3B17Cce1459343e9F91Cc8207c0; 
    
    
    function withdraw(IERC20 token) external onlyOwner() {

        require(block.timestamp >= UNLOCK_TIMESTAMP, "Operation not allowed in current state: locked.");

        uint256 balance = token.balanceOf(address(this));

        require(balance > 0 , "balance is not available.");
        
        token.transfer(receiver,balance); //send all tokens this contract holds back to the reciever address hard set above
    }

    function queryBalance(IERC20 token) public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}