
import { useState } from 'react';
import { ethers } from 'ethers';
import { 
  registerUser,
  registerBank,
  assignAdminRole 
} from '../../services/blockchain/roleManagementService';
import {
  saveUserInfo,
  saveBankInfo
} from '../../services/database/userService';
import { toast } from 'sonner';

interface UseRoleManagementProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useRoleManagement = ({ setIsLoading, setError, provider }: UseRoleManagementProps) => {
  // Role Management Functions
  const registerNewUser = async (address: string, userData?: { fullName: string, email?: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      // 1. Register user on blockchain
      await registerUser(address, provider);
      
      // 2. Save user data to MongoDB if provided
      if (userData) {
        // const savedUser = await saveUserInfo({
        //   walletAddress: address,
        //   fullName: userData.fullName,
        //   email: userData.email
        // });
        
        // if (!savedUser) {
        //   throw new Error('Failed to save user information');
        // }
      }
      
      toast.success('User registered successfully');
    } catch (err: any) {
      console.error('Error registering user:', err);
      setError(err.message || 'Failed to register user');
      toast.error(err.message || 'Failed to register user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const registerNewBank = async (
    address: string, 
    name: string, 
    regId: string, 
    additionalInfo?: {
      contactEmail?: string,
      businessAddress?: string,
      website?: string
    }
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      // 1. Register bank on blockchain
      await registerBank(address, name, regId, provider);
      
      // 2. Save bank data to MongoDB
      // const bankData = {
      //   walletAddress: address,
      //   name,
      //   registrationId: regId,
      //   ...additionalInfo
      // };
      
      // const savedBank = await saveBankInfo(bankData);
      
      // if (!savedBank) {
      //   throw new Error('Failed to save bank information');
      // }
      
      toast.success('Bank registered successfully');
    } catch (err: any) {
      console.error('Error registering bank:', err);
      setError(err.message || 'Failed to register bank');
      toast.error(err.message || 'Failed to register bank');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const assignAdmin = async (address: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!provider) throw new Error('Provider not connected');
      
      // Assign admin role on blockchain
      await assignAdminRole(address, provider);
      
      // Update user role in MongoDB
      const savedUser = await saveUserInfo({
        walletAddress: address,
        // We're just updating the MongoDB record to reflect the blockchain change
        // The actual role is maintained by the blockchain
      });
      
      toast.success('Admin role assigned successfully');
    } catch (err: any) {
      console.error('Error assigning admin role:', err);
      setError(err.message || 'Failed to assign admin role');
      toast.error(err.message || 'Failed to assign admin role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerNewUser,
    registerNewBank,
    assignAdmin
  };
};
