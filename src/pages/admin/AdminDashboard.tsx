
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FileCheck, UserCheck, Building, ShieldCheck, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Dummy stats for demonstration
  const stats = [
    { name: 'Total Users', value: '2,458', icon: <UserCheck className="h-5 w-5 text-blue-500" /> },
    { name: 'Verified Users', value: '1,892', icon: <ShieldCheck className="h-5 w-5 text-green-500" /> },
    { name: 'Pending Verifications', value: '142', icon: <Clock className="h-5 w-5 text-orange-500" /> },
    { name: 'Registered Banks', value: '26', icon: <Building className="h-5 w-5 text-purple-500" /> },
    { name: 'Active Loans', value: '1,219', icon: <FileCheck className="h-5 w-5 text-pink-500" /> },
    { name: 'Total Transactions', value: '18,420', icon: <Activity className="h-5 w-5 text-indigo-500" /> },
  ];

  // Dummy recent activity for demonstration
  const recentActivity = [
    { id: 1, action: 'KYC Approved', user: 'John Smith', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'New Bank Registration', user: 'Metro Bank', time: '10 minutes ago', status: 'info' },
    { id: 3, action: 'Trust Score Updated', user: 'Sara Johnson', time: '32 minutes ago', status: 'warning' },
    { id: 4, action: 'Document Modification Request', user: 'Mike Peterson', time: '1 hour ago', status: 'info' },
    { id: 5, action: 'New User Registration', user: 'Rachel Adams', time: '2 hours ago', status: 'success' },
  ];

  // Dummy requests for demonstration
  const pendingRequests = [
    { id: 1, type: 'KYC Verification', user: 'Emily Watson', submitted: '2023-07-22' },
    { id: 2, type: 'Document Update', user: 'Daniel Lewis', submitted: '2023-07-22' },
    { id: 3, type: 'Bank Registration', user: 'First Federal Bank', submitted: '2023-07-21' },
    { id: 4, type: 'Trust Score Appeal', user: 'Jennifer Garcia', submitted: '2023-07-21' },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage system activities.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
          {/* Pending Approvals */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
              <CardDescription>Requests that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-start p-3 bg-secondary/50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{request.type}</p>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {request.submitted}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{request.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : activity.status === 'warning' ? (
                        <Clock className="h-5 w-5 text-orange-500" />
                      ) : (
                        <Activity className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
