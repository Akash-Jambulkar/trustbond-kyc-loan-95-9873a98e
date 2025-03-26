
import { ethers } from 'ethers';
import TrustScoreABI from '../../contracts/abis/TrustScore.json';
import { CONTRACT_ADDRESSES } from './contractAddresses';
import { getProvider, getSigner, initBlockchain } from './providerService';

// Contract instance
let trustScoreContract: ethers.Contract | null = null;

// Initialize Trust Score contract
const initTrustScoreContract = async () => {
  if (!trustScoreContract) {
    const signer = getSigner();
    if (!signer) {
      await initBlockchain();
    }
    
    trustScoreContract = new ethers.Contract(
      CONTRACT_ADDRESSES.trustScore,
      TrustScoreABI,
      getSigner() || getProvider()
    );
  }
  
  return trustScoreContract;
};

// Trust Score Contract Functions
export const getTrustScore = async (address: string, provider?: ethers.providers.Web3Provider) => {
  try {
    const contract = await initTrustScoreContract();
    const score = await contract?.getTrustScore(address);
    return score.toNumber();
  } catch (error) {
    console.error('Error getting trust score:', error);
    return null;
  }
};

export const updateTrustScore = async (userAddress: string, newScore: number) => {
  try {
    const contract = await initTrustScoreContract();
    const tx = await contract?.updateTrustScore(userAddress, newScore);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error updating trust score:', error);
    return false;
  }
};

export const calculateTrustScore = async (userAddress: string, provider: ethers.providers.Web3Provider) => {
  try {
    // In a real application, this would calculate a score based on various factors
    // For now, we'll just use updateTrustScore with a random score
    const score = Math.floor(Math.random() * 100);
    return await updateTrustScore(userAddress, score);
  } catch (error) {
    console.error('Error calculating trust score:', error);
    return false;
  }
};

export const getTrustScoreData = async (address: string) => {
  try {
    const contract = await initTrustScoreContract();
    const data = await contract?.getTrustScoreData(address);
    return {
      score: data.score.toNumber(),
      lastUpdated: new Date(data.lastUpdated.toNumber() * 1000),
      verificationLevel: data.verificationLevel,
      history: data.history.map((item: any) => ({
        score: item.score.toNumber(),
        timestamp: new Date(item.timestamp.toNumber() * 1000),
        reason: item.reason
      }))
    };
  } catch (error) {
    console.error('Error getting trust score data:', error);
    return null;
  }
};
