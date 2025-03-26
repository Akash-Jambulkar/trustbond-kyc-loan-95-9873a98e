
import { ethers } from 'ethers';
import { 
  calculateTrustScore,
  getTrustScore 
} from '../../services/blockchain/trustScoreService';

interface UseTrustScoreProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useTrustScore = ({ setIsLoading, setError, provider }: UseTrustScoreProps) => {
  // Trust Score Functions
  const calculateUserTrustScore = async (userAddress: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      await calculateTrustScore(userAddress, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate trust score');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getUserTrustScore = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getTrustScore(address);
    } catch (err: any) {
      setError(err.message || 'Failed to get trust score');
      throw err;
    }
  };

  return {
    calculateUserTrustScore,
    getUserTrustScore
  };
};
