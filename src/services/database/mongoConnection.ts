
import mongoose from 'mongoose';
import { toast } from 'sonner';
import { MONGODB_URI } from '../../config/env';

// MongoDB connection
const connectDB = async () => {
  try {
    // Use environment variable from config
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');
    return true;
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    toast.error('Failed to connect to MongoDB');
    return false;
  }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected...');
    return true;
  } catch (err: any) {
    console.error('MongoDB disconnection error:', err.message);
    return false;
  }
};

// Check if connected
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

export { connectDB, disconnectDB, isConnected };
