
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, CheckCircle, Clock, FileCheck } from 'lucide-react';

const BankManagement: React.FC = () => {
  // Mock data for demonstration
  const approvedBanks = [
    { id: 1, name: "First Federal Bank", email: "contact@firstfederal.com", verificationDate: "2023-06-10", loansIssued: 156, totalVolume: "$1,245,000" },
    { id: 2, name: "Metro Bank", email: "info@metrobank.com", verificationDate: "2023-06-15", loansIssued: 89, totalVolume: "$890,000" },
    { id: 3, name: "Citizens Trust", email: "support@citizenstrust.com", verificationDate: "2023-07-01", loansIssued: 42, totalVolume: "$420,000" },
  ];

  const pendingBanks = [
    { id: 1, name: "Alpha Financial", email: "contact@alphafinancial.com", applicationDate: "2023-07-15" },
    { id: 2, name: "Omega Credit Union", email: "info@omegacu.com", applicationDate: "2023-07-18" },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Bank Management</h1>
        <p className="text-muted-foreground">Manage financial institutions connected to the platform</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Banks</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedBanks.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Active on platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBanks.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loans Issued</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedBanks.reduce((acc, bank) => acc + bank.loansIssued, 0)}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Across all banks
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approved" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="approved">Approved Banks</TabsTrigger>
            <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          </TabsList>
          
          {/* Approved Banks Tab */}
          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Financial Institutions</CardTitle>
                <CardDescription>
                  Banks and lenders that are approved to operate on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution Name</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead>Verified Since</TableHead>
                      <TableHead>Loans Issued</TableHead>
                      <TableHead>Total Volume</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedBanks.map((bank) => (
                      <TableRow key={bank.id}>
                        <TableCell className="font-medium">{bank.name}</TableCell>
                        <TableCell>{bank.email}</TableCell>
                        <TableCell>{bank.verificationDate}</TableCell>
                        <TableCell>{bank.loansIssued}</TableCell>
                        <TableCell>{bank.totalVolume}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Suspend</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pending Applications Tab */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Bank Applications</CardTitle>
                <CardDescription>
                  Financial institutions waiting for approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution Name</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingBanks.map((bank) => (
                      <TableRow key={bank.id}>
                        <TableCell className="font-medium">{bank.name}</TableCell>
                        <TableCell>{bank.email}</TableCell>
                        <TableCell>{bank.applicationDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Reject</Button>
                            <Button size="sm">Approve</Button>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </div>
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

export default BankManagement;
