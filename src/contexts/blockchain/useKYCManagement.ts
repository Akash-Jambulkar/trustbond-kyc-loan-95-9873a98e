
import { ethers } from 'ethers';
import { 
  submitKYC,
  verifyKYC,
  getKYCStatus,
  getUserKYCData 
} from '../../services/blockchain/kycService';
import { toast } from 'sonner';
import {
  saveKYCDocument,
  updateKYCDocumentStatus,
  getUserDocuments,
  getVerificationStatus,
  getPendingVerifications,
  getRejectedDocuments,
  getVerificationHistory
} from '../../services/database/kycService';
import { IKYCDocument } from '../../services/database/models/KYCDocuments';
import { connectDB, isConnected } from '../../services/database/mongoConnection';

interface UseKYCManagementProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useKYCManagement = ({ setIsLoading, setError, provider }: UseKYCManagementProps) => {
  // First ensure MongoDB connection
  const ensureMongoDBConnection = async () => {
    if (!isConnected()) {
      const connected = await connectDB();
      if (!connected) {
        throw new Error('Failed to connect to MongoDB. Please check your connection.');
      }
    }
  };
  
  // Submit KYC - hybrid approach
  const submitUserKYC = async (documentData: Partial<IKYCDocument> & { documentHash: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      if (!documentData.walletAddress) throw new Error('Wallet address is required');
      
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      // 1. Store document hash on blockchain for verification
      const txResponse = await submitKYC([documentData.documentHash], provider);
      
      if (!txResponse) {
        throw new Error('Failed to submit document hash to blockchain');
      }
      
      // Wait for transaction to be mined
      let txHash = '';
      if (typeof txResponse === 'boolean') {
        // If txResponse is a boolean, create a placeholder hash
        txHash = 'tx-' + Date.now();
      } else if (txResponse.hash) {
        // If txResponse is a transaction response with hash
        txHash = txResponse.hash;
        // Wait for transaction confirmation
        await txResponse.wait(1);
      }
      
      // 2. Store document metadata in MongoDB
      const mongoDocument = {
        ...documentData,
        blockchainTxHash: txHash,
        submissionDate: new Date()
      };
      
      const savedDoc = await saveKYCDocument(mongoDocument);
      
      if (!savedDoc) {
        throw new Error('Failed to save document metadata');
      }
      
      toast.success('KYC document submitted successfully');
      return savedDoc;
    } catch (err: any) {
      console.error('Error submitting KYC:', err);
      setError(err.message || 'Failed to submit KYC');
      toast.error(err.message || 'Failed to submit KYC');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verify KYC - hybrid approach
  const verifyUserKYC = async (
    userAddress: string, 
    documentId: string, 
    isVerified: boolean, 
    rejectionReason?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      // 1. Update verification status on blockchain
      await verifyKYC(userAddress, isVerified, provider);
      
      // 2. Update document status in MongoDB
      const verifierAddress = await provider.getSigner().getAddress();
      const status = isVerified ? 'verified' : 'rejected';
      
      const updatedDoc = await updateKYCDocumentStatus(
        documentId,
        status,
        verifierAddress,
        rejectionReason
      );
      
      if (!updatedDoc) {
        throw new Error('Failed to update document status');
      }
      
      toast.success(`Document ${isVerified ? 'verified' : 'rejected'} successfully`);
      return updatedDoc;
    } catch (err: any) {
      console.error('Error verifying KYC:', err);
      setError(err.message || 'Failed to verify KYC');
      toast.error(err.message || 'Failed to verify KYC');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get KYC status - hybrid approach
  const getUserKYCStatus = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      // 1. Get blockchain verification status
      const blockchainStatus = await getKYCStatus(address, provider);
      
      // 2. Get detailed status from MongoDB
      const dbStatus = await getVerificationStatus(address);
      
      // Combine the data
      return {
        ...dbStatus,
        blockchainVerified: blockchainStatus === 'verified'
      };
    } catch (err: any) {
      setError(err.message || 'Failed to get KYC status');
      throw err;
    }
  };
  
  // Get KYC data - hybrid approach
  const getKYCData = async (address: string) => {
    try {
      if (!provider) throw new Error('Provider not connected');
      
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      // 1. Get blockchain KYC data
      const blockchainData = await getUserKYCData(address, provider);
      
      // 2. Get detailed document data from MongoDB
      const documents = await getUserDocuments(address);
      
      // Combine the data
      return {
        ...blockchainData,
        documents
      };
    } catch (err: any) {
      setError(err.message || 'Failed to get KYC data');
      throw err;
    }
  };
  
  // Get pending verification requests
  const getPendingKYCRequests = async () => {
    try {
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      return await getPendingVerifications();
    } catch (err: any) {
      setError(err.message || 'Failed to get pending verification requests');
      throw err;
    }
  };
  
  // Get rejected documents
  const getRejectedDocuments = async (address: string) => {
    try {
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      return await getRejectedDocuments(address);
    } catch (err: any) {
      setError(err.message || 'Failed to get rejected documents');
      throw err;
    }
  };
  
  // Get verification history
  const getVerificationHistory = async (address: string) => {
    try {
      // Ensure MongoDB connection
      await ensureMongoDBConnection();
      
      return await getVerificationHistory(address);
    } catch (err: any) {
      setError(err.message || 'Failed to get verification history');
      throw err;
    }
  };

  return {
    submitUserKYC,
    verifyUserKYC,
    getUserKYCStatus,
    getKYCData,
    getPendingKYCRequests,
    getRejectedDocuments,
    getVerificationHistory
  };
};
