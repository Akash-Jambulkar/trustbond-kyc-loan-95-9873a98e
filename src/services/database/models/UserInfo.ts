
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserInfo extends Document {
  walletAddress: string;  // Blockchain address as the unique identifier
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  nationality?: string;
  residentialAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserInfoSchema: Schema = new Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: false 
  },
  phone: { 
    type: String, 
    required: false 
  },
  dateOfBirth: { 
    type: Date, 
    required: false 
  },
  nationality: { 
    type: String, 
    required: false 
  },
  residentialAddress: { 
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

export default mongoose.model<IUserInfo>('UserInfo', UserInfoSchema);
