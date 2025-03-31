
# Running the TrustBond DeFi KYC & Loan Platform

This document provides quick start instructions for running the TrustBond platform once it's been installed.

## Quick Start

1. **Start Ganache:**
   - Launch Ganache and make sure it's running on port 7545
   - Verify your workspace is loaded and accounts have ETH

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open your browser and navigate to [http://localhost:8080](http://localhost:8080)
   - Connect your MetaMask wallet using the "Connect Wallet" button

## Available Pages

The application includes the following main pages:

- **Landing Page** (`/`): Introduction to TrustBond
- **Dashboard Analytics** (`/analytics`): Blockchain statistics and visualizations
- **User Dashboard** (`/user/dashboard`): For regular users to manage profiles and documents
- **Bank Dashboard** (`/bank/dashboard`): For bank users to verify KYC and manage loans
- **Admin Dashboard** (`/admin/dashboard`): For admin users to manage the platform

## Testing Workflows

### KYC Verification Flow
1. Register as a user (`/auth/register`)
2. Submit KYC documents (`/user/documents`)
3. Switch to bank/admin account in MetaMask
4. Approve KYC documents (`/bank/user-verification` or `/admin/kyc-management`)
5. Switch back to user account
6. Check verification status (`/user/kyc-status`)

### Loan Application Flow
1. As a verified user, apply for a loan (`/user/loans`)
2. Switch to bank account in MetaMask
3. Review and approve/reject the loan (`/bank/loan-management`)
4. Switch back to user account to check loan status

## User Roles and Permissions

- **Admin**: Can manage users, banks, KYC processes, and monitor transactions
- **Bank**: Can verify user KYC documents and approve/reject loan applications
- **User**: Can submit KYC documents and apply for loans

## Demonstration Script

For demonstration purposes, you can follow this script:

1. Deploy contracts to Ganache
2. Register accounts for admin, bank, and user roles
3. Perform KYC verification for the user
4. Apply for a loan
5. Demonstrate loan approval process
6. Show trust score calculation
7. Display analytics dashboard

## Stopping the Application

Press `Ctrl+C` in the terminal running the development server to stop the application.

## Resetting the Environment

To completely reset the environment:
1. Stop the application
2. Restart Ganache with a new workspace
3. Redeploy the contracts
4. Update `.env.local` with new contract addresses
5. Start the application again

