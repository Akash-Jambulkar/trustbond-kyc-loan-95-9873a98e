
import { ethers } from 'ethers';
import { toast } from 'sonner';

// Provider and signer
let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;

// Initialize blockchain connection
export const initBlockchain = async () => {
  if (window.ethereum) {
    try {
      // Request access to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Initialize provider and signer
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      
      return true;
    } catch (error) {
      console.error('Error initializing blockchain:', error);
      toast('Error connecting to blockchain. Please try again.');
      return false;
    }
  } else {
    console.error('MetaMask not detected');
    return false;
  }
};

// Check if user has MetaMask installed
export const isMetaMaskInstalled = () => {
  return !!window.ethereum;
};

// Get current account
export const getCurrentAccount = async () => {
  if (!provider) {
    await initBlockchain();
  }
  
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  } catch (error) {
    console.error('Error getting current account:', error);
    return null;
  }
};

// Get current network
export const getCurrentNetwork = async () => {
  if (!provider) {
    await initBlockchain();
  }
  
  try {
    const network = await provider?.getNetwork();
    return network;
  } catch (error) {
    console.error('Error getting network:', error);
    return null;
  }
};

// Export provider and signer getter functions
export const getProvider = () => provider;
export const getSigner = () => signer;

// Connect wallet function
export const connectWallet = async () => {
  try {
    if (await initBlockchain()) {
      const account = await getCurrentAccount();
      const chainId = (await provider?.getNetwork())?.chainId;
      
      return {
        provider,
        account,
        chainId
      };
    }
    return null;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};

// Get network name from chain ID
export const getNetworkName = (chainId: string): string => {
  const networks: Record<string, string> = {
    '1': 'Ethereum Mainnet',
    '3': 'Ropsten',
    '4': 'Rinkeby',
    '5': 'Goerli',
    '42': 'Kovan',
    '56': 'Binance Smart Chain',
    '137': 'Polygon',
    '80001': 'Mumbai Testnet'
  };
  
  return networks[chainId] || `Unknown Network (${chainId})`;
};

// Setup event listeners for wallet and network changes
export const setupEventListeners = (
  provider: ethers.providers.Web3Provider,
  handleAccountsChanged: (account: string) => void,
  handleChainChanged: (chainId: string) => void
) => {
  const ethereum = provider.provider as any;
  
  if (ethereum && ethereum.on) {
    ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length > 0) {
        handleAccountsChanged(accounts[0]);
      } else {
        handleAccountsChanged('');
      }
    });
    
    ethereum.on('chainChanged', (chainId: string) => {
      handleChainChanged(chainId);
      window.location.reload();
    });
  }
};

// Remove event listeners
export const removeEventListeners = (
  provider: ethers.providers.Web3Provider
) => {
  const ethereum = provider.provider as any;
  
  if (ethereum && ethereum.removeListener) {
    ethereum.removeListener('accountsChanged', () => {});
    ethereum.removeListener('chainChanged', () => {});
  }
};
