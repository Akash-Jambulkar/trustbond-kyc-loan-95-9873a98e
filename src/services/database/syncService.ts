
import { connectDB, isConnected } from './mongoConnection';
import KYCDocument from './models/KYCDocuments';
import UserInfo from './models/UserInfo';
import BankInfo from './models/BankInfo';
import { toast } from 'sonner';

// Centralized error handling for database operations
const handleDatabaseError = (operation: string, error: any) => {
  console.error(`Database error during ${operation}:`, error);
  toast.error(`Failed to ${operation}. Please try again.`);
  return null;
};

// General sync function for any collection
export const syncData = async <T>(
  collectionName: string,
  query: any,
  dataProcessor?: (data: T[]) => any
): Promise<any> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    let collection;
    
    switch (collectionName) {
      case 'kyc':
        collection = KYCDocument;
        break;
      case 'users':
        collection = UserInfo;
        break;
      case 'banks':
        collection = BankInfo;
        break;
      default:
        throw new Error(`Unknown collection: ${collectionName}`);
    }
    
    const data = await collection.find(query);
    
    if (dataProcessor && typeof dataProcessor === 'function') {
      return dataProcessor(data);
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(`sync ${collectionName} data`, error);
  }
};

// Sync KYC documents with optional filtering
export const syncKYCDocuments = async (filter = {}) => {
  return syncData('kyc', filter);
};

// Sync user data
export const syncUserData = async (walletAddress: string) => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const user = await UserInfo.findOne({ walletAddress });
    const kycDocs = await KYCDocument.find({ walletAddress });
    
    return {
      user,
      kycDocuments: kycDocs,
      lastSynced: new Date()
    };
  } catch (error) {
    return handleDatabaseError('sync user data', error);
  }
};

// Sync bank data
export const syncBankData = async (walletAddress: string) => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const bank = await BankInfo.findOne({ walletAddress });
    const pendingKYC = await KYCDocument.find({ status: 'pending' });
    
    return {
      bank,
      pendingVerifications: pendingKYC,
      lastSynced: new Date()
    };
  } catch (error) {
    return handleDatabaseError('sync bank data', error);
  }
};

// Update verification status in MongoDB and sync with blockchain
export const updateVerificationStatus = async (
  documentId: string,
  status: 'verified' | 'rejected',
  verifierAddress: string,
  rejectionReason?: string
) => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const updateData: any = {
      status,
      verificationDate: new Date(),
      verifiedBy: verifierAddress
    };
    
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    const updatedDoc = await KYCDocument.findByIdAndUpdate(
      documentId,
      { $set: updateData },
      { new: true }
    );
    
    if (!updatedDoc) {
      throw new Error('Document not found or could not be updated');
    }
    
    return updatedDoc;
  } catch (error) {
    return handleDatabaseError('update verification status', error);
  }
};

// Submit a new document and sync with blockchain
export const submitDocument = async (documentData: any) => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const newDoc = new KYCDocument({
      ...documentData,
      submissionDate: new Date(),
      status: 'pending'
    });
    
    await newDoc.save();
    return newDoc;
  } catch (error) {
    return handleDatabaseError('submit document', error);
  }
};
