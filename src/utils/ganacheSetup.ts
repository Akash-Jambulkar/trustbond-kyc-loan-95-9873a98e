
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { APP_CONFIG } from '../config/env';

/**
 * Helper function to check if Ganache is running and properly set up
 */
export const checkGanacheConnection = async (): Promise<boolean> => {
  try {
    // Create a JsonRpcProvider connection to Ganache
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    
    // Try to get the network - this will fail if Ganache isn't running
    const network = await provider.getNetwork();
    
    if (network.chainId === 5777) {
      console.log("Successfully connected to Ganache");
      return true;
    }
    
    console.error("Connected to a network, but it's not Ganache (chainId: 5777)");
    toast.error("Connected to the wrong network. Please make sure Ganache is running.");
    return false;
  } catch (error) {
    console.error("Failed to connect to Ganache:", error);
    toast.error("Failed to connect to Ganache. Please make sure it's running on http://127.0.0.1:7545");
    return false;
  }
};

/**
 * Add Ganache network to MetaMask if it doesn't exist
 */
export const addGanacheToMetaMask = async (): Promise<boolean> => {
  if (!window.ethereum) {
    toast.error("MetaMask not detected. Please install MetaMask to use this application.");
    return false;
  }
  
  try {
    // Check if we're already connected to Ganache
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId === '0x1691') { // 0x1691 is hex for 5777
      console.log("Already connected to Ganache");
      return true;
    }
    
    // Try to switch to Ganache
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1691' }], // 0x1691 is hex for 5777
    });
    
    return true;
  } catch (error: any) {
    // If the chain hasn't been added to MetaMask, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x1691', // 0x1691 is hex for 5777
              chainName: 'Ganache Local',
              rpcUrls: [APP_CONFIG.RPC_URLS[5777]],
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding Ganache to MetaMask:', addError);
        toast.error("Failed to add Ganache to MetaMask. Please add it manually.");
        return false;
      }
    }
    
    console.error('Error switching to Ganache:', error);
    toast.error("Failed to switch to Ganache network. Please check MetaMask.");
    return false;
  }
};

/**
 * Helper function to get test accounts from Ganache
 * Useful for debugging and testing
 */
export const getGanacheTestAccounts = async (): Promise<string[]> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    const accounts = await provider.listAccounts();
    return accounts;
  } catch (error) {
    console.error("Failed to get Ganache test accounts:", error);
    return [];
  }
};

/**
 * Check if the contract addresses are valid
 */
export const verifyContractAddresses = async (): Promise<boolean> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    
    // Check if contract addresses have code deployed
    const contracts = [
      APP_CONFIG.CONTRACT_ADDRESSES[5777].roleManagement,
      APP_CONFIG.CONTRACT_ADDRESSES[5777].kycContract,
      APP_CONFIG.CONTRACT_ADDRESSES[5777].loanManagement,
      APP_CONFIG.CONTRACT_ADDRESSES[5777].trustScore
    ];
    
    for (const address of contracts) {
      const code = await provider.getCode(address);
      
      // If code is just "0x", it means there's no contract at this address
      if (code === "0x") {
        console.error(`No contract deployed at address: ${address}`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Failed to verify contract addresses:", error);
    return false;
  }
};
