
# TrustBond Blockchain Contracts

This directory contains the smart contract implementation for the TrustBond dApp. The contracts handle role management, KYC verification, trust scoring, and loan management.

## Contract Architecture

The system consists of four main contracts:

1. **RoleManagement.sol** - Handles user roles (admin, bank, user)
2. **KYCContract.sol** - Manages KYC document submission and verification
3. **TrustScore.sol** - Calculates and manages user trust scores
4. **LoanManagement.sol** - Handles loan applications, approvals, and repayments

## Contract Deployment

The contracts should be deployed in the following order:

1. RoleManagement
2. KYCContract (requires RoleManagement address)
3. TrustScore (requires RoleManagement and KYCContract addresses)
4. LoanManagement (requires RoleManagement and TrustScore addresses)

## Deployment Instructions

### Using Truffle or Hardhat

1. Install dependencies: `npm install`
2. Compile contracts: `npx hardhat compile` or `truffle compile`
3. Deploy to Ganache: `npx hardhat run scripts/deploy.js --network ganache` or `truffle migrate --network ganache`

### Manual Deployment

1. Start Ganache on port 7545
2. Use the provided script in `migrations/deploy_contracts.js`
3. Run script with Node.js: `node migrations/deploy_contracts.js`
4. Update `.env` file with the deployed contract addresses

## Development Workflow

1. Clone the repository
2. Install dependencies
3. Start Ganache on port 7545
4. Compile and deploy contracts using Truffle or Hardhat
5. Update `.env` file with contract addresses
6. Run the frontend application

## Testing

1. Run tests: `npx hardhat test` or `truffle test`
2. Run coverage: `npx hardhat coverage` or `truffle run coverage`

## Contract ABIs

The contract ABIs are stored in JSON format in the `abis` directory:

- `RoleManagement.json`
- `KYCContract.json`
- `TrustScore.json`
- `LoanManagement.json`

## Security Considerations

1. All contracts use role-based access control
2. Functions are protected with modifiers to ensure only authorized users can call them
3. Input validation is performed
4. Non-reentrant guards are used where necessary

## License

MIT License
