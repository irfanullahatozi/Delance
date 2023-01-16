const { ethers } = require("hardhat");
const { getEpochTime } = require("./helper");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Delance Contract", () => {
  async function deployDelanceFixture() {
    const Token = await ethers.getContractFactory("Delance");
    const [employer, freelancer] = await ethers.getSigners();

    const deadline = getEpochTime();
    const hardhatDelance = await Token.deploy(freelancer.address, deadline, {
      value: ethers.utils.parseEther("5.0"),
    });

    await hardhatDelance.deployed();
    return { Token, hardhatDelance, employer, freelancer, deadline };
  }

  describe("Deployment", () => {
    it("Check the contract is deployed by the employer", async () => {
      const { hardhatDelance, employer } = await loadFixture(
        deployDelanceFixture
      );
      expect(await hardhatDelance.employer()).to.equal(employer.address);
    });

    it("Check the freelancer of the contract", async () => {
      const { hardhatDelance, freelancer } = await loadFixture(
        deployDelanceFixture
      );
      expect(await hardhatDelance.freelancer()).to.equal(freelancer.address);
    });

    it("Check the contract balance of the project", async () => {
      const { hardhatDelance } = await loadFixture(deployDelanceFixture);
      expect(ethers.utils.formatEther(await hardhatDelance.price())).to.equal(
        "5.0"
      );
    });

    it("Check the deadline of the project", async () => {
      const { hardhatDelance, deadline } = await loadFixture(
        deployDelanceFixture
      );
      expect(await hardhatDelance.deadline()).to.equal(deadline);
    });
  });
  describe("Transaction", () => {
    it("Freelancer create request", async () => {
      const { hardhatDelance, deadline, freelancer } = await loadFixture(
        deployDelanceFixture
      );
      requestAmount = ethers.utils.parseEther("1.0");
      const request = await hardhatDelance
        .connect(freelancer)
        .createRequest("task1", requestAmount);
      const allRequest = await hardhatDelance.getAllRequest();
      const lastindex = allRequest.length - 1;
      const pushRequest = await hardhatDelance.requests(lastindex);
      console.log(pushRequest);
    });

    it("Freelancer create request event emit test", async () => {
      const { hardhatDelance, freelancer } = await loadFixture(
        deployDelanceFixture
      );
      const requestAmount = ethers.utils.parseEther("1.0");
      const requesttitle = "Request1";
      const request = await hardhatDelance
        .connect(freelancer)
        .createRequest(requesttitle, requestAmount);
      expect(
        await hardhatDelance
          .connect(freelancer)
          .createRequest("task1", requestAmount)
      )
        .to.emit(hardhatDelance, "RequestCreated")
        .withArgs(requesttitle, requestAmount, false, true);
    });

    it("Get all freelancer request", async () => {
      const { hardhatDelance, freelancer } = await loadFixture(
        deployDelanceFixture
      );
    });
  });
});
