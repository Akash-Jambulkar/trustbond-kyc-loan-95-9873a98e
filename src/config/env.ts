
import { z } from 'zod';

// Environment Variable Schema
const envSchema = z.object({
  // MongoDB
  MONGODB_URI: z.string().default('mongodb://localhost:27017/defi-kyc-loan'),
  
  // Network Configuration
  DEFAULT_CHAIN_ID: z.string().default('5777'),
  MAINNET_RPC_URL: z.string().default('https://mainnet.infura.io/v3/your-project-id'),
  GOERLI_RPC_URL: z.string().default('https://goerli.infura.io/v3/your-project-id'),
  SEPOLIA_RPC_URL: z.string().default('https://sepolia.infura.io/v3/your-project-id'),
  GANACHE_RPC_URL: z.string().default('http://127.0.0.1:7545'),
  
  // Smart Contract Addresses - Production
  ROLE_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0x0000000000000000000000000000000000000000'),
  KYC_CONTRACT_ADDRESS: z.string().default('0x0000000000000000000000000000000000000000'),
  LOAN_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0x0000000000000000000000000000000000000000'),
  TRUST_SCORE_CONTRACT_ADDRESS: z.string().default('0x0000000000000000000000000000000000000000'),
  
  // Smart Contract Addresses - Testnet
  TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0x1234567890123456789012345678901234567890'),
  TESTNET_KYC_CONTRACT_ADDRESS: z.string().default('0x1234567890123456789012345678901234567890'),
  TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0x1234567890123456789012345678901234567890'),
  TESTNET_TRUST_SCORE_CONTRACT_ADDRESS: z.string().default('0x1234567890123456789012345678901234567890'),
  
  // Smart Contract Addresses - Ganache (Local Development)
  GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0x8d2b0Bf086880A32eAA3a3d5a6a5f6eb1AF32D24'),
  GANACHE_KYC_CONTRACT_ADDRESS: z.string().default('0xf3E3EfbB1CD7AD01a19a1e46c3C24F32F1f9c167'),
  GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS: z.string().default('0xD21A7e58Fb0F1F77a55F4fa37814842E2e4C399b'),
  GANACHE_TRUST_SCORE_CONTRACT_ADDRESS: z.string().default('0x3a1c85f2425e658091AFAB83DEa4E2c0ac20dDB0'),
  
  // API Configuration
  API_BASE_URL: z.string().default('http://localhost:3000/api'),
  
  // Application Settings
  APP_VERSION: z.string().default('1.0.0')
});

// Get environment variables using import.meta.env (Vite's way of accessing env variables)
const getEnvVars = () => {
  return {
    // MongoDB
    MONGODB_URI: import.meta.env.VITE_MONGODB_URI,
    
    // Network Configuration
    DEFAULT_CHAIN_ID: import.meta.env.VITE_DEFAULT_CHAIN_ID,
    MAINNET_RPC_URL: import.meta.env.VITE_MAINNET_RPC_URL,
    GOERLI_RPC_URL: import.meta.env.VITE_GOERLI_RPC_URL,
    SEPOLIA_RPC_URL: import.meta.env.VITE_SEPOLIA_RPC_URL,
    GANACHE_RPC_URL: import.meta.env.VITE_GANACHE_RPC_URL,
    
    // Smart Contract Addresses - Production
    ROLE_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_ROLE_MANAGEMENT_CONTRACT_ADDRESS,
    KYC_CONTRACT_ADDRESS: import.meta.env.VITE_KYC_CONTRACT_ADDRESS,
    LOAN_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_LOAN_MANAGEMENT_CONTRACT_ADDRESS,
    TRUST_SCORE_CONTRACT_ADDRESS: import.meta.env.VITE_TRUST_SCORE_CONTRACT_ADDRESS,
    
    // Smart Contract Addresses - Testnet
    TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS,
    TESTNET_KYC_CONTRACT_ADDRESS: import.meta.env.VITE_TESTNET_KYC_CONTRACT_ADDRESS,
    TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS,
    TESTNET_TRUST_SCORE_CONTRACT_ADDRESS: import.meta.env.VITE_TESTNET_TRUST_SCORE_CONTRACT_ADDRESS,
    
    // Smart Contract Addresses - Ganache (Local Development)
    GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS,
    GANACHE_KYC_CONTRACT_ADDRESS: import.meta.env.VITE_GANACHE_KYC_CONTRACT_ADDRESS,
    GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS: import.meta.env.VITE_GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS,
    GANACHE_TRUST_SCORE_CONTRACT_ADDRESS: import.meta.env.VITE_GANACHE_TRUST_SCORE_CONTRACT_ADDRESS,
    
    // API Configuration
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    
    // Application Settings
    APP_VERSION: import.meta.env.VITE_APP_VERSION
  };
};

// Parse environment variables with fallbacks
export const ENV = envSchema.parse(getEnvVars());

// File upload restrictions
const fileUploadRestrictions = {
  allowedFileTypes: ['text/plain', 'application/pdf', 'image/jpeg', 'image/png'],
  maxFileSizeInMB: 5,
  textOnlyForDocuments: true
};

// Exported app configuration
export const APP_CONFIG = {
  // MongoDB
  MONGODB_URI: ENV.MONGODB_URI,
  
  // Chain Configuration
  DEFAULT_CHAIN_ID: parseInt(ENV.DEFAULT_CHAIN_ID),
  RPC_URLS: {
    1: ENV.MAINNET_RPC_URL,    // Ethereum Mainnet
    5: ENV.GOERLI_RPC_URL,     // Goerli Testnet
    11155111: ENV.SEPOLIA_RPC_URL, // Sepolia Testnet
    5777: ENV.GANACHE_RPC_URL  // Ganache Local
  },
  
  // Contract Addresses by Network
  CONTRACT_ADDRESSES: {
    // Mainnet
    1: {
      roleManagement: ENV.ROLE_MANAGEMENT_CONTRACT_ADDRESS,
      kycContract: ENV.KYC_CONTRACT_ADDRESS,
      loanManagement: ENV.LOAN_MANAGEMENT_CONTRACT_ADDRESS,
      trustScore: ENV.TRUST_SCORE_CONTRACT_ADDRESS
    },
    // Testnet (Goerli)
    5: {
      roleManagement: ENV.TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS,
      kycContract: ENV.TESTNET_KYC_CONTRACT_ADDRESS,
      loanManagement: ENV.TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS,
      trustScore: ENV.TESTNET_TRUST_SCORE_CONTRACT_ADDRESS
    },
    // Ganache Local
    5777: {
      roleManagement: ENV.GANACHE_ROLE_MANAGEMENT_CONTRACT_ADDRESS,
      kycContract: ENV.GANACHE_KYC_CONTRACT_ADDRESS,
      loanManagement: ENV.GANACHE_LOAN_MANAGEMENT_CONTRACT_ADDRESS,
      trustScore: ENV.GANACHE_TRUST_SCORE_CONTRACT_ADDRESS
    }
  },
  
  // API
  API_BASE_URL: ENV.API_BASE_URL,
  
  // App Settings
  APP_VERSION: ENV.APP_VERSION,
  
  // File Upload
  FILE_UPLOAD_RESTRICTIONS: fileUploadRestrictions
};
