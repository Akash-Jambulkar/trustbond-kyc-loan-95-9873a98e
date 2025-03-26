
import mongoose, { Schema, Document } from 'mongoose';

export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'defaulted';

export interface ILoanApplication extends Document {
  loanId: string;  // Reference to blockchain loan ID
  borrowerAddress: string;
  bankAddress: string;
  amount: number;
  purpose: string;
  duration: number;  // In months
  interestRate?: number;
  collateral?: string;
  status: LoanStatus;
  blockchainTxHash?: string;
  approvalDate?: Date;
  disbursementDate?: Date;
  repaymentSchedule?: Array<{
    dueDate: Date;
    amount: number;
    status: 'pending' | 'paid' | 'late';
    paidDate?: Date;
    paidAmount?: number;
    paidTxHash?: string;
  }>;
  applicationDate: Date;
}

const LoanApplicationSchema: Schema = new Schema({
  loanId: { 
    type: String, 
    required: true,
    unique: true,
    index: true 
  },
  borrowerAddress: { 
    type: String, 
    required: true,
    index: true 
  },
  bankAddress: { 
    type: String, 
    required: true,
    index: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  purpose: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  interestRate: { 
    type: Number, 
    required: false 
  },
  collateral: { 
    type: String, 
    required: false 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'defaulted'],
    default: 'pending' 
  },
  blockchainTxHash: { 
    type: String, 
    required: false 
  },
  approvalDate: { 
    type: Date, 
    required: false 
  },
  disbursementDate: { 
    type: Date, 
    required: false 
  },
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'late'],
      default: 'pending'
    },
    paidDate: Date,
    paidAmount: Number,
    paidTxHash: String
  }],
  applicationDate: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model<ILoanApplication>('LoanApplication', LoanApplicationSchema);
