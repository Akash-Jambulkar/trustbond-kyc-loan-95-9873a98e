
import { ethers } from 'ethers';
import { getProvider, getSigner } from './providerService';
import { getUserRole } from './roleManagementService';
import { getKYCStatus } from './kycService';
import { getUserLoans, getBankLoans } from './loanManagementService';

// System metrics
export const getSystemMetrics = async (provider: ethers.providers.Web3Provider) => {
  try {
    // This would fetch data from various contracts in a real application
    return {
      totalUsers: 156,
      totalBanks: 12,
      totalLoans: 342,
      totalVerifiedUsers: 103,
      totalLoanAmount: ethers.utils.parseEther('1500'),
      activeLoans: 78,
      completedLoans: 240,
      defaultedLoans: 24
    };
  } catch (error) {
    console.error('Error getting system metrics:', error);
    return null;
  }
};

// KYC statistics
export const getKYCStats = async (provider: ethers.providers.Web3Provider) => {
  try {
    // This would fetch data from the KYC contract in a real application
    return {
      totalSubmissions: 156,
      pendingVerifications: 53,
      approvedVerifications: 103,
      rejectedVerifications: 0,
      averageVerificationTime: 24, // in hours
      verificationsByDay: [
        { date: '2023-08-01', count: 5 },
        { date: '2023-08-02', count: 7 },
        { date: '2023-08-03', count: 3 },
        { date: '2023-08-04', count: 9 },
        { date: '2023-08-05', count: 12 },
        { date: '2023-08-06', count: 8 },
        { date: '2023-08-07', count: 6 },
      ],
      documentTypes: [
        { type: 'Government ID', count: 156 },
        { type: 'Proof of Address', count: 142 },
        { type: 'Selfie', count: 156 },
        { type: 'Bank Statement', count: 98 },
      ]
    };
  } catch (error) {
    console.error('Error getting KYC stats:', error);
    return null;
  }
};

// Loan statistics
export const getLoanStats = async (provider: ethers.providers.Web3Provider) => {
  try {
    // This would fetch data from the Loan Management contract in a real application
    return {
      totalLoans: 342,
      totalLoanAmount: ethers.utils.formatEther(ethers.utils.parseEther('1500')),
      activeLoans: 78,
      completedLoans: 240,
      defaultedLoans: 24,
      averageLoanAmount: ethers.utils.formatEther(ethers.utils.parseEther('4.38')),
      loansByStatus: [
        { status: 'Active', count: 78 },
        { status: 'Completed', count: 240 },
        { status: 'Defaulted', count: 24 },
      ],
      loansByMonth: [
        { month: 'Jan', amount: 50 },
        { month: 'Feb', amount: 45 },
        { month: 'Mar', amount: 60 },
        { month: 'Apr', amount: 30 },
        { month: 'May', amount: 55 },
        { month: 'Jun', amount: 65 },
        { month: 'Jul', amount: 37 },
      ],
      topLenders: [
        { name: 'Bank A', count: 120, amount: 500 },
        { name: 'Bank B', count: 95, amount: 450 },
        { name: 'Bank C', count: 85, amount: 350 },
        { name: 'Bank D', count: 42, amount: 200 },
      ]
    };
  } catch (error) {
    console.error('Error getting loan stats:', error);
    return null;
  }
};
