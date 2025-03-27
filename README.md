
# TrustBond DeFi KYC & Loan Platform

A blockchain-based KYC and loan platform integrating Ethereum, MongoDB, and real-time data management.

## Environment Setup

1. **Create a `.env` file** at the root of the project using the template from `.env.example`:

```bash
cp .env.example .env
```

2. **Configure your environment variables** in the `.env` file:
   - Set your MongoDB connection string
   - Configure blockchain settings (RPC URLs, contract addresses)
   - Adjust other application settings as needed

## Prerequisites

- Node.js 16+
- MongoDB (local or remote instance)
- Ganache (for local blockchain development)
- MetaMask browser extension

## Blockchain Setup

1. **Install and configure MetaMask**:
   - Add a new network with RPC URL: `http://127.0.0.1:7545` (for Ganache)
   - Chain ID: `5777`

2. **Start Ganache**:
   - Use Ganache UI or CLI to start a local blockchain
   - Make sure it's running on port 7545

3. **Deploy smart contracts** (if needed):
   - The application is pre-configured to use the contract addresses in the `.env` file
   - For local development, you can use the default Ganache addresses

## MongoDB Setup

1. **Start MongoDB**:
   - Local: Run `mongod` service
   - Remote: Ensure you have the correct connection string in `.env`

2. **Database initialization**:
   - The application will automatically create the required collections and indexes

## Running the Application

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Access the application**:
   - Open your browser at `http://localhost:8080`
   - Connect your MetaMask wallet to interact with the blockchain features

## Real-Time Data Features

- **Blockchain Status**: View real-time gas prices, network status, and blockchain connection
- **User KYC Status**: Monitor document verification progress and trust score in real-time
- **Transaction Monitoring**: Real-time updates for loan and KYC transactions

## Document Management

The platform supports uploading and validating documents with the following restrictions:
- File types: Text, PDF, JPEG, PNG
- Maximum file size: 5MB
- Text-only validation for text files

## Troubleshooting

- **MongoDB Connection Issues**: Ensure MongoDB is running and accessible
- **Blockchain Connection Failures**: Verify Ganache is running and MetaMask is correctly configured
- **Smart Contract Interactions**: Check that contract addresses in `.env` match deployed contracts

## Security Features

- Text-only validation for sensitive documents
- Real-time connection status monitoring
- Secure client-side file validation before submission
