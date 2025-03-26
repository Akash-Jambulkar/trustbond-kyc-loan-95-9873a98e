
import KYCDocument, { IKYCDocument } from './models/KYCDocuments';
import { connectDB, isConnected } from './mongoConnection';

export const saveKYCDocument = async (docData: Partial<IKYCDocument>): Promise<IKYCDocument | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const newDoc = new KYCDocument(docData);
    await newDoc.save();
    return newDoc;
  } catch (error) {
    console.error('Error saving KYC document:', error);
    return null;
  }
};

export const updateKYCDocumentStatus = async (
  documentId: string, 
  status: 'verified' | 'rejected',
  verifierAddress?: string,
  rejectionReason?: string
): Promise<IKYCDocument | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const updateData: any = { 
      status, 
      verificationDate: new Date()
    };
    
    if (verifierAddress) {
      updateData.verifiedBy = verifierAddress;
    }
    
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    const updatedDoc = await KYCDocument.findByIdAndUpdate(
      documentId,
      { $set: updateData },
      { new: true }
    );
    
    return updatedDoc;
  } catch (error) {
    console.error('Error updating KYC document status:', error);
    return null;
  }
};

export const getUserDocuments = async (walletAddress: string): Promise<IKYCDocument[]> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const documents = await KYCDocument.find({ walletAddress });
    return documents;
  } catch (error) {
    console.error('Error getting user documents:', error);
    return [];
  }
};

export const getVerificationStatus = async (walletAddress: string): Promise<{
  isComplete: boolean;
  requiredDocs: number;
  verifiedDocs: number;
  status: 'notStarted' | 'inProgress' | 'verified' | 'rejected';
}> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    // Required document types for complete verification
    const requiredDocTypes = ['government_id', 'proof_of_address', 'selfie'];
    const totalRequiredDocs = requiredDocTypes.length;
    
    // Get all user documents
    const documents = await KYCDocument.find({ walletAddress });
    
    if (documents.length === 0) {
      return {
        isComplete: false,
        requiredDocs: totalRequiredDocs,
        verifiedDocs: 0,
        status: 'notStarted'
      };
    }
    
    // Count verified documents
    const verifiedDocs = documents.filter(doc => doc.status === 'verified').length;
    
    // Check if any document is rejected
    const hasRejected = documents.some(doc => doc.status === 'rejected');
    
    // Determine overall status
    let status: 'notStarted' | 'inProgress' | 'verified' | 'rejected';
    
    if (hasRejected) {
      status = 'rejected';
    } else if (verifiedDocs >= totalRequiredDocs) {
      status = 'verified';
    } else {
      status = 'inProgress';
    }
    
    return {
      isComplete: verifiedDocs >= totalRequiredDocs,
      requiredDocs: totalRequiredDocs,
      verifiedDocs,
      status
    };
  } catch (error) {
    console.error('Error getting verification status:', error);
    return {
      isComplete: false,
      requiredDocs: 3,
      verifiedDocs: 0,
      status: 'notStarted'
    };
  }
};

export const getPendingVerifications = async (): Promise<IKYCDocument[]> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const pendingDocs = await KYCDocument.find({ status: 'pending' })
      .sort({ submissionDate: -1 });
    
    return pendingDocs;
  } catch (error) {
    console.error('Error getting pending verifications:', error);
    return [];
  }
};
