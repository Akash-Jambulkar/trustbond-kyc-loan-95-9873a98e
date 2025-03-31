
# TrustBond Blockchain Contracts

This directory contains the smart contract implementation for the TrustBond dApp. The contracts handle role management, KYC verification, trust scoring, and loan management.

## Contract Architecture

The system consists of four main contracts:

1. **RoleManagement.sol** - Handles user roles (admin, bank, user)
2. **KYCContract.sol** - Manages KYC document submission and verification
3. **TrustScore.sol** - Calculates and manages user trust scores
4. **LoanManagement.sol** - Handles loan applications, approvals, and repayments

## Prerequisites

Before deploying the contracts, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Truffle](https://trufflesuite.com/truffle/) (`npm install -g truffle`)
- [Ganache](https://trufflesuite.com/ganache/) for local blockchain

## Contract Deployment

### Option 1: Using Truffle (Recommended)

1. Start Ganache:
   - Open Ganache UI and create a new workspace
   - Set the RPC server to HTTP://127.0.0.1:7545
   - Set the Network ID to 5777

2. Deploy the contracts:
   ```bash
   # From the project root directory
   truffle migrate --network development
   ```

3. The deployment script will automatically update your `.env.local` file with the new contract addresses.

### Option 2: Using Hardhat

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Ganache on port 7545

3. Deploy the contracts:
   ```bash
   npx hardhat run src/contracts/migrations/deploy_contracts.js --network ganache
   ```

### Option 3: Manual Deployment

1. Start Ganache on port 7545

2. Use the provided script:
   ```bash
   node src/contracts/migrations/deploy_contracts.js
   ```

3. Update `.env.local` file with the deployed contract addresses

## Verifying Deployment

To verify that the contracts are deployed correctly:

1. Check the `.env.local` file for the updated contract addresses
2. Use the GanacheStatus component in the application to verify connection
3. Try connecting to the contracts through the app interface

## Contract ABIs

The contract ABIs are stored in JSON format in the `abis` directory:

- `RoleManagement.json`
- `KYCContract.json`
- `TrustScore.json`
- `LoanManagement.json`

## Troubleshooting

If you encounter issues with the deployment:

1. Ensure Ganache is running on port 7545
2. Confirm that the network ID is set to 5777
3. Check for compilation errors in the contracts
4. Make sure you have sufficient ETH in your Ganache account
5. Try restarting Ganache and clearing the workspace

## Security Considerations

1. All contracts use role-based access control
2. Functions are protected with modifiers to ensure only authorized users can call them
3. Input validation is performed
4. Non-reentrant guards are used where necessary

## License

MIT License
