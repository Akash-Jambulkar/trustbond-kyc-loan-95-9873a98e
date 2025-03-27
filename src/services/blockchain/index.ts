
// Re-export all blockchain services
export * from './providerService';
export * from './roleManagementService';
export * from './kycService';
export * from './trustScoreService';
export * from './loanManagementService';
export * from './analyticsService';
export * from './contractAddresses';

// Export event listener service explicitly to avoid ambiguity
export { 
  setupEventListeners as setupEventListenersService,
  removeEventListeners as removeEventListenersService
} from './eventListenerService';
