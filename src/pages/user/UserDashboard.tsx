
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Shield, FileText, BadgeCheck, Wallet, FileLock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '../../components/DashboardLayout';

const UserDashboard: React.FC = () => {
  // Mock data for demonstration
  const kycStatus = "pending";
  const verificationLevel = 2;
  const maxVerificationLevel = 3;
  const userDocuments = [
    { id: 1, name: "ID Card", status: "verified", lastUpdated: "2023-05-15" },
    { id: 2, name: "Proof of Address", status: "pending", lastUpdated: "2023-05-20" },
    { id: 3, name: "Bank Statement", status: "rejected", lastUpdated: "2023-05-10" },
  ];
  const loanApplications = [
    { id: 1, amount: "$5,000", purpose: "Home Renovation", status: "approved", date: "2023-04-10" },
    { id: 2, amount: "$10,000", purpose: "Education", status: "pending", date: "2023-05-05" },
    { id: 3, amount: "$2,000", purpose: "Medical Expenses", status: "rejected", date: "2023-03-20" },
  ];
  const transactionHistory = [
    { id: 1, type: "Document Upload", status: "success", timestamp: "2023-05-15 10:30 AM" },
    { id: 2, type: "KYC Verification", status: "pending", timestamp: "2023-05-15 11:45 AM" },
    { id: 3, type: "Loan Application", status: "success", timestamp: "2023-05-05 03:15 PM" },
  ];
  const trustScore = 75;

  // Fixed comparison strings
  const getKycStatusIcon = (status: string) => {
    if (status === "verified") {
      return <BadgeCheck className="h-5 w-5 text-green-500" />;
    } else if (status === "rejected") {
      return <Lock className="h-5 w-5 text-red-500" />;
    } else {
      return <Lock className="h-5 w-5 text-amber-500" />;
    }
  };

  // Fixed scoring classes based on score
  const getTrustScoreClass = (score: number) => {
    return score > 70 ? "bg-green-500" : score > 40 ? "bg-amber-500" : "bg-red-500";
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-muted-foreground">Manage your KYC status, documents, and loan applications</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KYC Status Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getKycStatusIcon(kycStatus)}
                <span className="text-2xl font-bold capitalize">{kycStatus}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Verification Level: {verificationLevel} of {maxVerificationLevel}
              </p>
              <Progress className="mt-3" value={(verificationLevel / maxVerificationLevel) * 100} />
            </CardContent>
          </Card>

          {/* Trust Score Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
              <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trustScore}/100</div>
              <p className="text-xs text-muted-foreground mt-2">
                Your trust score affects loan eligibility and terms
              </p>
              <Progress 
                className={`mt-3 ${getTrustScoreClass(trustScore)}`}
                value={trustScore} 
              />
            </CardContent>
          </Card>

          {/* Active Loans Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loanApplications.filter(loan => loan.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {loanApplications.filter(loan => loan.status === "pending").length} pending applications
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">View Loans</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="loans">Loan Applications</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>
                  Manage your uploaded documents and verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            doc.status === "verified" 
                              ? "bg-green-100 text-green-800" 
                              : doc.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {doc.status}
                          </span>
                        </TableCell>
                        <TableCell>{doc.lastUpdated}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                          {doc.status === "rejected" && (
                            <Button variant="outline" size="sm" className="ml-2">Resubmit</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button className="w-full sm:w-auto">Upload New Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Applications</CardTitle>
                <CardDescription>
                  View and manage your loan applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanApplications.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.amount}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            loan.status === "approved" 
                              ? "bg-green-100 text-green-800" 
                              : loan.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {loan.status}
                          </span>
                        </TableCell>
                        <TableCell>{loan.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button className="w-full sm:w-auto">Apply for Loan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View your blockchain transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.type}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            tx.status === "success" 
                              ? "bg-green-100 text-green-800" 
                              : tx.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {tx.status}
                          </span>
                        </TableCell>
                        <TableCell>{tx.timestamp}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View on Explorer</Button>
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

export default UserDashboard;
