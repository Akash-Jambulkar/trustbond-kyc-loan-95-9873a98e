
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
import { toast } from 'sonner';

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
      toast.success('Loan request submitted successfully');
    } catch (err: any) {
      console.error('Error requesting loan:', err);
      setError(err.message || 'Failed to request loan');
      toast.error(err.message || 'Failed to request loan');
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
      toast.success('Loan approved successfully');
    } catch (err: any) {
      console.error('Error approving loan:', err);
      setError(err.message || 'Failed to approve loan');
      toast.error(err.message || 'Failed to approve loan');
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
      toast.success('Loan rejected successfully');
    } catch (err: any) {
      console.error('Error rejecting loan:', err);
      setError(err.message || 'Failed to reject loan');
      toast.error(err.message || 'Failed to reject loan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getLoan = async (loanId: number) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      const loanDetails = await getLoanDetails(loanId, provider);
      return loanDetails;
    } catch (err: any) {
      console.error('Error getting loan details:', err);
      setError(err.message || 'Failed to get loan details');
      throw err;
    }
  };
  
  const getUserLoansList = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      const loans = await getUserLoans(address, provider);
      return loans;
    } catch (err: any) {
      console.error('Error getting user loans:', err);
      setError(err.message || 'Failed to get user loans');
      throw err;
    }
  };
  
  const getBankLoansList = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      const loans = await getBankLoans(address, provider);
      return loans;
    } catch (err: any) {
      console.error('Error getting bank loans:', err);
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
      toast.success('Loan payment made successfully');
    } catch (err: any) {
      console.error('Error repaying loan:', err);
      setError(err.message || 'Failed to repay loan');
      toast.error(err.message || 'Failed to repay loan');
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
