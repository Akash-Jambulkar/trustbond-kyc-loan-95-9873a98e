
// This file contains TypeScript models representing the smart contract structures
// These can be used to better understand the expected data shapes from the blockchain

// Role Management Contract
export interface RoleManagementContract {
  // State variables
  admin: string;
  roles: Record<string, string>; // mapping(address => string)

  // Functions
  getUserRole(address: string): Promise<string>;
  registerUser(role: string): Promise<void>;
  approveBank(bankAddress: string): Promise<void>;
  revokeBank(bankAddress: string): Promise<void>;
  isAdmin(address: string): Promise<boolean>;
  transferAdmin(newAdmin: string): Promise<void>;

  // Events
  RoleAssigned: (address: string, role: string) => void;
  BankApproved: (bankAddress: string) => void;
  BankRevoked: (bankAddress: string) => void;
  AdminTransferred: (oldAdmin: string, newAdmin: string) => void;
}

// KYC Contract
export interface Document {
  hash: string;
  timestamp: number;
  verified: boolean;
  documentType: string;
}

export interface KYCSubmission {
  userAddress: string;
  documents: Document[];
  status: 'Pending' | 'Verified' | 'Rejected';
  submissionTimestamp: number;
  verificationTimestamp: number;
  verifierAddress: string;
}

export interface KYCContract {
  // State variables
  admin: string;
  roleManagement: RoleManagementContract;
  trustScore: TrustScoreContract;
  kycSubmissions: Record<string, KYCSubmission>; // mapping(address => KYCSubmission)
  verifiers: string[];

  // Statistics
  totalUsers: number;
  verifiedUsers: number;
  pendingVerifications: number;
  rejectedVerifications: number;

  // Functions
  submitKYC(documentHashes: string[], documentTypes: string[]): Promise<void>;
  getKYCStatus(address: string): Promise<'Pending' | 'Verified' | 'Rejected'>;
  verifyKYC(userAddress: string, isApproved: boolean): Promise<void>;
  getDocuments(address: string): Promise<Document[]>;
  updateDocument(documentType: string, documentHash: string): Promise<void>;
  addVerifier(verifierAddress: string): Promise<void>;
  removeVerifier(verifierAddress: string): Promise<void>;
  isVerifier(address: string): Promise<boolean>;
  getSystemStats(): Promise<{
    totalUsers: number;
    verifiedUsers: number;
    pendingVerifications: number;
    rejectedVerifications: number;
    totalBanks: number;
    averageTrustScore: number;
    verificationRate: number;
  }>;

  // Events
  KYCSubmitted: (userAddress: string, documentCount: number) => void;
  KYCUpdated: (userAddress: string, documentType: string) => void;
  KYCVerified: (userAddress: string, isApproved: boolean, verifierAddress: string) => void;
  VerifierAdded: (verifierAddress: string) => void;
  VerifierRemoved: (verifierAddress: string) => void;
}

// Trust Score Contract
export interface TrustScoreData {
  score: number;
  lastUpdated: number;
  verificationLevel: number;
  history: { score: number; timestamp: number; reason: string }[];
}

export interface TrustScoreContract {
  // State variables
  admin: string;
  roleManagement: RoleManagementContract;
  kycContract: KYCContract;
  trustScores: Record<string, TrustScoreData>; // mapping(address => TrustScoreData)
  
  // Functions
  getTrustScore(address: string): Promise<number>;
  updateTrustScore(userAddress: string, newScore: number, reason: string): Promise<void>;
  getTrustScoreData(address: string): Promise<TrustScoreData>;
  calculateScore(userAddress: string): Promise<number>;
  getAverageTrustScore(): Promise<number>;
  
  // Events
  TrustScoreUpdated: (userAddress: string, newScore: number, reason: string) => void;
}

// Loan Management Contract
export enum LoanStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Active = 3,
  Completed = 4,
  Defaulted = 5
}

export interface Payment {
  amount: string; // wei amount as string
  timestamp: number;
}

export interface Loan {
  id: number;
  borrower: string;
  lender: string;
  amount: string; // wei amount as string
  purpose: string;
  duration: number; // in days
  interestRate: number; // basis points, 100 = 1%
  startDate: number;
  status: LoanStatus;
  remainingAmount: string;
  lastPaymentDate: number;
  paymentHistory: Payment[];
}

export interface LoanManagementContract {
  // State variables
  admin: string;
  roleManagement: RoleManagementContract;
  kycContract: KYCContract;
  trustScoreContract: TrustScoreContract;
  loans: Loan[];
  userLoans: Record<string, number[]>; // mapping(address => uint[])
  bankLoans: Record<string, number[]>; // mapping(address => uint[])
  loanIdCounter: number;
  
  // Functions
  applyForLoan(amount: string, purpose: string, durationInDays: number): Promise<void>;
  approveLoan(loanId: number): Promise<void>;
  rejectLoan(loanId: number): Promise<void>;
  makePayment(loanId: number): Promise<void>;
  getUserLoans(address: string): Promise<Loan[]>;
  getBankLoans(bankAddress: string): Promise<Loan[]>;
  getLoanDetails(loanId: number): Promise<Loan>;
  markLoanAsDefaulted(loanId: number): Promise<void>;
  getLoanStats(bankAddress: string): Promise<{
    totalLoans: number;
    activeLoans: number;
    completedLoans: number;
    defaultedLoans: number;
    totalAmount: string;
    activeAmount: string;
  }>;
  
  // Events
  LoanApplied: (loanId: number, borrower: string, amount: string, purpose: string) => void;
  LoanApproved: (loanId: number, lender: string) => void;
  LoanRejected: (loanId: number, reason: string) => void;
  PaymentMade: (loanId: number, amount: string, remainingAmount: string) => void;
  LoanCompleted: (loanId: number) => void;
  LoanDefaulted: (loanId: number) => void;
}
