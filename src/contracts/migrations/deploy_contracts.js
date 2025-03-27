
// Deployment script for Hardhat or Truffle

// Example deployment script for Truffle
/*
const RoleManagement = artifacts.require("RoleManagement");
const KYCContract = artifacts.require("KYCContract");
const TrustScore = artifacts.require("TrustScore");
const LoanManagement = artifacts.require("LoanManagement");

module.exports = async function(deployer, network, accounts) {
  // Deploy RoleManagement first
  await deployer.deploy(RoleManagement);
  const roleManagement = await RoleManagement.deployed();
  
  // Deploy KYCContract with RoleManagement address
  await deployer.deploy(KYCContract, roleManagement.address);
  const kycContract = await KYCContract.deployed();
  
  // Deploy TrustScore with RoleManagement and KYCContract addresses
  await deployer.deploy(TrustScore, roleManagement.address, kycContract.address);
  const trustScore = await TrustScore.deployed();
  
  // Deploy LoanManagement with RoleManagement and TrustScore addresses
  await deployer.deploy(LoanManagement, roleManagement.address, trustScore.address);
  const loanManagement = await LoanManagement.deployed();
  
  console.log({
    roleManagementAddress: roleManagement.address,
    kycContractAddress: kycContract.address,
    trustScoreAddress: trustScore.address,
    loanManagementAddress: loanManagement.address
  });
};
*/

// Example deployment script for Hardhat

/*
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Deploy RoleManagement
  const RoleManagement = await hre.ethers.getContractFactory("RoleManagement");
  const roleManagement = await RoleManagement.deploy();
  await roleManagement.deployed();
  console.log("RoleManagement deployed to:", roleManagement.address);
  
  // Deploy KYCContract
  const KYCContract = await hre.ethers.getContractFactory("KYCContract");
  const kycContract = await KYCContract.deploy(roleManagement.address);
  await kycContract.deployed();
  console.log("KYCContract deployed to:", kycContract.address);
  
  // Deploy TrustScore
  const TrustScore = await hre.ethers.getContractFactory("TrustScore");
  const trustScore = await TrustScore.deploy(roleManagement.address, kycContract.address);
  await trustScore.deployed();
  console.log("TrustScore deployed to:", trustScore.address);
  
  // Deploy LoanManagement
  const LoanManagement = await hre.ethers.getContractFactory("LoanManagement");
  const loanManagement = await LoanManagement.deploy(roleManagement.address, trustScore.address);
  await loanManagement.deployed();
  console.log("LoanManagement deployed to:", loanManagement.address);
  
  console.log({
    roleManagementAddress: roleManagement.address,
    kycContractAddress: kycContract.address,
    trustScoreAddress: trustScore.address,
    loanManagementAddress: loanManagement.address
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
*/

// Direct deployment for testing with Ganache
// Use this script with Node.js to deploy the contracts to a Ganache instance

const { ethers } = require('ethers');
const fs = require('fs');

// Contract ABIs and Bytecode
const RoleManagementArtifact = require('../build/RoleManagement.json');
const KYCContractArtifact = require('../build/KYCContract.json');
const TrustScoreArtifact = require('../build/TrustScore.json');
const LoanManagementArtifact = require('../build/LoanManagement.json');

async function main() {
  // Connect to Ganache
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
  const signer = provider.getSigner(0); // Use the first account
  
  console.log("Deploying contracts with account:", await signer.getAddress());
  
  // Deploy RoleManagement
  const RoleManagementFactory = new ethers.ContractFactory(
    RoleManagementArtifact.abi,
    RoleManagementArtifact.bytecode,
    signer
  );
  const roleManagement = await RoleManagementFactory.deploy();
  await roleManagement.deployed();
  console.log("RoleManagement deployed to:", roleManagement.address);
  
  // Deploy KYCContract
  const KYCContractFactory = new ethers.ContractFactory(
    KYCContractArtifact.abi,
    KYCContractArtifact.bytecode,
    signer
  );
  const kycContract = await KYCContractFactory.deploy(roleManagement.address);
  await kycContract.deployed();
  console.log("KYCContract deployed to:", kycContract.address);
  
  // Deploy TrustScore
  const TrustScoreFactory = new ethers.ContractFactory(
    TrustScoreArtifact.abi,
    TrustScoreArtifact.bytecode,
    signer
  );
  const trustScore = await TrustScoreFactory.deploy(roleManagement.address, kycContract.address);
  await trustScore.deployed();
  console.log("TrustScore deployed to:", trustScore.address);
  
  // Deploy LoanManagement
  const LoanManagementFactory = new ethers.ContractFactory(
    LoanManagementArtifact.abi,
    LoanManagementArtifact.bytecode,
    signer
  );
  const loanManagement = await LoanManagementFactory.deploy(roleManagement.address, trustScore.address);
  await loanManagement.deployed();
  console.log("LoanManagement deployed to:", loanManagement.address);
  
  // Save the deployed addresses
  const addresses = {
    roleManagementAddress: roleManagement.address,
    kycContractAddress: kycContract.address,
    trustScoreAddress: trustScore.address,
    loanManagementAddress: loanManagement.address
  };
  
  console.log("Deployed addresses:", addresses);
  
  // Write to .env file
  const envContent = `
# Blockchain Configuration
VITE_INFURA_API_KEY=your_infura_api_key
VITE_ALCHEMY_API_KEY=your_alchemy_api_key

# Contract Addresses for Ganache (Chain ID: 5777)
VITE_ROLE_MANAGEMENT_ADDRESS_5777=${roleManagement.address}
VITE_KYC_CONTRACT_ADDRESS_5777=${kycContract.address}
VITE_LOAN_MANAGEMENT_ADDRESS_5777=${loanManagement.address}
VITE_TRUST_SCORE_ADDRESS_5777=${trustScore.address}

# API URLs
VITE_API_URL=http://localhost:3000/api
VITE_GANACHE_RPC_URL=http://127.0.0.1:7545

# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017/trustbond

# Security
VITE_JWT_SECRET=your_jwt_secret_key
`;
  
  fs.writeFileSync('.env.local', envContent);
  console.log("Contract addresses written to .env.local");
}

// Uncomment to run directly with Node.js
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = { main };
