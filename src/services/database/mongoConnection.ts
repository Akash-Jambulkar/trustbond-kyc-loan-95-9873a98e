
import mongoose from 'mongoose';
import { toast } from 'sonner';
import { MONGODB_URI } from '../../config/env';

// MongoDB connection status
let isDbConnected = false;

// MongoDB connection
const connectDB = async () => {
  // If already connected, return
  if (isDbConnected) {
    console.log('MongoDB already connected');
    return true;
  }

  try {
    // Use environment variable from config
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');
    isDbConnected = true;
    return true;
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    toast.error('Failed to connect to MongoDB. Please check your connection and try again.');
    return false;
  }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected...');
    isDbConnected = false;
    return true;
  } catch (err: any) {
    console.error('MongoDB disconnection error:', err.message);
    return false;
  }
};

// Check if connected
const isConnected = () => {
  return isDbConnected || mongoose.connection.readyState === 1;
};

// Validate text-only input
const validateTextOnly = (text: string): boolean => {
  // Regex to validate text-only input (allowing alphanumeric, spaces, and basic punctuation)
  const textOnlyRegex = /^[a-zA-Z0-9\s.,\-_:;'"!?()]+$/;
  return textOnlyRegex.test(text);
};

// Validate numeric input
const validateNumeric = (num: string): boolean => {
  // Regex to validate numeric input (allowing integers and decimals)
  const numericRegex = /^[0-9]+(\.[0-9]+)?$/;
  return numericRegex.test(num);
};

export { 
  connectDB, 
  disconnectDB, 
  isConnected,
  validateTextOnly,
  validateNumeric
};
