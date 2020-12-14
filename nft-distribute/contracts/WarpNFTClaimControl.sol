pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./WarpNFTFactory.sol";

contract WarpNFTClaimControl is Ownable {
  WarpNFTFactory public WNFTF;

  string public epicURI;
  string public legendaryURI;
  string public rareURI;
  string public socialURI;


  address[] public epicList;
  address[] public legendaryList;
  address[] public rareList;
  address[] public socialList;

  mapping(address => bool) public epicWhiteList;
  mapping(address => bool) public legendaryWhiteList;
  mapping(address => bool) public rareWhiteList;
  mapping(address => bool) public socialWhiteList;
  mapping(address => bool) public epicClaimed;
  mapping(address => bool) public legendaryClaimed;
  mapping(address => bool) public rareClaimed;
  mapping(address => bool) public socialClaimed;

/**
@notice the constructor function is fired only once during contract deployment
@param _NFTfactory is the address of the WarpNFTFactory contract
@param _epic is the URI specific to the epic NFT metadata
@param _legendary is the URI specific to the legendary NFT metadata
@param _rare is the URI specific to the rare NFT metadata
@param _social is the URI specific to the social NFT metadata
**/
  constructor(
    WarpNFTFactory _NFTfactory,
    string memory _epic,
    string memory _legendary,
    string memory _rare,
    string memory _social
  ) public {
    WNFTF = _NFTfactory;
    epicURI = _epic;
    legendaryURI = _legendary;
    rareURI = _rare;
    socialURI = _social;
  }

/**
@notice epicWhiteLister takes in an array of addresses and whitelists them to receive the epic NFT
@param _addresses is an array of addresses to be whitelisted
@dev this function is protected by the onlyOwner modifier and can only be called by the owner of this contract
**/
function epicWhiteLister(address[] memory _addresses) public onlyOwner {
    for (uint256 i = 0; i < _addresses; ++i) {
        epicWhiteList[_addresses[i]] = true;
        epicList.push(_addresses[i]);
    }
}

/**
@notice legendaryWhiteLister takes in an array of addresses and whitelists them to receive the legendary NFT
@param _addresses is an array of addresses to be whitelisted
@dev this function is protected by the onlyOwner modifier and can only be called by the owner of this contract
**/
function legendaryWhiteLister(address[] memory _addresses) public onlyOwner {
    for (uint256 i = 0; i < _addresses; ++i) {
        legendaryWhiteList[_addresses[i]] = true;
        legendaryList.push(_addresses[i]);
    }
}

/**
@notice rareWhiteLister takes in an array of addresses and whitelists them to receive the rare NFT
@param _addresses is an array of addresses to be whitelisted
@dev this function is protected by the onlyOwner modifier and can only be called by the owner of this contract
**/
function rareWhiteLister(address[] memory _addresses) public onlyOwner {
    for (uint256 i = 0; i < _addresses; ++i) {
        rareWhiteList[_addresses[i]] = true;
        rareList.push(_addresses[i]);
    }
}

/**
@notice socialWhiteLister takes in an array of addresses and whitelists them to receive the social NFT
@param _addresses is an array of addresses to be whitelisted
@dev this function is protected by the onlyOwner modifier and can only be called by the owner of this contract
**/
function socialWhiteLister(address[] memory _addresses) public onlyOwner {
    for (uint256 i = 0; i < _addresses; ++i) {
        socialWhiteList[_addresses[i]] = true;
        socialList.push(_addresses[i]);
    }
}

/**
@notice claimNFTs is a public function that allows a end user to claim ALL of the NFT's they are owed by the warp platform
@dev this function uses the address whitelists to distribute the appropriate NFT's to warp users
**/
function claimNFTs() public {
  require(socialClaimed[msg.sender] == false);
  require(socialWhiteList[msg.sender] == true);
  WNFTF.mintNewNFT(msg.sender, socialURI);
  socialClaimed[msg.sender] = true;

  if(epicWhiteList[msg.sender] == true) {
    require(epicClaimed[msg.sender] == false);
    WNFTF.mintNewNFT(msg.sender, epicURI);
    epicClaimed[msg.sender] = true;
  }

  if(legendaryWhiteList[msg.sender] == true) {
    require(legendaryClaimed[msg.sender] == false);
    WNFTF.mintNewNFT(msg.sender, epicURI);
    legendaryClaimed[msg.sender] = true;
  }

  if(rareWhiteList[msg.sender] == true) {
    require(rareClaimed[msg.sender] == false);
    WNFTF.mintNewNFT(msg.sender, epicURI);
    rareClaimed[msg.sender] = true;
  }
}

}
