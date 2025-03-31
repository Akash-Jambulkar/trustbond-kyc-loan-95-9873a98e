
import mongoose, { Schema, Document } from 'mongoose';
import { validateTextOnly } from '../mongoConnection';

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

// Validation for text-only fields
const textValidator = {
  validator: function(v: string) {
    return validateTextOnly(v);
  },
  message: (props: any) => `${props.path} must contain only text characters!`
};

const UserInfoSchema: Schema = new Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  fullName: { 
    type: String, 
    required: true,
    validate: textValidator
  },
  email: { 
    type: String, 
    required: false,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: { 
    type: String, 
    required: false,
    match: [/^[0-9+\-\s()]{7,20}$/, 'Please enter a valid phone number']
  },
  dateOfBirth: { 
    type: Date, 
    required: false 
  },
  nationality: { 
    type: String, 
    required: false,
    validate: textValidator
  },
  residentialAddress: { 
    type: String, 
    required: false,
    validate: textValidator
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

// Fix for "Cannot read properties of undefined (reading 'UserInfo')"
// Check if the model exists before trying to access it
const UserInfo = mongoose.models.UserInfo || mongoose.model<IUserInfo>('UserInfo', UserInfoSchema);

export default UserInfo;
