
import { ethers } from 'ethers';
import KYCContractABI from '../../contracts/abis/KYCContract.json';
import { CONTRACT_ADDRESSES } from './contractAddresses';
import { getProvider, getSigner, initBlockchain } from './providerService';

// Contract instance
let kycContract: ethers.Contract | null = null;

// Initialize KYC contract
export const initKYCContract = async () => {
  if (!kycContract) {
    const signer = getSigner();
    if (!signer) {
      await initBlockchain();
    }
    
    kycContract = new ethers.Contract(
      CONTRACT_ADDRESSES.kycContract,
      KYCContractABI,
      getSigner() || getProvider()
    );
  }
  
  return kycContract;
};

// KYC Contract Functions
export const submitKYC = async (data: any, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initKYCContract();
    // Assume data is an array of document hashes
    const documentHashes = Array.isArray(data) ? data : [data.toString()];
    
    // Submit to blockchain and get transaction response
    const tx = await contract?.submitKYC(documentHashes);
    
    // Return the transaction response which includes the hash
    return tx;
  } catch (error) {
    console.error('Error submitting KYC:', error);
    return false;
  }
};

export const getKYCStatus = async (address: string, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initKYCContract();
    const status = await contract?.getKYCStatus(address);
    return status;
  } catch (error) {
    console.error('Error getting KYC status:', error);
    return null;
  }
};

export const verifyKYC = async (userAddress: string, isApproved: boolean, provider: ethers.providers.Web3Provider) => {
  try {
    const contract = await initKYCContract();
    const tx = await contract?.verifyKYC(userAddress, isApproved);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait(1);
    
    return receipt;
  } catch (error) {
    console.error('Error verifying KYC:', error);
    return false;
  }
};

export const getDocuments = async (address: string) => {
  try {
    const contract = await initKYCContract();
    const documents = await contract?.getDocuments(address);
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

export const updateDocument = async (documentType: string, documentHash: string) => {
  try {
    const contract = await initKYCContract();
    const tx = await contract?.updateDocument(documentType, documentHash);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
};

export const getUserKYCData = async (address: string, provider: ethers.providers.Web3Provider) => {
  try {
    const status = await getKYCStatus(address, provider);
    const documents = await getDocuments(address);
    
    return {
      status,
      documents,
      submittedAt: new Date().toISOString(), // Mock data, replace with actual timestamp from contract
      verifiedAt: status === 'verified' ? new Date().toISOString() : null
    };
  } catch (error) {
    console.error('Error getting KYC data:', error);
    return null;
  }
};
