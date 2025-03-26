
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define empty env variables for development to prevent runtime errors
  define: {
    // This provides fallbacks for any environment variables that might be accessed
    'import.meta.env.VITE_MONGODB_URI': JSON.stringify(process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/defi-kyc-loan'),
    'import.meta.env.VITE_DEFAULT_CHAIN_ID': JSON.stringify(process.env.VITE_DEFAULT_CHAIN_ID || '5777'), // Ganache default chain ID
    'import.meta.env.VITE_MAINNET_RPC_URL': JSON.stringify(process.env.VITE_MAINNET_RPC_URL || ''),
    'import.meta.env.VITE_GOERLI_RPC_URL': JSON.stringify(process.env.VITE_GOERLI_RPC_URL || ''),
    'import.meta.env.VITE_SEPOLIA_RPC_URL': JSON.stringify(process.env.VITE_SEPOLIA_RPC_URL || ''),
    'import.meta.env.VITE_GANACHE_RPC_URL': JSON.stringify(process.env.VITE_GANACHE_RPC_URL || 'http://127.0.0.1:7545'),
    'import.meta.env.VITE_ROLE_MANAGEMENT_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_ROLE_MANAGEMENT_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_KYC_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_KYC_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_LOAN_MANAGEMENT_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_LOAN_MANAGEMENT_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_TRUST_SCORE_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_TRUST_SCORE_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_TESTNET_ROLE_MANAGEMENT_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_TESTNET_KYC_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_TESTNET_KYC_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_TESTNET_LOAN_MANAGEMENT_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_TESTNET_TRUST_SCORE_CONTRACT_ADDRESS': JSON.stringify(process.env.VITE_TESTNET_TRUST_SCORE_CONTRACT_ADDRESS || ''),
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || ''),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.VITE_APP_VERSION || '1.0.0'),
    // Polyfill globals for ethers.js
    'global': 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
    }
  },
}));
