
import { ethers } from 'ethers';
import { ReactNode } from 'react';
import { IKYCDocument } from '../../services/database/models/KYCDocuments';

// Define types
export type UserRole = 'user' | 'bank' | 'admin';

export interface BlockchainContextType {
  // Wallet & Network State
  provider: ethers.providers.Web3Provider | null;
  account: string;
  chainId: string;
  networkName: string;
  balance: string;
  isConnected: boolean;
  
  // Role Management
  userRole: UserRole | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Connection Functions
  connectToWallet: () => Promise<void>;
  disconnectWallet: () => void;
  
  // Role Management Functions
  registerNewUser: (address: string) => Promise<void>;
  registerNewBank: (address: string, name: string, regId: string) => Promise<void>;
  assignAdmin: (address: string) => Promise<void>;
  
  // KYC Functions
  submitUserKYC: (documentData: Partial<IKYCDocument> & { documentHash: string }) => Promise<IKYCDocument | null>;
  verifyUserKYC: (userAddress: string, documentId: string, isVerified: boolean, rejectionReason?: string) => Promise<void>;
  getUserKYCStatus: (address: string) => Promise<any>;
  getKYCData: (address: string) => Promise<any>;
  getPendingKYCRequests: () => Promise<IKYCDocument[]>;
  
  // Trust Score Functions
  calculateUserTrustScore: (userAddress: string) => Promise<void>;
  getUserTrustScore: (address: string) => Promise<number>;
  
  // Loan Management Functions
  requestUserLoan: (bankAddress: string, amount: number, purpose: string, duration: number) => Promise<void>;
  approveUserLoan: (loanId: number) => Promise<void>;
  rejectUserLoan: (loanId: number) => Promise<void>;
  getLoan: (loanId: number) => Promise<any>;
  getUserLoansList: (address: string) => Promise<any[]>;
  getBankLoansList: (address: string) => Promise<any[]>;
  repayUserLoan: (loanId: number, amount: number) => Promise<void>;
  
  // Analytics Functions
  getMetrics: () => Promise<any>;
  getKYCMetrics: () => Promise<any>;
  getLoanMetrics: () => Promise<any>;
}

export interface BlockchainProviderProps {
  children: ReactNode;
}
