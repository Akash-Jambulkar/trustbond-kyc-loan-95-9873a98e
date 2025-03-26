
import mongoose, { Schema, Document } from 'mongoose';

export type KYCDocumentType = 'government_id' | 'proof_of_address' | 'selfie' | 'other';
export type DocumentStatus = 'pending' | 'verified' | 'rejected';

export interface IKYCDocument extends Document {
  walletAddress: string;  // Blockchain address as the unique identifier
  documentType: KYCDocumentType;
  documentName: string;
  description?: string;
  documentHash: string;  // Store hash on blockchain, reference here
  blockchainTxHash?: string;  // Transaction hash where document was recorded
  status: DocumentStatus;
  verifiedBy?: string;  // Bank wallet address
  verificationDate?: Date;
  rejectionReason?: string;
  submissionDate: Date;
}

const KYCDocumentSchema: Schema = new Schema({
  walletAddress: { 
    type: String, 
    required: true,
    index: true 
  },
  documentType: { 
    type: String, 
    enum: ['government_id', 'proof_of_address', 'selfie', 'other'],
    required: true 
  },
  documentName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: false 
  },
  documentHash: { 
    type: String, 
    required: true 
  },
  blockchainTxHash: { 
    type: String, 
    required: false 
  },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending' 
  },
  verifiedBy: { 
    type: String, 
    required: false 
  },
  verificationDate: { 
    type: Date, 
    required: false 
  },
  rejectionReason: { 
    type: String, 
    required: false 
  },
  submissionDate: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model<IKYCDocument>('KYCDocument', KYCDocumentSchema);
