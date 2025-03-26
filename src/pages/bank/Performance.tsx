
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Sector,
  Cell as RechartsCell
} from 'recharts';
import { Percent, TrendingUp, Check, X, Clock, DollarSign } from 'lucide-react';

const Performance: React.FC = () => {
  // Mock data for demonstration
  const loanApprovalRate = 78;
  const riskExposure = 32;
  const profitMargin = 6.8;

  // Monthly performance data
  const monthlyPerformance = [
    { name: 'Jan', approvals: 12, rejections: 4, volume: 125000 },
    { name: 'Feb', approvals: 15, rejections: 5, volume: 145000 },
    { name: 'Mar', approvals: 18, rejections: 3, volume: 170000 },
    { name: 'Apr', approvals: 22, rejections: 6, volume: 210000 },
    { name: 'May', approvals: 19, rejections: 4, volume: 190000 },
    { name: 'Jun', approvals: 25, rejections: 5, volume: 230000 },
    { name: 'Jul', approvals: 20, rejections: 4, volume: 200000 },
  ];

  // Risk exposure data
  const riskData = [
    { category: 'Low Risk', value: 45, color: '#4ade80' },
    { category: 'Medium Risk', value: 35, color: '#facc15' },
    { category: 'High Risk', value: 20, color: '#f87171' },
  ];

  // Loan performance data
  const loanPerformance = [
    { name: 'Jan', repayments: 95, defaults: 5 },
    { name: 'Feb', repayments: 97, defaults: 3 },
    { name: 'Mar', repayments: 94, defaults: 6 },
    { name: 'Apr', repayments: 98, defaults: 2 },
    { name: 'May', repayments: 96, defaults: 4 },
    { name: 'Jun', repayments: 93, defaults: 7 },
    { name: 'Jul', repayments: 97, defaults: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground">Monitor your loan portfolio performance and risk metrics</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loan Approval Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loanApprovalRate}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Last 30 days
              </p>
              <Progress className="mt-3" value={loanApprovalRate} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Exposure</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{riskExposure}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Of total portfolio
              </p>
              <Progress className="mt-3 bg-yellow-100" value={riskExposure} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profitMargin}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Average return on loans
              </p>
              <Progress className="mt-3 bg-green-100" value={profitMargin * 10} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="volume" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="volume">Loan Volume</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="performance">Repayment Performance</TabsTrigger>
          </TabsList>
          
          {/* Loan Volume Tab */}
          <TabsContent value="volume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Loan Activity</CardTitle>
                <CardDescription>
                  Number of approved and rejected loans per month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="approvals" name="Approved Loans" fill="#4ade80" />
                      <Bar dataKey="rejections" name="Rejected Applications" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Monthly Loan Volume</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyPerformance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Volume']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="volume" name="Loan Volume ($)" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Exposure Analysis</CardTitle>
                <CardDescription>
                  Breakdown of portfolio by risk category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Bar dataKey="value" name="Percentage of Portfolio">
                        {riskData.map((entry, index) => (
                          <RechartsCell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Low Risk Loans</p>
                          <p className="text-2xl font-bold text-green-600">{riskData[0].value}%</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Medium Risk Loans</p>
                          <p className="text-2xl font-bold text-amber-600">{riskData[1].value}%</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">High Risk Loans</p>
                          <p className="text-2xl font-bold text-red-600">{riskData[2].value}%</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Repayment Performance</CardTitle>
                <CardDescription>
                  Monthly repayment rates and defaults
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={loanPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      stackOffset="expand"
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(tick) => `${tick}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="repayments" name="On-time Repayments" stackId="a" fill="#4ade80" />
                      <Bar dataKey="defaults" name="Defaults" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Average Repayment Rate</p>
                          <p className="text-2xl font-bold text-green-600">
                            {Math.round(loanPerformance.reduce((acc, item) => acc + item.repayments, 0) / loanPerformance.length)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <Progress 
                        className="mt-3" 
                        value={Math.round(loanPerformance.reduce((acc, item) => acc + item.repayments, 0) / loanPerformance.length)}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Default Rate</p>
                          <p className="text-2xl font-bold text-red-600">
                            {Math.round(loanPerformance.reduce((acc, item) => acc + item.defaults, 0) / loanPerformance.length)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                      <Progress 
                        className="mt-3 bg-red-100" 
                        value={Math.round(loanPerformance.reduce((acc, item) => acc + item.defaults, 0) / loanPerformance.length)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
