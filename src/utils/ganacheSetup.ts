
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { APP_CONFIG } from '../config/env';
import { CONTRACT_ADDRESSES } from '../services/blockchain/contractAddresses';

// Check if Ganache is running
export const checkGanacheConnection = async (): Promise<boolean> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    await provider.getBlockNumber();
    return true;
  } catch (error) {
    console.error('Ganache connection error:', error);
    return false;
  }
};

// Add Ganache network to MetaMask
export const addGanacheToMetaMask = async (): Promise<boolean> => {
  if (!window.ethereum) {
    toast.error('MetaMask is not installed');
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x1691', // 5777 in hex
          chainName: 'Ganache Local',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: [APP_CONFIG.RPC_URLS[5777]],
        },
      ],
    });
    toast.success('Ganache network added to MetaMask');
    return true;
  } catch (error) {
    console.error('Error adding Ganache to MetaMask:', error);
    toast.error('Failed to add Ganache to MetaMask');
    return false;
  }
};

// Verify contract addresses
export const verifyContractAddresses = async (): Promise<boolean> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    
    // Check if all contract addresses are valid
    const addresses = [
      CONTRACT_ADDRESSES.roleManagement,
      CONTRACT_ADDRESSES.kycContract,
      CONTRACT_ADDRESSES.trustScore,
      CONTRACT_ADDRESSES.loanManagement
    ];
    
    for (const address of addresses) {
      if (!ethers.utils.isAddress(address) || address === ethers.constants.AddressZero) {
        console.error('Invalid contract address:', address);
        return false;
      }
      
      // Check if there's code at the address
      const code = await provider.getCode(address);
      if (code === '0x') {
        console.error('No contract deployed at address:', address);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying contract addresses:', error);
    return false;
  }
};

// Deploy contracts from the migration script
export const deployContracts = async (): Promise<boolean> => {
  try {
    // This would normally import and run the deployment script
    // But for security, we'll just show a notification that this should be done manually
    toast.info(
      'Contract deployment should be run from the command line for security reasons. Please use `node src/contracts/migrations/deploy_contracts.js`'
    );
    return false;
  } catch (error) {
    console.error('Error deploying contracts:', error);
    return false;
  }
};

// Get contract information for display
export const getContractInfo = async (): Promise<any> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(APP_CONFIG.RPC_URLS[5777]);
    
    // Get contract details
    const info = {
      roleManagement: {
        address: CONTRACT_ADDRESSES.roleManagement,
        valid: false
      },
      kycContract: {
        address: CONTRACT_ADDRESSES.kycContract,
        valid: false
      },
      trustScore: {
        address: CONTRACT_ADDRESSES.trustScore,
        valid: false
      },
      loanManagement: {
        address: CONTRACT_ADDRESSES.loanManagement,
        valid: false
      }
    };
    
    // Check each contract
    for (const [key, value] of Object.entries(info)) {
      if (ethers.utils.isAddress(value.address) && value.address !== ethers.constants.AddressZero) {
        const code = await provider.getCode(value.address);
        info[key].valid = code !== '0x';
      }
    }
    
    return info;
  } catch (error) {
    console.error('Error getting contract info:', error);
    return null;
  }
};
