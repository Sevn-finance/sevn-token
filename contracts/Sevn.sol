// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./library/Mintable.sol";

contract Sevn is ERC20, Ownable, Mintable{

    uint256 public constant preMineSupply = 10000000 * 1e18; // 10 000 000
    uint256 public constant maxSupply = 500000000 * 1e18; // 500 000 000

    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        _addMinter(msg.sender);
        _mint(msg.sender, preMineSupply);
    }

    function burn(uint256 _amount) public onlyOwner {
        _burn(msg.sender, _amount);
    }

    function mint(address _to, uint256 _amount) public onlyMinter returns(bool) {
        _mint(_to, _amount);
        require(totalSupply() <= maxSupply, "SEVN: totalSupply can not > maxSupply");
        return true;
    }

    function addMinter(address _minter) public onlyOwner returns (bool) {
        require(_minter != address(0), "SEVN: _minter is the zero address");
        return _addMinter(_minter);
    }

    function delMinter(address _minter) public onlyOwner returns (bool) {
        require(_minter != address(0), "SEVN: _minter is the zero address");
        return _delMinter(_minter);
    }
    
}   