
import React, { createContext, useContext, useEffect } from 'react';
import { BlockchainContextType, BlockchainProviderProps } from './blockchain/BlockchainTypes';
import { useWalletConnection } from './blockchain/useWalletConnection';
import { useRoleManagement } from './blockchain/useRoleManagement';
import { useKYCManagement } from './blockchain/useKYCManagement';
import { useTrustScore } from './blockchain/useTrustScore';
import { useLoanManagement } from './blockchain/useLoanManagement';
import { useAnalytics } from './blockchain/useAnalytics';
import { setupEventListeners, removeEventListeners } from '../services/blockchain/eventListenerService';

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  // Use the wallet connection hook
  const walletConnection = useWalletConnection();
  const { 
    provider, 
    account, 
    chainId, 
    networkName, 
    balance, 
    isConnected, 
    userRole, 
    isLoading, 
    error,
    setError,
    setIsLoading,
    connectToWallet,
    disconnectWallet
  } = walletConnection;
  
  // Use the role management hook
  const roleManagement = useRoleManagement({ 
    setIsLoading, 
    setError, 
    provider 
  });
  
  // Use the KYC management hook
  const kycManagement = useKYCManagement({ 
    setIsLoading, 
    setError, 
    provider 
  });
  
  // Use the trust score hook
  const trustScore = useTrustScore({ 
    setIsLoading, 
    setError, 
    provider 
  });
  
  // Use the loan management hook
  const loanManagement = useLoanManagement({ 
    setIsLoading, 
    setError, 
    provider 
  });
  
  // Use the analytics hook
  const analytics = useAnalytics({ 
    setError, 
    provider 
  });
  
  // Auto connect wallet if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      const cachedProvider = localStorage.getItem('wallet_connected');
      if (cachedProvider === 'true') {
        try {
          await connectToWallet();
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
    };
    
    autoConnect();
    
    return () => {
      if (provider) {
        removeEventListeners(provider);
      }
    };
  }, []);
  
  // Save connection state to localStorage
  useEffect(() => {
    if (isConnected) {
      localStorage.setItem('wallet_connected', 'true');
    } else {
      localStorage.removeItem('wallet_connected');
    }
  }, [isConnected]);
  
  // Create a context value with type assertion to handle the type mismatch
  const value: BlockchainContextType = {
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
    
    // Core wallet functions
    connectToWallet,
    disconnectWallet,
    
    // Spread other functionality
    ...roleManagement,
    ...kycManagement,
    ...trustScore,
    ...loanManagement,
    ...analytics
  } as unknown as BlockchainContextType; // Type assertion to resolve the type mismatch
  
  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};
