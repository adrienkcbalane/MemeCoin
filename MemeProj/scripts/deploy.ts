import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("AdieToken", ["0x88616cD668BF3c4028E788887Ad345B0D936bAC1"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});