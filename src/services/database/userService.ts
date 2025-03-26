
import UserInfo, { IUserInfo } from './models/UserInfo';
import BankInfo, { IBankInfo } from './models/BankInfo';
import { connectDB, isConnected } from './mongoConnection';

export const saveUserInfo = async (userData: Partial<IUserInfo>): Promise<IUserInfo | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    // Check if user exists
    const existingUser = await UserInfo.findOne({ walletAddress: userData.walletAddress });
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await UserInfo.findOneAndUpdate(
        { walletAddress: userData.walletAddress },
        { $set: userData },
        { new: true }
      );
      return updatedUser;
    } else {
      // Create new user
      const newUser = new UserInfo(userData);
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error('Error saving user info:', error);
    return null;
  }
};

export const getUserInfo = async (walletAddress: string): Promise<IUserInfo | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const user = await UserInfo.findOne({ walletAddress });
    return user;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

export const saveBankInfo = async (bankData: Partial<IBankInfo>): Promise<IBankInfo | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    // Check if bank exists
    const existingBank = await BankInfo.findOne({ walletAddress: bankData.walletAddress });
    
    if (existingBank) {
      // Update existing bank
      const updatedBank = await BankInfo.findOneAndUpdate(
        { walletAddress: bankData.walletAddress },
        { $set: bankData },
        { new: true }
      );
      return updatedBank;
    } else {
      // Create new bank
      const newBank = new BankInfo(bankData);
      await newBank.save();
      return newBank;
    }
  } catch (error) {
    console.error('Error saving bank info:', error);
    return null;
  }
};

export const getBankInfo = async (walletAddress: string): Promise<IBankInfo | null> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const bank = await BankInfo.findOne({ walletAddress });
    return bank;
  } catch (error) {
    console.error('Error getting bank info:', error);
    return null;
  }
};

export const getAllBanks = async (): Promise<IBankInfo[]> => {
  try {
    if (!isConnected()) {
      await connectDB();
    }
    
    const banks = await BankInfo.find();
    return banks;
  } catch (error) {
    console.error('Error getting all banks:', error);
    return [];
  }
};
