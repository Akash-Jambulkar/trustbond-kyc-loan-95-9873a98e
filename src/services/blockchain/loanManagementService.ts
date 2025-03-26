
import { ethers } from 'ethers';
import LoanManagementABI from '../../contracts/abis/LoanManagement.json';
import { CONTRACT_ADDRESSES } from './contractAddresses';
import { getProvider, getSigner, initBlockchain } from './providerService';

// Contract instance
let loanManagementContract: ethers.Contract | null = null;

// Initialize Loan Management contract
export const initLoanManagementContract = async () => {
  if (!loanManagementContract) {
    const signer = getSigner();
    if (!signer) {
      await initBlockchain();
    }
    
    loanManagementContract = new ethers.Contract(
      CONTRACT_ADDRESSES.loanManagement,
      LoanManagementABI,
      getSigner() || getProvider()
    );
  }
  
  return loanManagementContract;
};

// Loan Management Contract Functions
export const applyForLoan = async (amount: string, purpose: string, durationInDays: number) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.applyForLoan(
      ethers.utils.parseEther(amount),
      purpose,
      durationInDays
    );
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error applying for loan:', error);
    return false;
  }
};

export const requestLoan = async (bankAddress: string, amount: number, purpose: string, duration: number, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.requestLoan(
      bankAddress,
      ethers.utils.parseEther(amount.toString()),
      purpose,
      duration
    );
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error requesting loan:', error);
    return false;
  }
};

export const approveLoan = async (loanId: number, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.approveLoan(loanId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error approving loan:', error);
    return false;
  }
};

export const rejectLoan = async (loanId: number, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.rejectLoan(loanId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error rejecting loan:', error);
    return false;
  }
};

export const getUserLoans = async (address: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const loans = await contract?.getUserLoans(address);
    return loans.map((loan: any) => ({
      id: loan.id.toNumber(),
      borrower: loan.borrower,
      lender: loan.lender,
      amount: ethers.utils.formatEther(loan.amount),
      purpose: loan.purpose,
      duration: loan.duration.toNumber(),
      interestRate: loan.interestRate.toNumber(),
      startDate: loan.startDate.toNumber() > 0 ? new Date(loan.startDate.toNumber() * 1000) : null,
      status: ['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Defaulted'][loan.status],
      remainingAmount: ethers.utils.formatEther(loan.remainingAmount),
      lastPaymentDate: loan.lastPaymentDate.toNumber() > 0 ? new Date(loan.lastPaymentDate.toNumber() * 1000) : null,
    }));
  } catch (error) {
    console.error('Error getting user loans:', error);
    return [];
  }
};

export const getBankLoans = async (bankAddress: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const loans = await contract?.getBankLoans(bankAddress);
    return loans;
  } catch (error) {
    console.error('Error getting bank loans:', error);
    return [];
  }
};

export const makePayment = async (loanId: number, amount: string) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.makePayment(loanId, {
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error making payment:', error);
    return false;
  }
};

export const repayLoan = async (loanId: number, amount: number, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const tx = await contract?.repayLoan(
      loanId,
      ethers.utils.parseEther(amount.toString())
    );
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error repaying loan:', error);
    return false;
  }
};

export const getLoanDetails = async (loanId: number, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initLoanManagementContract();
    const loan = await contract?.getLoanDetails(loanId);
    return {
      id: loan.id.toNumber(),
      borrower: loan.borrower,
      lender: loan.lender,
      amount: ethers.utils.formatEther(loan.amount),
      purpose: loan.purpose,
      duration: loan.duration.toNumber(),
      interestRate: loan.interestRate.toNumber(),
      startDate: loan.startDate.toNumber() > 0 ? new Date(loan.startDate.toNumber() * 1000) : null,
      status: ['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Defaulted'][loan.status],
      remainingAmount: ethers.utils.formatEther(loan.remainingAmount),
      lastPaymentDate: loan.lastPaymentDate.toNumber() > 0 ? new Date(loan.lastPaymentDate.toNumber() * 1000) : null,
      paymentHistory: loan.paymentHistory.map((payment: any) => ({
        amount: ethers.utils.formatEther(payment.amount),
        timestamp: new Date(payment.timestamp.toNumber() * 1000)
      }))
    };
  } catch (error) {
    console.error('Error getting loan details:', error);
    return null;
  }
};
