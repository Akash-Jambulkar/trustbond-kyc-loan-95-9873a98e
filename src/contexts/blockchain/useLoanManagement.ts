
import { ethers } from 'ethers';
import { 
  requestLoan,
  approveLoan,
  rejectLoan,
  getLoanDetails,
  getUserLoans,
  getBankLoans,
  repayLoan 
} from '../../services/blockchain/loanManagementService';

interface UseLoanManagementProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useLoanManagement = ({ setIsLoading, setError, provider }: UseLoanManagementProps) => {
  // Loan Management Functions
  const requestUserLoan = async (bankAddress: string, amount: number, purpose: string, duration: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      await requestLoan(bankAddress, amount, purpose, duration, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to request loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const approveUserLoan = async (loanId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      await approveLoan(loanId, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to approve loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const rejectUserLoan = async (loanId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      await rejectLoan(loanId, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to reject loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getLoan = async (loanId: number) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getLoanDetails(loanId, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get loan details');
      throw err;
    }
  };
  
  const getUserLoansList = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getUserLoans(address, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get user loans');
      throw err;
    }
  };
  
  const getBankLoansList = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      return await getBankLoans(address, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to get bank loans');
      throw err;
    }
  };
  
  const repayUserLoan = async (loanId: number, amount: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      await repayLoan(loanId, amount, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to repay loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestUserLoan,
    approveUserLoan,
    rejectUserLoan,
    getLoan,
    getUserLoansList,
    getBankLoansList,
    repayUserLoan
  };
};
