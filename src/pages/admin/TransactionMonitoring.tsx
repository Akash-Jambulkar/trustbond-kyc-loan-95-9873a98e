
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, FileText, Search, ArrowUpRight, CheckCircle, XCircle, Clock } from 'lucide-react';

const TransactionMonitoring: React.FC = () => {
  // Mock data for demonstration
  const recentTransactions = [
    { id: "0x1a2b3c", type: "KYC Verification", user: "John Smith", timestamp: "2023-07-22 14:30", status: "success" },
    { id: "0x4d5e6f", type: "Document Update", user: "Emma Wilson", timestamp: "2023-07-22 12:15", status: "success" },
    { id: "0x7g8h9i", type: "Loan Application", user: "Michael Brown", timestamp: "2023-07-22 10:45", status: "pending" },
    { id: "0xj0k1l", type: "Loan Approval", user: "Citizens Trust", timestamp: "2023-07-21 16:20", status: "success" },
    { id: "0xm2n3o", type: "Trust Score Update", user: "Sophia Davis", timestamp: "2023-07-21 14:05", status: "success" },
  ];

  const kycTransactions = [
    { id: "0x1a2b3c", user: "John Smith", action: "Document Upload", document: "ID Card", timestamp: "2023-07-22 14:30", status: "verified" },
    { id: "0x4d5e6f", user: "Emma Wilson", action: "KYC Submission", document: "All Documents", timestamp: "2023-07-22 12:15", status: "verified" },
    { id: "0x7g8h9i", user: "Michael Brown", action: "Document Upload", document: "Proof of Address", timestamp: "2023-07-21 10:45", status: "pending" },
    { id: "0xp4q5r", user: "William Johnson", action: "Document Modification", document: "Bank Statement", timestamp: "2023-07-20 11:30", status: "pending" },
  ];

  const loanTransactions = [
    { id: "0xj0k1l", user: "Sophia Davis", bank: "First Federal Bank", amount: "$5,000", timestamp: "2023-07-21 16:20", status: "approved" },
    { id: "0xs6t7u", user: "Robert Wilson", bank: "Metro Bank", amount: "$10,000", timestamp: "2023-07-20 09:45", status: "rejected" },
    { id: "0xv8w9x", user: "Jennifer Martinez", bank: "Citizens Trust", amount: "$3,500", timestamp: "2023-07-19 14:15", status: "approved" },
    { id: "0xy1z2a", user: "David Garcia", bank: "First Federal Bank", amount: "$7,500", timestamp: "2023-07-18 11:05", status: "pending" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'verified':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success':
      case 'verified':
      case 'approved':
        return "bg-green-100 text-green-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Transaction Monitoring</h1>
        <p className="text-muted-foreground">Monitor blockchain transactions and activities</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,420</div>
              <p className="text-xs text-muted-foreground mt-2">
                Since platform launch
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Transactions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,582</div>
              <p className="text-xs text-muted-foreground mt-2">
                Document verifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loan Transactions</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,219</div>
              <p className="text-xs text-muted-foreground mt-2">
                Loan applications & approvals
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search transaction hash or user..." 
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button>Search</Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="kyc">KYC Transactions</TabsTrigger>
            <TabsTrigger value="loans">Loan Transactions</TabsTrigger>
          </TabsList>
          
          {/* All Transactions Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Most recent activities on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>User/Entity</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>{tx.user}</TableCell>
                        <TableCell className="text-sm">{tx.timestamp}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(tx.status)}
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(tx.status)}`}>
                              {tx.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            View on Explorer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* KYC Transactions Tab */}
          <TabsContent value="kyc" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>KYC Transactions</CardTitle>
                <CardDescription>
                  Document uploads and verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kycTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                        <TableCell>{tx.user}</TableCell>
                        <TableCell>{tx.action}</TableCell>
                        <TableCell>{tx.document}</TableCell>
                        <TableCell className="text-sm">{tx.timestamp}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(tx.status)}
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(tx.status)}`}>
                              {tx.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Loan Transactions Tab */}
          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Transactions</CardTitle>
                <CardDescription>
                  Loan applications and approvals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                        <TableCell>{tx.user}</TableCell>
                        <TableCell>{tx.bank}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell className="text-sm">{tx.timestamp}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(tx.status)}
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(tx.status)}`}>
                              {tx.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TransactionMonitoring;
