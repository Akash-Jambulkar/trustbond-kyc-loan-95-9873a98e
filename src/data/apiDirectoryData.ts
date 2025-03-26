
import { ApiCategory } from '@/types/apiDirectory';
import { Braces, ShieldCheck, Webhook, Database } from 'lucide-react';

export const apiCategories: ApiCategory[] = [
  {
    id: 'blockchain',
    title: 'Blockchain APIs',
    icon: Braces,
    description: 'Smart contract interactions',
    endpoints: [
      {
        name: 'Register User',
        endpoint: '/blockchain/register-user',
        method: 'POST',
        description: 'Register a new user on the blockchain',
        parameters: [
          { name: 'address', type: 'string', description: 'Ethereum address of the user' },
          { name: 'userData', type: 'object', description: 'Optional user data (fullName, email)' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires wallet connection'
      },
      {
        name: 'Register Bank',
        endpoint: '/blockchain/register-bank',
        method: 'POST',
        description: 'Register a new financial institution on the blockchain',
        parameters: [
          { name: 'address', type: 'string', description: 'Ethereum address of the bank' },
          { name: 'name', type: 'string', description: 'Name of the bank' },
          { name: 'regId', type: 'string', description: 'Registration ID of the bank' },
          { name: 'additionalInfo', type: 'object', description: 'Optional additional information' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires admin wallet'
      },
      {
        name: 'Assign Admin Role',
        endpoint: '/blockchain/assign-admin',
        method: 'POST',
        description: 'Assign admin role to a user',
        parameters: [
          { name: 'address', type: 'string', description: 'Ethereum address of the user' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires admin wallet'
      },
      {
        name: 'Get User Role',
        endpoint: '/blockchain/user-role',
        method: 'GET',
        description: 'Get the role of a user',
        parameters: [
          { name: 'address', type: 'string', description: 'Ethereum address of the user' }
        ],
        returns: 'String indicating user role (user, bank, admin)',
        auth: 'Public'
      }
    ]
  },
  {
    id: 'kyc',
    title: 'KYC APIs',
    icon: ShieldCheck,
    description: 'Verification services',
    endpoints: [
      {
        name: 'Submit KYC Document',
        endpoint: '/kyc/submit',
        method: 'POST',
        description: 'Submit KYC document for verification',
        parameters: [
          { name: 'documentData', type: 'object', description: 'Document data including hash, type, etc.' }
        ],
        returns: 'Document object with ID and status',
        auth: 'Requires wallet connection'
      },
      {
        name: 'Verify KYC Document',
        endpoint: '/kyc/verify',
        method: 'POST',
        description: 'Verify or reject a KYC document',
        parameters: [
          { name: 'userAddress', type: 'string', description: 'User wallet address' },
          { name: 'documentId', type: 'string', description: 'Document ID' },
          { name: 'isVerified', type: 'boolean', description: 'Verification status' },
          { name: 'rejectionReason', type: 'string', description: 'Optional reason for rejection' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires bank or admin wallet'
      },
      {
        name: 'Get KYC Status',
        endpoint: '/kyc/status',
        method: 'GET',
        description: 'Get KYC verification status for a user',
        parameters: [
          { name: 'address', type: 'string', description: 'User wallet address' }
        ],
        returns: 'Object with verification status details',
        auth: 'Requires wallet connection (own address) or bank/admin for any address'
      },
      {
        name: 'Get Pending Verifications',
        endpoint: '/kyc/pending',
        method: 'GET',
        description: 'Get all pending KYC verification requests',
        parameters: [],
        returns: 'Array of pending verification documents',
        auth: 'Requires bank or admin wallet'
      }
    ]
  },
  {
    id: 'loans',
    title: 'Loan APIs',
    icon: Webhook,
    description: 'Loan management',
    endpoints: [
      {
        name: 'Request Loan',
        endpoint: '/loans/request',
        method: 'POST',
        description: 'Submit a loan request to a bank',
        parameters: [
          { name: 'bankAddress', type: 'string', description: 'Bank wallet address' },
          { name: 'amount', type: 'number', description: 'Loan amount in ETH' },
          { name: 'purpose', type: 'string', description: 'Loan purpose' },
          { name: 'duration', type: 'number', description: 'Loan duration in days' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires verified user wallet'
      },
      {
        name: 'Approve Loan',
        endpoint: '/loans/approve',
        method: 'POST',
        description: 'Approve a loan request',
        parameters: [
          { name: 'loanId', type: 'number', description: 'ID of the loan' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires bank wallet'
      },
      {
        name: 'Reject Loan',
        endpoint: '/loans/reject',
        method: 'POST',
        description: 'Reject a loan request',
        parameters: [
          { name: 'loanId', type: 'number', description: 'ID of the loan' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires bank wallet'
      },
      {
        name: 'Get Loan Details',
        endpoint: '/loans/:id',
        method: 'GET',
        description: 'Get details of a specific loan',
        parameters: [
          { name: 'loanId', type: 'number', description: 'ID of the loan' }
        ],
        returns: 'Loan object with all details',
        auth: 'Requires wallet connection (own loans) or bank/admin for any loan'
      },
      {
        name: 'Get User Loans',
        endpoint: '/loans/user/:address',
        method: 'GET',
        description: 'Get all loans for a user',
        parameters: [
          { name: 'address', type: 'string', description: 'User wallet address' }
        ],
        returns: 'Array of loan objects',
        auth: 'Requires wallet connection (own loans) or bank/admin for any user'
      },
      {
        name: 'Repay Loan',
        endpoint: '/loans/repay',
        method: 'POST',
        description: 'Make a payment towards a loan',
        parameters: [
          { name: 'loanId', type: 'number', description: 'ID of the loan' },
          { name: 'amount', type: 'number', description: 'Payment amount in ETH' }
        ],
        returns: 'Boolean indicating success',
        auth: 'Requires wallet connection (borrower only)'
      }
    ]
  },
  {
    id: 'database',
    title: 'Database APIs',
    icon: Database,
    description: 'MongoDB operations',
    endpoints: [
      {
        name: 'Save User Info',
        endpoint: '/database/users',
        method: 'POST',
        description: 'Save or update user information in MongoDB',
        parameters: [
          { name: 'userData', type: 'object', description: 'User data object' }
        ],
        returns: 'User object with MongoDB ID',
        auth: 'Requires wallet connection (own data) or admin for any user'
      },
      {
        name: 'Get User Info',
        endpoint: '/database/users/:address',
        method: 'GET',
        description: 'Get user information from MongoDB',
        parameters: [
          { name: 'walletAddress', type: 'string', description: 'User wallet address' }
        ],
        returns: 'User object',
        auth: 'Requires wallet connection (own data) or bank/admin for any user'
      },
      {
        name: 'Save Bank Info',
        endpoint: '/database/banks',
        method: 'POST',
        description: 'Save or update bank information in MongoDB',
        parameters: [
          { name: 'bankData', type: 'object', description: 'Bank data object' }
        ],
        returns: 'Bank object with MongoDB ID',
        auth: 'Requires wallet connection (own data) or admin for any bank'
      },
      {
        name: 'Get All Banks',
        endpoint: '/database/banks',
        method: 'GET',
        description: 'Get all banks from MongoDB',
        parameters: [],
        returns: 'Array of bank objects',
        auth: 'Public'
      }
    ]
  }
];
