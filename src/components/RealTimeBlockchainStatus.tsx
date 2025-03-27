
import React, { useState, useEffect } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Check, AlertCircle, WifiOff } from 'lucide-react';

const RealTimeBlockchainStatus: React.FC = () => {
  const { 
    isConnected, 
    networkName, 
    chainId, 
    provider, 
    connectToWallet
  } = useBlockchain();
  
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>(
    isConnected ? 'connected' : 'disconnected'
  );
  
  useEffect(() => {
    setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    
    if (isConnected && provider) {
      fetchGasPrice();
    }
  }, [isConnected, provider]);
  
  const fetchGasPrice = async () => {
    if (!provider) return;
    
    try {
      const gasPrice = await provider.getGasPrice();
      // Convert wei to gwei
      const gasPriceInGwei = Number(gasPrice) / 1e9;
      setGasPrice(gasPriceInGwei.toFixed(2));
    } catch (error) {
      console.error('Error fetching gas price:', error);
      setConnectionStatus('error');
    }
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchGasPrice();
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const statusDisplay = () => {
    if (connectionStatus === 'connected') {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          <Check className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      );
    } else if (connectionStatus === 'error') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
          <WifiOff className="h-3 w-3 mr-1" />
          Disconnected
        </Badge>
      );
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Blockchain Status</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={isRefreshing || !isConnected}
            className="h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <CardDescription>Real-time blockchain connection status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <h3 className="font-medium">Not Connected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to the blockchain to see live status
              </p>
              <Button onClick={connectToWallet}>Connect Wallet</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              {statusDisplay()}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              {isConnected ? (
                <span className="font-medium capitalize">{networkName || 'Unknown'}</span>
              ) : (
                <Skeleton className="h-4 w-20" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Chain ID</span>
              {isConnected ? (
                <span className="font-medium">{chainId || 'Unknown'}</span>
              ) : (
                <Skeleton className="h-4 w-10" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gas Price</span>
              {isConnected ? (
                gasPrice ? (
                  <span className="font-medium">{gasPrice} Gwei</span>
                ) : (
                  <Skeleton className="h-4 w-16" />
                )
              ) : (
                <Skeleton className="h-4 w-16" />
              )}
            </div>
            
            <div className="pt-2 border-t text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeBlockchainStatus;
