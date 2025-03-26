
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, Shield, AlertCircle, BarChart3 } from 'lucide-react';

const UserManagement: React.FC = () => {
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "user", status: "verified", trustScore: 87, registrationDate: "2023-06-15" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", role: "user", status: "verified", trustScore: 92, registrationDate: "2023-06-20" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "user", status: "pending", trustScore: 0, registrationDate: "2023-07-10" },
    { id: 4, name: "Sophia Davis", email: "sophia@example.com", role: "user", status: "rejected", trustScore: 35, registrationDate: "2023-07-05" },
    { id: 5, name: "William Johnson", email: "william@example.com", role: "user", status: "verified", trustScore: 78, registrationDate: "2023-06-25" },
  ];

  const blockedUsers = [
    { id: 1, name: "James Wilson", email: "james@example.com", reason: "Suspicious activity", blockedDate: "2023-07-15" },
    { id: 2, name: "Olivia Taylor", email: "olivia@example.com", reason: "Fake documents", blockedDate: "2023-07-10" },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Registered in platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(user => user.status === "verified").length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Completed KYC process
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Trust Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(users.filter(user => user.status === "verified").reduce((acc, user) => acc + user.trustScore, 0) / 
                users.filter(user => user.status === "verified").length)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Among verified users
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-users" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="blocked-users">Blocked Users</TabsTrigger>
          </TabsList>
          
          {/* All Users Tab */}
          <TabsContent value="all-users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>
                  Manage all registered users and their verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.status === "verified" 
                              ? "bg-green-100 text-green-800" 
                              : user.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.status === "verified" ? (
                            <span className={`font-medium ${
                              user.trustScore >= 80 ? "text-green-600" : 
                              user.trustScore >= 60 ? "text-amber-600" : 
                              "text-red-600"
                            }`}>
                              {user.trustScore}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>{user.registrationDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="outline" size="sm">Block</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Blocked Users Tab */}
          <TabsContent value="blocked-users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Users</CardTitle>
                <CardDescription>
                  Users who have been blocked from accessing the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Blocked Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.reason}</TableCell>
                        <TableCell>{user.blockedDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Unblock</Button>
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

export default UserManagement;
