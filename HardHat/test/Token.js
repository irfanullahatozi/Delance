// const { ethers } = require("hardhat");
// const { expect } = require("chai");
// const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// describe("Token Contract", function () {
//   async function deployTokenFixture() {
//     const Token = await ethers.getContractFactory("Token");
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const hardhatToken = await Token.deploy();

//     await hardhatToken.deployed();

//     // Fixtures can return anything you consider useful for your tests
//     return { Token, hardhatToken, owner, addr1, addr2 };
//   }

//   describe("Deployment", () => {
//     it("Check the the contract is deployed to the right owner", async () => {
//       const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
//       expect(await hardhatToken.owner()).to.equal(owner.address);
//     });

//     it("Check the supply token to the owner", async () => {
//       const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
//       const ownerBalance = await hardhatToken.balanceOf(owner.address);
//       expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });
//   });

//   describe("Token Contract Transaction", () => {
//     it("Token tranfer from owner account to address1 account", async () => {
//       const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);

//       await hardhatToken.transfer(addr1.address, 50);

//       expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
//     });

//     it("Token tranfer from address1 account to address2 account", async () => {
//       const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
//         deployTokenFixture
//       );

//       // await hardhatToken.transfer(addr1.address, 50);
//       // await hardhatToken.connect(addr1).transfer(addr2.address,30);

//       expect(
//         await hardhatToken.transfer(addr1.address, 50)
//       ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

//       expect(
//         await hardhatToken.connect(addr1).transfer(addr2.address, 30)
//       ).to.changeTokenBalance(hardhatToken, [addr1, addr2], [-30, 30]);
//     });

//     it("Check Transfer emit event", async () => {
//       const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
//         deployTokenFixture
//       );

//       await expect(hardhatToken.transfer(addr1.address, 50))
//         .to.emit(hardhatToken, "Transfer")
//         .withArgs(owner.address, addr1.address, 50);

//       await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
//         .to.emit(hardhatToken, "Transfer")
//         .withArgs(addr1.address, addr2.address, 50);
//     });

//     it("Should fail if sender doesn't have enough tokens", async function () {
//       const { hardhatToken, owner, addr1 } = await loadFixture(
//         deployTokenFixture
//       );
//       const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

//       // Try to send 1 token from addr1 (0 tokens) to owner.
//       // `require` will evaluate false and revert the transaction.
//       await expect(
//         hardhatToken.connect(addr1).transfer(owner.address, 1)
//       ).to.be.revertedWith("Not enough tokens");

//       // Owner balance shouldn't have changed.
//       expect(await hardhatToken.balanceOf(owner.address)).to.equal(
//         initialOwnerBalance
//       );
//     });
//   });
// });
