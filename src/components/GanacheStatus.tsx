
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, RefreshCw, Settings } from 'lucide-react';
import { checkGanacheConnection, addGanacheToMetaMask, verifyContractAddresses } from '@/utils/ganacheSetup';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { toast } from 'sonner';

const GanacheStatus: React.FC = () => {
  const [isGanacheRunning, setIsGanacheRunning] = useState<boolean | null>(null);
  const [areContractsValid, setAreContractsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { connectToWallet, isConnected, chainId } = useBlockchain();
  
  const checkGanacheStatus = async () => {
    setIsChecking(true);
    
    try {
      // Check if Ganache is running
      const ganacheRunning = await checkGanacheConnection();
      setIsGanacheRunning(ganacheRunning);
      
      if (ganacheRunning) {
        // Check if contracts are valid
        const contractsValid = await verifyContractAddresses();
        setAreContractsValid(contractsValid);
        
        if (!contractsValid) {
          toast.error("Contract addresses are invalid. Please check your .env.local file.");
        }
      }
    } catch (error) {
      console.error("Error checking Ganache status:", error);
      setIsGanacheRunning(false);
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleAddGanacheToMetaMask = async () => {
    const added = await addGanacheToMetaMask();
    if (added) {
      toast.success("Ganache network added to MetaMask successfully");
      // Try to connect wallet after adding network
      await connectToWallet();
    }
  };
  
  // Check Ganache status on component mount
  useEffect(() => {
    checkGanacheStatus();
  }, []);
  
  // Check if connected to Ganache
  const isConnectedToGanache = isConnected && chainId === '5777';
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Ganache Status</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkGanacheStatus} 
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>Local blockchain connection status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ganache Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Ganache Status</span>
          {isGanacheRunning === null ? (
            <Badge variant="outline" className="bg-gray-100 text-gray-800">Checking...</Badge>
          ) : isGanacheRunning ? (
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Running
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Running
            </Badge>
          )}
        </div>
        
        {/* Contract Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Smart Contracts</span>
          {areContractsValid === null ? (
            <Badge variant="outline" className="bg-gray-100 text-gray-800">Not Checked</Badge>
          ) : areContractsValid ? (
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Valid
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Invalid
            </Badge>
          )}
        </div>
        
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connected to Ganache</span>
          {isConnectedToGanache ? (
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Connected
            </Badge>
          )}
        </div>
        
        {/* Alert for user action */}
        {!isGanacheRunning && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ganache Not Running</AlertTitle>
            <AlertDescription>
              Please start Ganache on port 7545 to use the local blockchain features.
            </AlertDescription>
          </Alert>
        )}
        
        {isGanacheRunning && !isConnectedToGanache && (
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertTitle>Connect to Ganache</AlertTitle>
            <AlertDescription>
              To use the blockchain features, add Ganache to MetaMask and connect your wallet.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        {isGanacheRunning && !isConnectedToGanache && (
          <Button onClick={handleAddGanacheToMetaMask}>
            Add Ganache to MetaMask
          </Button>
        )}
        {isGanacheRunning && !isConnected && (
          <Button onClick={connectToWallet}>
            Connect Wallet
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GanacheStatus;
