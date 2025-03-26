
/**
 * Environment Variables Configuration
 * 
 * This file provides central access to all environment variables used in the application.
 * In production, these should be set in the deployment environment.
 */

// MongoDB Connection
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/defi-kyc-loan';

// Blockchain Network Configuration
export const BLOCKCHAIN_NETWORK = {
  // Network ID (1 for Ethereum Mainnet, 5 for Goerli Testnet, etc.)
  DEFAULT_CHAIN_ID: process.env.DEFAULT_CHAIN_ID || '5',
  // RPC endpoints for different networks
  RPC_ENDPOINTS: {
    '1': process.env.MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id',
    '5': process.env.GOERLI_RPC_URL || 'https://goerli.infura.io/v3/your-project-id',
    '11155111': process.env.SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/your-project-id',
  },
  // Block explorer URLs
  EXPLORER_URLS: {
    '1': 'https://etherscan.io',
    '5': 'https://goerli.etherscan.io',
    '11155111': 'https://sepolia.etherscan.io',
  }
};

// Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  // Production addresses
  PRODUCTION: {
    roleManagement: process.env.ROLE_MANAGEMENT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    kycContract: process.env.KYC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    loanManagement: process.env.LOAN_MANAGEMENT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    trustScore: process.env.TRUST_SCORE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  },
  // Testnet addresses (Goerli)
  TESTNET: {
    roleManagement: process.env.TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    kycContract: process.env.TESTNET_KYC_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    loanManagement: process.env.TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    trustScore: process.env.TESTNET_TRUST_SCORE_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
  }
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

// Application Settings
export const APP_CONFIG = {
  APP_NAME: 'TrustBond DeFi KYC & Loan Platform',
  VERSION: process.env.APP_VERSION || '1.0.0',
  DEBUG_MODE: process.env.NODE_ENV !== 'production',
  REQUIRED_DOCUMENT_TYPES: ['government_id', 'proof_of_address', 'selfie'],
};

// Get the appropriate contract addresses based on environment
export const getContractAddresses = () => {
  // Use testnet contracts for development and test environments
  if (process.env.NODE_ENV !== 'production') {
    return CONTRACT_ADDRESSES.TESTNET;
  }
  
  // Use production contracts for production environment
  return CONTRACT_ADDRESSES.PRODUCTION;
};

// Get the appropriate RPC URL based on chain ID
export const getRpcUrl = (chainId: string) => {
  return BLOCKCHAIN_NETWORK.RPC_ENDPOINTS[chainId as keyof typeof BLOCKCHAIN_NETWORK.RPC_ENDPOINTS] || 
    BLOCKCHAIN_NETWORK.RPC_ENDPOINTS[BLOCKCHAIN_NETWORK.DEFAULT_CHAIN_ID];
};

// Get the block explorer URL based on chain ID
export const getExplorerUrl = (chainId: string) => {
  return BLOCKCHAIN_NETWORK.EXPLORER_URLS[chainId as keyof typeof BLOCKCHAIN_NETWORK.EXPLORER_URLS] || 
    BLOCKCHAIN_NETWORK.EXPLORER_URLS[BLOCKCHAIN_NETWORK.DEFAULT_CHAIN_ID];
};
