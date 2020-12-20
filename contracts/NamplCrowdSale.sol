// SPDX-License-Identifier: MIT

pragma solidity >=0.4.24 <0.8.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";

contract NamplCrowdSale is Ownable, Initializable {
    using SafeMath for uint256;

    uint256 public constant INVEST_AMOUNT = 0.1 ether;
    uint256 public constant HARDCAP = 0.2 ether;

    // Start time (20/12/2020 @ 1:00pm (UTC))
    uint256 public constant CROWDSALE_START_TIME = 1608440400;

    // End time
    uint256 public constant CROWDSALE_END_TIME = CROWDSALE_START_TIME + 1 days;

    // whitelist caps
    mapping(address => bool) public whitelistCaps;

    // Contributions state
    address[] public investors;

    uint256 public weiRaised;

    address founderWallet;

    event EVENT_INVEST(address indexed beneficiary, uint256 weiAmount);
    
    // event LogUint(string log, uint256 data);
    function initialize(address _wallet) public initializer {
        founderWallet = _wallet;
    }

    receive() payable external {

        // Prevent owner from buying tokens, but allow them to add pre-sale ETH to the contract for Uniswap liquidity
        if (owner() != msg.sender) {
            invest(msg.sender, msg.value);
        }
    }

    function invest(address beneficiary, uint256 weiAmount) internal {
        // _validatePurchase(beneficiary, weiAmount);
        require(beneficiary != address(0), "NCS: beneficiary is the zero address.");

        require(isOpen(), "NCS: sale did not start yet.");

        require(!hasEnded(), "NCS: sale is over.");

        require(isInWhiteList(beneficiary), "NCS: only address in whitelist can purchase.");

        require(weiAmount == INVEST_AMOUNT, "NCS: weiAmount must equal 0.1 ether.");

        // Update internal state
        weiRaised = weiRaised.add(weiAmount);

        investors.push(beneficiary);
        
        emit EVENT_INVEST(beneficiary, weiAmount);
    }

    function isInWhiteList(address beneficiary) public view returns (bool) {
        return whitelistCaps[beneficiary];
    }

    function isOpen() public view returns (bool) {
        return block.timestamp >= CROWDSALE_START_TIME;
    }

    function hasEnded() public view returns (bool) {
        return block.timestamp >= CROWDSALE_END_TIME || weiRaised >= HARDCAP;
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "NamplCrowdsale: balance not enough.");
        
        payable(founderWallet).transfer(address(this).balance);
    }

    // Whitelist
    function setWhitelist(address[] calldata accounts) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            whitelistCaps[accounts[i]] = true;
        }
    }

    function addWhitelist(address account) external onlyOwner {
        whitelistCaps[account] = true;
    }

    function getInvestors() public view returns (address[] memory){
        return investors;
    }
}


