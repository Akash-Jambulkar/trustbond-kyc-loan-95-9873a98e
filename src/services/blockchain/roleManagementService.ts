
import { ethers } from 'ethers';
import RoleManagementABI from '../../contracts/abis/RoleManagement.json';
import { CONTRACT_ADDRESSES } from './contractAddresses';
import { getProvider, getSigner, initBlockchain } from './providerService';

// Contract instance
let roleManagementContract: ethers.Contract | null = null;

// Initialize role management contract
const initRoleManagementContract = async () => {
  if (!roleManagementContract) {
    const signer = getSigner();
    if (!signer) {
      await initBlockchain();
    }
    
    roleManagementContract = new ethers.Contract(
      CONTRACT_ADDRESSES.roleManagement,
      RoleManagementABI,
      getSigner() || getProvider()
    );
  }
  
  return roleManagementContract;
};

// Get user role
export const getUserRole = async (address: string) => {
  try {
    const contract = await initRoleManagementContract();
    const role = await contract?.getUserRole(address);
    return role;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Check user role - wrapper for getUserRole
export const checkUserRole = async (address: string, provider: ethers.providers.Web3Provider) => {
  return await getUserRole(address);
};

export const registerUser = async (address: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initRoleManagementContract();
    const tx = await contract?.registerUser(address);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const registerBank = async (address: string, name: string, regId: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initRoleManagementContract();
    const tx = await contract?.registerBank(address, name, regId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error registering bank:', error);
    return false;
  }
};

export const approveBank = async (bankAddress: string) => {
  try {
    const contract = await initRoleManagementContract();
    const tx = await contract?.approveBank(bankAddress);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error approving bank:', error);
    return false;
  }
};

export const assignAdminRole = async (address: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initRoleManagementContract();
    const tx = await contract?.assignAdminRole(address);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error assigning admin role:', error);
    return false;
  }
};
