
import React, { useEffect, useState } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Refresh, AlertCircle, CheckCircle, Wallet, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { getNetworkName } from '@/services/blockchain/providerService';

const RealTimeBlockchainStatus: React.FC = () => {
  const { 
    isConnected, 
    account, 
    provider, 
    chainId, 
    balance,
    connectToWallet
  } = useBlockchain();
  
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');
  const [gasPrice, setGasPrice] = useState<string>('');
  
  // Check network status and update blockchain data
  useEffect(() => {
    const checkNetworkAndUpdateData = async () => {
      try {
        // Check if online
        setNetworkStatus(navigator.onLine ? 'online' : 'offline');
        
        // If we have a provider and are connected, get latest gas price
        if (provider && isConnected) {
          const gas = await provider.getGasPrice();
          // Convert to Gwei
          setGasPrice((parseInt(gas.toString()) / 1e9).toFixed(2));
        }
      } catch (error) {
        console.error('Error updating blockchain data:', error);
      }
    };
    
    // Initial check
    checkNetworkAndUpdateData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      checkNetworkAndUpdateData();
    }, 30000);
    
    // Set up network status event listeners
    window.addEventListener('online', () => setNetworkStatus('online'));
    window.addEventListener('offline', () => setNetworkStatus('offline'));
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', () => setNetworkStatus('online'));
      window.removeEventListener('offline', () => setNetworkStatus('offline'));
    };
  }, [provider, isConnected]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // If not connected, try to connect
      if (!isConnected) {
        await connectToWallet();
      } else if (provider) {
        // Update gas price
        const gas = await provider.getGasPrice();
        setGasPrice((parseInt(gas.toString()) / 1e9).toFixed(2));
        
        // You could also manually update other blockchain data here
        
        toast.success('Blockchain data refreshed');
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing blockchain data:', error);
      toast.error('Failed to refresh blockchain data');
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Blockchain Status</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Refresh className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Connection Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Connection</span>
            {networkStatus === 'online' ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
          
          {/* Wallet Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Wallet</span>
            {isConnected ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                <Wallet className="h-3 w-3 mr-1" />
                Disconnected
              </Badge>
            )}
          </div>
          
          {/* Current Network */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network</span>
            {isConnected && chainId ? (
              <Badge variant="outline" className="font-mono text-xs">
                {getNetworkName(chainId)}
              </Badge>
            ) : (
              <Skeleton className="h-5 w-24" />
            )}
          </div>
          
          {/* Gas Price */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Gas Price</span>
            {isConnected && gasPrice ? (
              <span className="text-sm font-medium">{gasPrice} Gwei</span>
            ) : (
              <Skeleton className="h-5 w-16" />
            )}
          </div>
          
          {/* Last Updated */}
          <div className="pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeBlockchainStatus;
