
#!/bin/bash

# Script to deploy contracts to Ganache using Truffle

# Check if Ganache is running
echo "Checking if Ganache is running..."
nc -z localhost 7545
if [ $? -ne 0 ]; then
  echo "Error: Ganache is not running. Please start Ganache on port 7545."
  exit 1
fi

# Install Truffle globally if not installed
if ! command -v truffle &> /dev/null; then
  echo "Truffle not found, installing..."
  npm install -g truffle
fi

# Compile contracts
echo "Compiling contracts..."
truffle compile

# Deploy contracts
echo "Deploying contracts to Ganache..."
truffle migrate --network development

echo "Deployment complete. Check the .env.local file for updated contract addresses."
