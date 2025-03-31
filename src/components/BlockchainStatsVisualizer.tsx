
import React, { useState, useEffect } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, LineChart, RefreshCw, TrendingUp, Database } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line
} from 'recharts';
import { getHistoricalBlockchainData, getBlockchainStats, getTransactionCountTrend } from '@/services/blockchain/realTimeProviderService';

// Define chart config
const chartConfig = {
  transactions: {
    label: 'Transactions',
    theme: {
      light: '#7C3AED',
      dark: '#8B5CF6'
    }
  },
  gasUsed: {
    label: 'Gas Used',
    theme: {
      light: '#F97316',
      dark: '#FB923C'
    }
  },
  blockNumber: {
    label: 'Block',
    theme: {
      light: '#10B981',
      dark: '#34D399'
    }
  }
};

const BlockchainStatsVisualizer: React.FC = () => {
  const { isConnected, chainId } = useBlockchain();
  const [blockData, setBlockData] = useState<any[]>([]);
  const [currentStats, setCurrentStats] = useState<any>(null);
  const [txCountTrend, setTxCountTrend] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState('blockActivity');
  
  // Fetch data on mount if connected
  useEffect(() => {
    if (isConnected) {
      fetchBlockchainData();
    }
  }, [isConnected, chainId]);
  
  // Function to fetch all blockchain stats data
  const fetchBlockchainData = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      // Get current blockchain stats
      const stats = await getBlockchainStats();
      setCurrentStats(stats);
      
      // Get historical block data for charts
      const historicalData = await getHistoricalBlockchainData(15);
      setBlockData(historicalData);
      
      // Get transaction count trend for the connected account
      const { account } = useBlockchain();
      if (account) {
        const trend = await getTransactionCountTrend(account, 7);
        setTxCountTrend(trend);
      }
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  // Render loading state
  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Statistics</CardTitle>
          <CardDescription>Connect your wallet to view real-time blockchain data</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6">
          <Database className="h-16 w-16 text-muted-foreground opacity-50" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Blockchain Statistics</CardTitle>
          <CardDescription>Real-time blockchain data visualization</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchBlockchainData} 
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh data</span>
        </Button>
      </CardHeader>
      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">Latest Block</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {currentStats ? (
                <div className="text-2xl font-bold">
                  #{currentStats.blockNumber}
                </div>
              ) : (
                <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">Gas Price</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {currentStats ? (
                <div className="flex items-center text-2xl font-bold">
                  {currentStats.gasPrice} <span className="text-sm font-normal ml-1">Gwei</span>
                </div>
              ) : (
                <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {currentStats ? (
                <div className="text-2xl font-bold">
                  {currentStats.transactions}
                </div>
              ) : (
                <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Tabs */}
        <Tabs defaultValue={activeChart} onValueChange={setActiveChart} className="w-full mt-6">
          <TabsList className="grid grid-cols-2 md:w-auto mb-4">
            <TabsTrigger value="blockActivity" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span>Block Activity</span>
            </TabsTrigger>
            <TabsTrigger value="transactionTrend" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              <span>Transaction Trend</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Block Activity Chart */}
          <TabsContent value="blockActivity">
            <div className="h-[350px] w-full">
              {blockData.length > 0 ? (
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={blockData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="blockNumber" 
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Block Number', position: 'insideBottomRight', offset: -5 }}
                      />
                      <YAxis />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            labelFormatter={(label) => `Block #${label}`}
                          />
                        }
                      />
                      <Legend />
                      <Bar 
                        dataKey="transactions" 
                        name="Transactions" 
                        fill={chartConfig.transactions.theme.light} 
                      />
                      <Bar 
                        dataKey="gasUsed" 
                        name="Gas Used (scaled)" 
                        fill={chartConfig.gasUsed.theme.light}
                        // Scale down gas used to fit on the same chart
                        stackId="a"
                        hide
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-10 w-10 mb-2 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {isLoading ? 'Loading blockchain data...' : 'No blockchain data available'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Transaction Trend Chart */}
          <TabsContent value="transactionTrend">
            <div className="h-[350px] w-full">
              {txCountTrend.length > 0 ? (
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={txCountTrend}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }}
                      />
                      <YAxis />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        }
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Transaction Count" 
                        stroke={chartConfig.transactions.theme.light}
                        activeDot={{ r: 8 }} 
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-10 w-10 mb-2 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {isLoading ? 'Loading transaction data...' : 'No transaction data available'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BlockchainStatsVisualizer;
