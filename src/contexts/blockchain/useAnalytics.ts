
import { ethers } from 'ethers';
import { 
  getSystemMetrics,
  getKYCStats,
  getLoanStats 
} from '../../services/blockchain/analyticsService';

interface UseAnalyticsProps {
  setError: (error: string | null) => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useAnalytics = ({ setError, provider }: UseAnalyticsProps) => {
  // Analytics Functions
  const getMetrics = async () => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getSystemMetrics(provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get system metrics');
      throw err;
    }
  };
  
  const getKYCMetrics = async () => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getKYCStats(provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get KYC metrics');
      throw err;
    }
  };
  
  const getLoanMetrics = async () => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getLoanStats(provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get loan metrics');
      throw err;
    }
  };

  return {
    getMetrics,
    getKYCMetrics,
    getLoanMetrics
  };
};
