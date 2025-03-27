
import mongoose from 'mongoose';
import { toast } from 'sonner';
import { APP_CONFIG } from '../../config/env';

// MongoDB connection status
let isDbConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;

// MongoDB connection
const connectDB = async () => {
  // If already connected, return
  if (isDbConnected) {
    console.log('MongoDB already connected');
    return true;
  }

  if (connectionRetries >= MAX_RETRIES) {
    console.error('Max MongoDB connection retries reached');
    toast.error('Could not connect to database after multiple attempts. Please check your connection.');
    return false;
  }

  try {
    // Use environment variable from config
    const uri = APP_CONFIG.MONGODB_URI;
    
    if (!uri) {
      console.error('MongoDB URI is not defined in environment variables');
      toast.error('Database connection URL is not configured. Please check your settings.');
      return false;
    }

    await mongoose.connect(uri);
    console.log('MongoDB Connected...');
    isDbConnected = true;
    connectionRetries = 0; // Reset counter on successful connection
    return true;
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    toast.error('Failed to connect to MongoDB. Please check your connection and try again.');
    connectionRetries++;
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

// Fix this section - Only set up event listeners if mongoose.connection exists
// Mongoose connection events
if (mongoose.connection) {
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    isDbConnected = false;
    // Attempt to reconnect
    setTimeout(() => {
      connectDB();
    }, 5000); // Wait 5 seconds before trying to reconnect
  });
}

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
