
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { getRpcUrl } from '../../config/env';
import { getProvider, getSigner } from './providerService';

// Set up a WebSocket provider for real-time updates
let wsProvider: ethers.providers.WebSocketProvider | null = null;

// Initialize WebSocket provider
export const initWebSocketProvider = async (chainId: string): Promise<ethers.providers.WebSocketProvider | null> => {
  try {
    // Get RPC URL for the current chain
    const rpcUrl = getRpcUrl(chainId);
    
    // For local development with Ganache, WebSocket provider is not needed
    if (chainId === '5777') {
      console.log('WebSocket provider not supported for Ganache local chain. Using HTTP provider instead.');
      return null;
    }
    
    // Convert HTTP URL to WebSocket URL if possible
    let wsUrl = rpcUrl.replace('https://', 'wss://').replace('http://', 'ws://');
    
    // If no WebSocket URL could be derived, use regular provider
    if (!wsUrl.startsWith('ws')) {
      console.log('Could not create WebSocket URL from RPC URL. Using HTTP provider instead.');
      return null;
    }
    
    // Close existing WebSocket provider if any
    if (wsProvider) {
      wsProvider.removeAllListeners();
      wsProvider = null;
    }
    
    // Initialize new WebSocket provider
    wsProvider = new ethers.providers.WebSocketProvider(wsUrl);
    console.log('WebSocket provider initialized for real-time updates');
    
    return wsProvider;
  } catch (error) {
    console.error('Error initializing WebSocket provider:', error);
    toast.error('Failed to initialize real-time blockchain connection');
    return null;
  }
};

// Set up block listener for real-time updates
export const setupBlockListener = (
  callback: (blockNumber: number) => void
): (() => void) => {
  try {
    // Get the most appropriate provider
    const provider = wsProvider || getProvider();
    
    if (!provider) {
      console.error('No provider available to set up block listener');
      return () => {};
    }
    
    // Set up listener for new blocks
    provider.on('block', (blockNumber: number) => {
      console.log('New block:', blockNumber);
      callback(blockNumber);
    });
    
    // Return cleanup function
    return () => {
      provider.removeListener('block', callback);
    };
  } catch (error) {
    console.error('Error setting up block listener:', error);
    return () => {};
  }
};

// Get real-time blockchain stats
export const getBlockchainStats = async () => {
  try {
    const provider = getProvider();
    
    if (!provider) {
      throw new Error('Provider not initialized');
    }
    
    // Get current block number
    const blockNumber = await provider.getBlockNumber();
    
    // Get current gas price
    const gasPrice = await provider.getGasPrice();
    
    // Get latest block
    const latestBlock = await provider.getBlock(blockNumber);
    
    return {
      blockNumber,
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei'),
      timestamp: new Date(latestBlock.timestamp * 1000).toISOString(),
      transactions: latestBlock.transactions.length,
      miner: latestBlock.miner
    };
  } catch (error) {
    console.error('Error getting blockchain stats:', error);
    throw error;
  }
};

// Listen for new transactions in real-time
export const listenForTransactions = (
  address: string,
  callback: (transaction: ethers.providers.TransactionResponse) => void
): (() => void) => {
  try {
    // Get the most appropriate provider
    const provider = wsProvider || getProvider();
    
    if (!provider) {
      console.error('No provider available to listen for transactions');
      return () => {};
    }
    
    // Create filter for transactions to/from the address
    const filter = {
      fromBlock: 'latest',
      toBlock: 'latest',
      topics: [
        null, // We don't filter by event signature
        null, // We don't filter by first indexed parameter
        ethers.utils.hexZeroPad(address, 32) // Filter by the address (convert to proper format)
      ]
    };
    
    // Set up listener
    provider.on(filter, (log) => {
      // Get the full transaction
      provider.getTransaction(log.transactionHash).then(callback);
    });
    
    // Return cleanup function
    return () => {
      provider.removeAllListeners(filter);
    };
  } catch (error) {
    console.error('Error setting up transaction listener:', error);
    return () => {};
  }
};
