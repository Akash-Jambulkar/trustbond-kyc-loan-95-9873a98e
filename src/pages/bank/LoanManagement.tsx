
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileCheck, DollarSign, Check, X, AlertTriangle, BadgeCheck } from 'lucide-react';

const LoanManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for demonstration
  const pendingApplications = [
    { id: 1, user: "Michael Johnson", amount: "$12,000", purpose: "Home Renovation", score: 89, applicationDate: "2023-07-20", status: "pending" },
    { id: 2, user: "Emily Davis", amount: "$5,500", purpose: "Education", score: 92, applicationDate: "2023-07-21", status: "pending" },
    { id: 3, user: "Robert Wilson", amount: "$8,200", purpose: "Debt Consolidation", score: 75, applicationDate: "2023-07-21", status: "pending" },
    { id: 4, user: "Jennifer Martinez", amount: "$3,000", purpose: "Medical Expenses", score: 81, applicationDate: "2023-07-22", status: "pending" },
  ];

  const approvedLoans = [
    { id: 1, user: "Catherine Williams", amount: "$10,000", purpose: "Business Expansion", score: 94, approvalDate: "2023-07-15", status: "approved", interestRate: "5.2%" },
    { id: 2, user: "Thomas Brown", amount: "$7,500", purpose: "Home Renovation", score: 88, approvalDate: "2023-07-16", status: "approved", interestRate: "5.5%" },
    { id: 3, user: "Sarah Miller", amount: "$4,500", purpose: "Education", score: 91, approvalDate: "2023-07-18", status: "approved", interestRate: "5.3%" },
  ];

  const rejectedApplications = [
    { id: 1, user: "David Garcia", amount: "$15,000", purpose: "Debt Consolidation", score: 65, rejectionDate: "2023-07-19", status: "rejected", reason: "Low trust score" },
    { id: 2, user: "Olivia Taylor", amount: "$25,000", purpose: "Business Loan", score: 59, rejectionDate: "2023-07-17", status: "rejected", reason: "Insufficient documentation" },
  ];

  const getTrustScoreClass = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Loan Management</h1>
        <p className="text-muted-foreground">Process loan applications and manage approved loans</p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Loans</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedLoans.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully funded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected Applications</CardTitle>
              <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedApplications.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Not approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${approvedLoans.reduce((acc, loan) => {
                  const amount = parseInt(loan.amount.replace(/[^0-9]/g, ''));
                  return acc + amount;
                }, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Total loan value
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search loan applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="pending">Pending Applications</TabsTrigger>
            <TabsTrigger value="approved">Approved Loans</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
          </TabsList>
          
          {/* Pending Applications Tab */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Loan Applications</CardTitle>
                <CardDescription>
                  Review and process loan applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApplications.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.user}</TableCell>
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>
                          <Badge className={getTrustScoreClass(loan.score)}>
                            {loan.score}
                          </Badge>
                        </TableCell>
                        <TableCell>{loan.applicationDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="h-8 w-8 p-0">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">Details</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Approved Loans Tab */}
          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Loans</CardTitle>
                <CardDescription>
                  Loans that have been approved and funded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Approval Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.user}</TableCell>
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>
                          <Badge className={getTrustScoreClass(loan.score)}>
                            {loan.score}
                          </Badge>
                        </TableCell>
                        <TableCell>{loan.interestRate}</TableCell>
                        <TableCell>{loan.approvalDate}</TableCell>
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
          
          {/* Rejected Applications Tab */}
          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Applications</CardTitle>
                <CardDescription>
                  Loan applications that were not approved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Rejection Reason</TableHead>
                      <TableHead>Rejection Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedApplications.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.user}</TableCell>
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>
                          <Badge className={getTrustScoreClass(loan.score)}>
                            {loan.score}
                          </Badge>
                        </TableCell>
                        <TableCell>{loan.reason}</TableCell>
                        <TableCell>{loan.rejectionDate}</TableCell>
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

export default LoanManagement;
