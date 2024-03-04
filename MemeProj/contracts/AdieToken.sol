// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdieToken is ERC20, Ownable {

    mapping(address => uint256) private _stakesAdie;
    mapping(address => uint256) private recentStake;
    uint256 private _rewardRate = 7;
    uint256 private lockInPeriod = 60; 

    constructor(address initialOwner) 
        ERC20("AdieToken", "ATKN") 
        Ownable(initialOwner)
    {}

    function mintos(address to, uint256 amount) public {
        uint256 RefinedAmount = amount * 1e18;
        _mint(to, RefinedAmount);
    }

    function stakos(uint256 amount) public {
        uint256 RefinedAmount = amount * 1e18;

        require(RefinedAmount > 0, "Unable to stake zero tokens");
        require(balanceOf(msg.sender) >= RefinedAmount, "Not enough funds available");

        _stakesAdie[msg.sender] += RefinedAmount;
        recentStake[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), RefinedAmount);
  }

    function ObtainStake(address account) public view returns (uint256) {
        uint256 stakedInWei = _stakesAdie[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }

    function withdraw() public {
        require(block.timestamp > (recentStake[msg.sender] + lockInPeriod), "Withdrawal of funds is prohibited as you are still within the lock-in period.");
        require(_stakesAdie[msg.sender] > 0, "There are no tokens currently staked");

        uint256 stakedAmount = _stakesAdie[msg.sender];
        uint256 reward = ((block.timestamp - recentStake[msg.sender]) * _rewardRate) * 1e18;

        _stakesAdie[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }

    function ObtainWithdrawal(address account) public view returns (uint256) {
        uint256 stakedAmount = _stakesAdie[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - recentStake[account]) * _rewardRate);

        uint256 total = reward + stakedAmount; 
        return total;
  }

     function getStakeTimeElapsed(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - recentStake[account]);
        return time;
  } 

    function getLastStakeTimestamp(address account) public view returns (uint256) {
        return recentStake[account];
  }
}