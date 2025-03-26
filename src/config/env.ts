
/**
 * Environment Variables Configuration
 * 
 * This file provides central access to all environment variables used in the application.
 * In Vite, environment variables are accessed via import.meta.env instead of process.env
 */

// MongoDB Connection
export const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/defi-kyc-loan';

// Blockchain Network Configuration
export const BLOCKCHAIN_NETWORK = {
  // Network ID (1 for Ethereum Mainnet, 5 for Goerli Testnet, 5777 for Ganache)
  DEFAULT_CHAIN_ID: import.meta.env.VITE_DEFAULT_CHAIN_ID || '5777',
  // RPC endpoints for different networks
  RPC_ENDPOINTS: {
    '1': import.meta.env.VITE_MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id',
    '5': import.meta.env.VITE_GOERLI_RPC_URL || 'https://goerli.infura.io/v3/your-project-id',
    '11155111': import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/your-project-id',
    '5777': import.meta.env.VITE_GANACHE_RPC_URL || 'http://127.0.0.1:7545',
  },
  // Block explorer URLs
  EXPLORER_URLS: {
    '1': 'https://etherscan.io',
    '5': 'https://goerli.etherscan.io',
    '11155111': 'https://sepolia.etherscan.io',
    '5777': '#', // Local Ganache has no explorer
  }
};

// Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  // Production addresses
  PRODUCTION: {
    roleManagement: import.meta.env.VITE_ROLE_MANAGEMENT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    kycContract: import.meta.env.VITE_KYC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    loanManagement: import.meta.env.VITE_LOAN_MANAGEMENT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    trustScore: import.meta.env.VITE_TRUST_SCORE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  },
  // Testnet addresses (Goerli)
  TESTNET: {
    roleManagement: import.meta.env.VITE_TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    kycContract: import.meta.env.VITE_TESTNET_KYC_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    loanManagement: import.meta.env.VITE_TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
    trustScore: import.meta.env.VITE_TESTNET_TRUST_SCORE_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890',
  },
  // Local Ganache addresses (for development)
  GANACHE: {
    roleManagement: '0x8d2b0Bf086880A32eAA3a3d5a6a5f6eb1AF32D24', // Replace with your deployed contract address
    kycContract: '0xf3E3EfbB1CD7AD01a19a1e46c3C24F32F1f9c167', // Replace with your deployed contract address
    loanManagement: '0xD21A7e58Fb0F1F77a55F4fa37814842E2e4C399b', // Replace with your deployed contract address
    trustScore: '0x3a1c85f2425e658091AFAB83DEa4E2c0ac20dDB0', // Replace with your deployed contract address
  }
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

// Application Settings
export const APP_CONFIG = {
  APP_NAME: 'TrustBond DeFi KYC & Loan Platform',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEBUG_MODE: import.meta.env.MODE !== 'production',
  REQUIRED_DOCUMENT_TYPES: ['government_id', 'proof_of_address', 'selfie'],
  FILE_UPLOAD_RESTRICTIONS: {
    allowedFileTypes: ['text/plain', 'application/pdf', 'image/jpeg', 'image/png'],
    maxFileSizeInMB: 5,
    textOnlyForDocuments: true,
  },
};

// Get the appropriate contract addresses based on environment
export const getContractAddresses = () => {
  // Check if we're using local Ganache
  if (BLOCKCHAIN_NETWORK.DEFAULT_CHAIN_ID === '5777') {
    return CONTRACT_ADDRESSES.GANACHE;
  }
  
  // Use testnet contracts for development and test environments
  if (import.meta.env.MODE !== 'production') {
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
