
declare global {
  interface Window {
    ethereum: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: Array<any> }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
      networkVersion: string;
      chainId: string;
      selectedAddress: string | null;
    };
  }
}

export {};
