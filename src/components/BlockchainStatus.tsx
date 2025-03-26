
import React, { useEffect, useState } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { 
  AlertCircle, 
  CheckCircle, 
  Wallet, 
  Shield, 
  Network,
  AlertTriangle,
  CircleDollarSign,
  LucideIcon,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ethers } from 'ethers';

const BlockchainStatus: React.FC = () => {
  const { 
    isConnected, 
    account, 
    userRole, 
    connectToWallet, 
    disconnectWallet, 
    isLoading,
    chainId,
    networkName,
    balance
  } = useBlockchain();
  
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);
  
  // Check if it's the expected network (this is a simple example, adjust for your use case)
  useEffect(() => {
    if (isConnected && chainId) {
      // Update this condition based on your target network
      setIsCorrectNetwork(
        chainId === '1' || // Ethereum Mainnet
        chainId === '5' || // Goerli
        chainId === '11155111' // Sepolia
      );
    }
  }, [isConnected, chainId]);
  
  // Format account address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Convert balance to a more readable format
  const formatBalance = (balanceInEth: string) => {
    if (!balanceInEth) return '0';
    const balance = parseFloat(balanceInEth);
    if (balance < 0.001) return '< 0.001 ETH';
    return `${balance.toFixed(4)} ETH`;
  };

  // Role badge configuration
  const getRoleBadge = () => {
    const roleConfig: Record<string, { label: string, icon: LucideIcon, className: string }> = {
      user: { 
        label: 'User', 
        icon: Shield, 
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
      },
      bank: { 
        label: 'Financial Institution', 
        icon: CircleDollarSign, 
        className: 'bg-purple-100 text-purple-800 hover:bg-purple-100' 
      },
      admin: { 
        label: 'Administrator', 
        icon: Shield, 
        className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' 
      }
    };

    const role = userRole || 'guest';
    const config = roleConfig[role] || { 
      label: 'Guest', 
      icon: AlertCircle, 
      className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' 
    };

    return (
      <Badge variant="outline" className={config.className}>
        <config.icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Blockchain Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-4">
            <Wallet className="h-10 w-10 text-muted-foreground animate-pulse mb-2" />
            <p className="text-sm font-medium">Connecting to wallet...</p>
            <Progress className="w-full mt-4" value={50} />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render not connected state
  if (!isConnected) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Blockchain Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
            <p className="text-sm font-medium mb-4">Not connected to blockchain</p>
            <Button onClick={connectToWallet} className="bg-green-600 hover:bg-green-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render connected state
  return (
    <Card className="overflow-hidden border-green-100">
      <CardHeader className="pb-2 bg-green-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-green-800">Blockchain Status</CardTitle>
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Wallet Address */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Account</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <span className="text-sm font-mono">{formatAddress(account)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-mono text-xs">{account}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Balance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Balance</span>
            </div>
            <span className="text-sm font-medium">{formatBalance(balance)}</span>
          </div>
          
          {/* Role */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Role</span>
            </div>
            {getRoleBadge()}
          </div>
          
          {/* Network */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Network className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Network</span>
            </div>
            {isCorrectNetwork ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 font-mono text-xs">
                {networkName || 'Unknown'} ({chainId})
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Wrong Network
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-green-50 border-t border-green-100 pt-2 pb-2 px-6">
        <div className="flex w-full justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
            onClick={() => {
              window.open(`https://etherscan.io/address/${account}`, '_blank');
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View on Explorer
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlockchainStatus;
