
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Shield, Clock, BadgeCheck, AlertCircle } from 'lucide-react';

const KYCManagement: React.FC = () => {
  // Mock data for demonstration
  const pendingRequests = [
    { id: 1, user: "Michael Johnson", email: "michael@example.com", documentCount: 3, submittedDate: "2023-07-20" },
    { id: 2, user: "Emily Davis", email: "emily@example.com", documentCount: 2, submittedDate: "2023-07-21" },
    { id: 3, user: "Robert Wilson", email: "robert@example.com", documentCount: 4, submittedDate: "2023-07-21" },
    { id: 4, user: "Jennifer Martinez", email: "jennifer@example.com", documentCount: 3, submittedDate: "2023-07-22" },
  ];

  const verifiedRequests = [
    { id: 1, user: "Catherine Williams", email: "catherine@example.com", verifiedDate: "2023-07-15", verifiedBy: "Admin" },
    { id: 2, user: "Thomas Brown", email: "thomas@example.com", verifiedDate: "2023-07-16", verifiedBy: "Metro Bank" },
    { id: 3, user: "Sarah Miller", email: "sarah@example.com", verifiedDate: "2023-07-18", verifiedBy: "Admin" },
  ];

  const modificationRequests = [
    { id: 1, user: "David Garcia", email: "david@example.com", document: "ID Card", reason: "Expired", requestDate: "2023-07-19" },
    { id: 2, user: "Jessica Rodriguez", email: "jessica@example.com", document: "Proof of Address", reason: "Address changed", requestDate: "2023-07-20" },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">KYC Management</h1>
        <p className="text-muted-foreground">Manage and review KYC verification requests</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Waiting for review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedRequests.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully verified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modification Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modificationRequests.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Document changes requested
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="verified">Verified Users</TabsTrigger>
            <TabsTrigger value="modifications">Modification Requests</TabsTrigger>
          </TabsList>
          
          {/* Pending Requests Tab */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending KYC Requests</CardTitle>
                <CardDescription>
                  Review and process pending verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.documentCount} documents</TableCell>
                        <TableCell>{request.submittedDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="h-8 w-8 p-0">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Verified Users Tab */}
          <TabsContent value="verified" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verified Users</CardTitle>
                <CardDescription>
                  Users who have completed KYC verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Verified Date</TableHead>
                      <TableHead>Verified By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.verifiedDate}</TableCell>
                        <TableCell>{request.verifiedBy}</TableCell>
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
          
          {/* Modification Requests Tab */}
          <TabsContent value="modifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Modification Requests</CardTitle>
                <CardDescription>
                  Review and process document change requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modificationRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.document}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Reject</Button>
                            <Button size="sm">Approve</Button>
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

export default KYCManagement;
