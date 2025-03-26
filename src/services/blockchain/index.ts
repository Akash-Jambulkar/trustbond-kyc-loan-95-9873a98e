
// Re-export all blockchain services
export * from './providerService';
export * from './roleManagementService';
export * from './kycService';
export * from './trustScoreService';
export * from './loanManagementService';
export * from './analyticsService';
export * from './contractAddresses';

// Export the event listeners explicitly to avoid duplicate exports
import { setupEventListeners as setup, removeEventListeners as remove } from './eventListenerService';
export { setup as setupEventListeners, remove as removeEventListeners };
