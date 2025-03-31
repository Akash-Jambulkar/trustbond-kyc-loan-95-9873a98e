
# TrustBond DeFi KYC & Loan Platform - Installation Guide

This guide will help you set up and run the TrustBond DeFi KYC & Loan Platform on your local environment.

## Prerequisites

Before you begin, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Ganache](https://trufflesuite.com/ganache/) for running a local Ethereum blockchain
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/) for cloning the repository

## Step 1: Clone the Repository

```bash
git clone [your-repository-url]
cd trustbond-kyc-loan
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Ganache (Local Blockchain)

1. Download and install Ganache from [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/)
2. Launch Ganache and create a new workspace with the following settings:
   - Server: HTTP://127.0.0.1:7545
   - Network ID: 5777
   - Gas Limit: 6721975
   - Gas Price: 20000000000 (20 Gwei)

## Step 4: Deploy Smart Contracts

There are two ways to deploy the smart contracts:

### Option 1: Using the deploy-contracts.sh script

```bash
# Make the script executable
chmod +x deploy-contracts.sh

# Run the script
./deploy-contracts.sh
```

### Option 2: Using Truffle manually

```bash
# Install Truffle globally if you don't have it
npm install -g truffle

# Compile contracts
truffle compile

# Deploy contracts to Ganache
truffle migrate --network development
```

The deployment script will automatically update your `.env.local` file with the new contract addresses.

## Step 5: Configure MetaMask

1. Install the MetaMask browser extension if you haven't already
2. Create a new network in MetaMask with these details:
   - Network Name: Ganache Local
   - New RPC URL: http://127.0.0.1:7545
   - Chain ID: 5777
   - Currency Symbol: ETH
3. Import a test account from Ganache:
   - In Ganache, click on the key icon next to any account to show its private key
   - In MetaMask, click "Import Account" and paste the private key

## Step 6: Create .env.local File

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

The contract deployment script should have updated this file with the correct contract addresses. If not, manually copy the addresses from Ganache into this file.

## Step 7: Start the Application

```bash
npm run dev
```

The application should now be running at [http://localhost:8080](http://localhost:8080).

## Testing Different User Roles

### Admin Role
- The account that deployed the contracts is automatically assigned the admin role
- Connect MetaMask with this account to access admin features

### Bank Role
- Connect with a different account
- Register as a bank through the registration form
- Admin needs to approve the bank before it can access bank features

### User Role
- Connect with another unique account
- Register as a user
- Submit KYC documents for verification
- Once verified, users can apply for loans

## Common Issues and Troubleshooting

### MetaMask Connection Issues
- Ensure Ganache is running before starting the application
- Check that the network configuration in MetaMask matches Ganache settings
- Try resetting your MetaMask account (Settings > Advanced > Reset Account)

### Contract Interaction Failures
- Verify contract addresses in `.env.local` match those deployed in Ganache
- Check console logs for specific error messages
- Ensure your MetaMask account has enough ETH for gas fees

### Invalid Contract ABI
- Make sure you've compiled the contracts (`truffle compile`)
- Verify the contract build artifacts exist in `src/contracts/build`

## Advanced Configuration

For more advanced configuration options, refer to the `truffle-config.js` and `vite.config.ts` files.

