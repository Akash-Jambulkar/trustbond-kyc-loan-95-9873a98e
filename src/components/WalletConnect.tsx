
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WalletConnect = () => {
  const { isConnected, account, connectToWallet, disconnectWallet, isLoading } = useBlockchain();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectToWallet();
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled className="bg-green-50 text-green-700">
        <span className="animate-pulse">Loading wallet...</span>
      </Button>
    );
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        variant="outline"
        size="sm"
        className="bg-green-600 hover:bg-green-700 text-white"
        disabled={isConnecting}
      >
        {isConnecting ? (
          <span className="animate-pulse">Connecting...</span>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          >
            <Wallet className="mr-2 h-4 w-4 text-green-500" />
            {formatAddress(account)}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm space-y-1">
            <p className="font-medium">Connected Wallet</p>
            <p className="text-xs font-mono">{account}</p>
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full mt-2"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WalletConnect;
