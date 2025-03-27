
# DeFi KYC & Loan Platform

A decentralized application for KYC verification and loan management on the blockchain.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MetaMask](https://metamask.io/) browser extension
- [Ganache](https://trufflesuite.com/ganache/) for local blockchain testing

### Ganache Setup
1. Download and install Ganache from [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/)
2. Create a new workspace
3. Configure Ganache to run on port 7545 (default)
4. Start the Ganache blockchain

### MetaMask Configuration
1. Install the MetaMask browser extension
2. Set up a new network in MetaMask with the following details:
   - Network Name: Ganache Local
   - New RPC URL: http://127.0.0.1:7545
   - Chain ID: 5777
   - Currency Symbol: ETH
3. Import a test account from Ganache using the private key

### Smart Contract Deployment
1. Deploy the following contracts to Ganache:
   - RoleManagement
   - KYCContract
   - LoanManagement
   - TrustScore
2. Update the contract addresses in the `.env.local` file

### Install Dependencies
```bash
npm install
```

### Environment Configuration
1. Create a `.env.local` file in the root directory
2. Copy the contents of `.env.example` into `.env.local`
3. Update the contract addresses with your deployed contract addresses

### Start the Application
```bash
npm run dev
```

## Testing Blockchain Functionality

### Test User Flow
1. Connect to MetaMask using the "Connect Wallet" button
2. Register as a user
3. Submit KYC documents
4. Apply for a loan

### Test Bank Flow
1. Connect with a different account
2. Register as a bank
3. Verify user KYC documents
4. Review and approve/reject loan applications

### Test Admin Flow
1. Connect with the admin account (typically the account that deployed the contracts)
2. View analytics dashboard
3. Manage user and bank registrations

## Troubleshooting

### Common Issues
- **MetaMask not connecting**: Ensure Ganache is running and you've configured the network correctly in MetaMask
- **Contract interaction failing**: Verify that contract addresses in `.env.local` match the deployed contracts
- **Transaction errors**: Make sure you have enough ETH in your test account
