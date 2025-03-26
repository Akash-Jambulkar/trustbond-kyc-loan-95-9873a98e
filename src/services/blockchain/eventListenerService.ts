
import { ethers } from 'ethers';

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
export const removeEventListeners = (provider: ethers.providers.Web3Provider) => {
  const ethereum = provider.provider as any;
  
  if (ethereum && ethereum.removeListener) {
    ethereum.removeListener('accountsChanged', () => {});
    ethereum.removeListener('chainChanged', () => {});
  }
};
