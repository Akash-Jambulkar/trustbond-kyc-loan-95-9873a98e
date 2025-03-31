
const RoleManagement = artifacts.require("RoleManagement");
const KYCContract = artifacts.require("KYCContract");
const TrustScore = artifacts.require("TrustScore");
const LoanManagement = artifacts.require("LoanManagement");
const fs = require('fs');
const path = require('path');

module.exports = async function(deployer, network, accounts) {
  console.log("Deploying contracts with account:", accounts[0]);
  
  // Deploy RoleManagement first
  await deployer.deploy(RoleManagement);
  const roleManagement = await RoleManagement.deployed();
  console.log("RoleManagement deployed to:", roleManagement.address);
  
  // Deploy KYCContract with RoleManagement address
  await deployer.deploy(KYCContract, roleManagement.address);
  const kycContract = await KYCContract.deployed();
  console.log("KYCContract deployed to:", kycContract.address);
  
  // Deploy TrustScore with RoleManagement and KYCContract addresses
  await deployer.deploy(TrustScore, roleManagement.address, kycContract.address);
  const trustScore = await TrustScore.deployed();
  console.log("TrustScore deployed to:", trustScore.address);
  
  // Deploy LoanManagement with RoleManagement and TrustScore addresses
  await deployer.deploy(LoanManagement, roleManagement.address, trustScore.address);
  const loanManagement = await LoanManagement.deployed();
  console.log("LoanManagement deployed to:", loanManagement.address);
  
  // Create addresses object
  const addresses = {
    roleManagementAddress: roleManagement.address,
    kycContractAddress: kycContract.address,
    trustScoreAddress: trustScore.address,
    loanManagementAddress: loanManagement.address
  };
  
  console.log("Deployed addresses:", addresses);
  
  // If we're in development network, write to .env.local file
  if (network === 'development') {
    // Read current .env file if it exists
    let envContent = '';
    const envPath = path.resolve('.env.local');
    
    try {
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
    } catch (err) {
      console.error("Error reading existing .env file:", err);
    }
    
    // Replace or add contract addresses
    if (envContent) {
      // Update existing entries
      envContent = envContent
        .replace(/VITE_ROLE_MANAGEMENT_ADDRESS_5777=.*/g, `VITE_ROLE_MANAGEMENT_ADDRESS_5777=${roleManagement.address}`)
        .replace(/VITE_KYC_CONTRACT_ADDRESS_5777=.*/g, `VITE_KYC_CONTRACT_ADDRESS_5777=${kycContract.address}`)
        .replace(/VITE_TRUST_SCORE_ADDRESS_5777=.*/g, `VITE_TRUST_SCORE_ADDRESS_5777=${trustScore.address}`)
        .replace(/VITE_LOAN_MANAGEMENT_ADDRESS_5777=.*/g, `VITE_LOAN_MANAGEMENT_ADDRESS_5777=${loanManagement.address}`);
    } else {
      // Create new .env file
      envContent = `
# Blockchain Configuration
VITE_INFURA_API_KEY=your_infura_api_key
VITE_ALCHEMY_API_KEY=your_alchemy_api_key

# Contract Addresses for Ganache (Chain ID: 5777)
VITE_ROLE_MANAGEMENT_ADDRESS_5777=${roleManagement.address}
VITE_KYC_CONTRACT_ADDRESS_5777=${kycContract.address}
VITE_TRUST_SCORE_ADDRESS_5777=${trustScore.address}
VITE_LOAN_MANAGEMENT_ADDRESS_5777=${loanManagement.address}

# API URLs
VITE_API_URL=http://localhost:3000/api
VITE_GANACHE_RPC_URL=http://127.0.0.1:7545

# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017/trustbond

# Security
VITE_JWT_SECRET=your_jwt_secret_key
`;
    }
    
    // Write updated content to .env.local
    fs.writeFileSync(envPath, envContent);
    console.log("Contract addresses written to .env.local");
    
    // Also update the contract addresses in the config
    try {
      updateContractAddresses(addresses);
    } catch (err) {
      console.error("Error updating contract addresses in config:", err);
    }
  }
};

// Function to update contract addresses in the appropriate config file
function updateContractAddresses(addresses) {
  const configPath = path.resolve('src/config/env.ts');
  
  if (fs.existsSync(configPath)) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Update the Ganache contract addresses
    configContent = configContent
      .replace(/GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS: z\.string\(\)\.default\('.*?'\)/g, 
               `GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('${addresses.roleManagementAddress}')`)
      .replace(/GANACHE_KYC_CONTRACT_ADDRESS: z\.string\(\)\.default\('.*?'\)/g, 
               `GANACHE_KYC_CONTRACT_ADDRESS: z.string().default('${addresses.kycContractAddress}')`)
      .replace(/GANACHE_TRUST_SCORE_CONTRACT_ADDRESS: z\.string\(\)\.default\('.*?'\)/g, 
               `GANACHE_TRUST_SCORE_CONTRACT_ADDRESS: z.string().default('${addresses.trustScoreAddress}')`)
      .replace(/GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS: z\.string\(\)\.default\('.*?'\)/g, 
               `GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('${addresses.loanManagementAddress}')`);
    
    fs.writeFileSync(configPath, configContent);
    console.log("Contract addresses updated in config file");
  }
}
