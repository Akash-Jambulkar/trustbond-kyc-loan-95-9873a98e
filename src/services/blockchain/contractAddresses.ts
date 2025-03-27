
import { APP_CONFIG } from '../../config/env';

// Get the chain ID from localStorage if available, otherwise use default
const getChainId = () => {
  const storedChainId = localStorage.getItem('chainId');
  return storedChainId ? parseInt(storedChainId) : APP_CONFIG.DEFAULT_CHAIN_ID;
};

// Export contract addresses based on current chain ID
export const CONTRACT_ADDRESSES = (() => {
  const chainId = getChainId();
  
  // Check if we have addresses for this chain
  if (APP_CONFIG.CONTRACT_ADDRESSES[chainId]) {
    return APP_CONFIG.CONTRACT_ADDRESSES[chainId];
  }
  
  // Fallback to default chain if current chain isn't supported
  console.warn(`No contract addresses found for chain ID ${chainId}, using default chain addresses`);
  return APP_CONFIG.CONTRACT_ADDRESSES[APP_CONFIG.DEFAULT_CHAIN_ID];
})();

// Function to update addresses when chain changes
export const updateContractAddresses = (chainId: number) => {
  // Store the new chain ID
  localStorage.setItem('chainId', chainId.toString());
  
  // Return appropriate contract addresses for the chain
  if (APP_CONFIG.CONTRACT_ADDRESSES[chainId]) {
    return APP_CONFIG.CONTRACT_ADDRESSES[chainId];
  }
  
  // Fallback if needed
  console.warn(`No contract addresses found for chain ID ${chainId}, using default chain addresses`);
  return APP_CONFIG.CONTRACT_ADDRESSES[APP_CONFIG.DEFAULT_CHAIN_ID];
};
