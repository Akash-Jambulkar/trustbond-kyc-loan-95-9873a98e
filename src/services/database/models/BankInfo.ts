
import mongoose, { Schema, Document } from 'mongoose';

export interface IBankInfo extends Document {
  walletAddress: string;  // Blockchain address as the unique identifier
  name: string;
  registrationId: string;
  licenseNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessAddress?: string;
  website?: string;
  supportEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BankInfoSchema: Schema = new Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  registrationId: { 
    type: String, 
    required: true 
  },
  licenseNumber: { 
    type: String, 
    required: false 
  },
  contactEmail: { 
    type: String, 
    required: false 
  },
  contactPhone: { 
    type: String, 
    required: false 
  },
  businessAddress: { 
    type: String, 
    required: false 
  },
  website: { 
    type: String, 
    required: false 
  },
  supportEmail: { 
    type: String, 
    required: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export default mongoose.model<IBankInfo>('BankInfo', BankInfoSchema);
