// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage {
    uint256 public tokenCounter;

    struct NFTTransaction {
        address buyer;
        uint256 price;
        uint256 timestamp;
    }

    mapping(uint256 => uint256) public tokenPrices;
    mapping(uint256 => string) public tokenData;
    mapping(uint256 => NFTTransaction[]) public nftHistory;


    event NFTCreated(uint256 indexed tokenId, address indexed to, string tokenDataJson, uint256 price, string blockchain);
    event NFTEdited(uint256 indexed tokenId, string oldData, string newData);
    event NFTDeleted(uint256 indexed tokenId);
    event NFTBought(
        uint256 indexed tokenId,
        uint256 valueSent,
        uint256 tokenPrice,
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
    }

    function createNFT(address to, string memory tokenDataJson, uint256 price) public returns (uint256) {
        require(price > 0, "Price must be greater than zero");

        tokenCounter += 1;
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        tokenData[tokenId] = tokenDataJson;
        tokenPrices[tokenId] = price;

        emit NFTCreated(tokenId, to, tokenDataJson, price, tokenData[tokenId]);

        return tokenId;
    }

    function editNFT(uint256 tokenId, address userAddress, string memory newTokenDataJson, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        require(ownerOf(tokenId) == userAddress, "Only the owner can edit this NFT");
        require(bytes(tokenData[tokenId]).length > 0, "Token ID does not exist");

        string memory oldData = tokenData[tokenId];
        tokenData[tokenId] = newTokenDataJson;
        tokenPrices[tokenId] = price;

        emit NFTEdited(tokenId, oldData, newTokenDataJson);
    }

    function deleteNFT(uint256 tokenId, address userAddress) public {
        require(ownerOf(tokenId) == userAddress, "Only the owner can delete this NFT");

        delete tokenData[tokenId];
        delete tokenPrices[tokenId];

        _burn(tokenId);

        emit NFTDeleted(tokenId);
    }

    function buyNFT(uint256 tokenId, address buyerAddress) public payable {
        uint256 price = tokenPrices[tokenId];
        require(buyerAddress != ownerOf(tokenId), "Buyer is already the owner of this NFT");
        require(address(buyerAddress).balance >= price, "Buyer does not have enough balance");

        NFTTransaction memory newTransaction = NFTTransaction({
            buyer: buyerAddress,
            price: price,
            timestamp: block.timestamp
        });

        nftHistory[tokenId].push(newTransaction);

        address previousOwner = ownerOf(tokenId);
        _transfer(previousOwner, buyerAddress, tokenId);
        payable(previousOwner).transfer(price);

        emit NFTBought(tokenId, msg.value, price, previousOwner, buyerAddress);
    }

    function getTokenData(uint256 tokenId) public view returns (string memory) {
        return tokenData[tokenId];
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return tokenPrices[tokenId];
    }

    function getNftHistory(uint256 tokenId) public view returns (NFTTransaction[] memory) {
        return nftHistory[tokenId];
    }
}
