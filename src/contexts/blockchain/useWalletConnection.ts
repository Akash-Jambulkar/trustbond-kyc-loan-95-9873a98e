
import { useState } from 'react';
import { ethers } from 'ethers';
import { 
  connectWallet, 
  getNetworkName, 
  setupEventListeners, 
  removeEventListeners,
  getCurrentNetwork 
} from '../../services/blockchain/providerService';
import { checkUserRole } from '../../services/blockchain/roleManagementService';
import { UserRole } from './BlockchainTypes';

export const useWalletConnection = () => {
  // Wallet & Network State
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');
  const [networkName, setNetworkName] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to connect to wallet
  const connectToWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await connectWallet();
      
      if (result) {
        const { provider: web3Provider, account: userAccount, chainId: networkChainId } = result;
        
        setProvider(web3Provider);
        setAccount(userAccount);
        setChainId(networkChainId.toString());
        setNetworkName(getNetworkName(networkChainId.toString()));
        setIsConnected(true);
        
        // Get user's balance
        const userBalance = await web3Provider.getBalance(userAccount);
        setBalance(ethers.utils.formatEther(userBalance));
        
        // Check user role
        const role = await checkUserRole(userAccount, web3Provider);
        setUserRole(role as UserRole);
        
        // Setup event listeners
        setupEventListeners(
          web3Provider, 
          (account) => setAccount(account), 
          (chainId) => setChainId(chainId.toString())
        );
      }
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect to wallet');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to disconnect wallet
  const disconnectWallet = () => {
    if (provider) {
      removeEventListeners(provider);
    }
    
    setProvider(null);
    setAccount('');
    setChainId('');
    setNetworkName('');
    setBalance('');
    setIsConnected(false);
    setUserRole(null);
  };

  return {
    // State
    provider,
    account,
    chainId,
    networkName,
    balance,
    isConnected,
    userRole,
    isLoading,
    error,
    // Methods
    setAccount,
    setUserRole,
    connectToWallet,
    disconnectWallet,
    setError,
    setIsLoading
  };
};
