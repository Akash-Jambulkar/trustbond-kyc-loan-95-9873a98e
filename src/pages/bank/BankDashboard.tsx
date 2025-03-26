
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Check, X, Percent, DollarSign, Users, Clock, CheckCircle } from 'lucide-react';

const BankDashboard: React.FC = () => {
  // Dummy stats for demonstration
  const stats = [
    { name: 'Total Loans', value: '586', icon: <FileCheck className="h-5 w-5 text-blue-500" /> },
    { name: 'Approved Today', value: '12', icon: <Check className="h-5 w-5 text-green-500" /> },
    { name: 'Rejected Today', value: '3', icon: <X className="h-5 w-5 text-red-500" /> },
    { name: 'Approval Rate', value: '78%', icon: <Percent className="h-5 w-5 text-amber-500" /> },
  ];

  // Dummy loan applications for demonstration
  const loanApplications = [
    { id: 1, user: 'Michael Johnson', amount: '$12,000', purpose: 'Home Renovation', score: 89, status: 'pending' },
    { id: 2, user: 'Emily Davis', amount: '$5,500', purpose: 'Education', score: 92, status: 'pending' },
    { id: 3, user: 'Robert Wilson', amount: '$8,200', purpose: 'Debt Consolidation', score: 75, status: 'pending' },
    { id: 4, user: 'Jennifer Martinez', amount: '$3,000', purpose: 'Medical Expenses', score: 81, status: 'pending' },
  ];

  // Dummy verified users for demonstration
  const recentlyVerifiedUsers = [
    { id: 1, name: 'Catherine Williams', time: '2 hours ago', score: 94 },
    { id: 2, name: 'Thomas Brown', time: '4 hours ago', score: 88 },
    { id: 3, name: 'Sarah Miller', time: '1 day ago', score: 91 },
    { id: 4, name: 'David Garcia', time: '1 day ago', score: 79 },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Bank Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage loan applications and user verifications.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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
          {/* Loan Applications */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Pending Loan Applications</CardTitle>
              <CardDescription>Applications waiting for your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanApplications.map((loan) => (
                  <div key={loan.id} className="flex items-start p-4 bg-secondary/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{loan.user}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          loan.score >= 90 ? 'bg-green-100 text-green-800' :
                          loan.score >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          Score: {loan.score}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                          <p className="text-base font-semibold mt-1">{loan.amount}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Verified Users */}
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recently Verified Users</CardTitle>
              <CardDescription>Users who completed KYC verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyVerifiedUsers.map((user) => (
                  <div key={user.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{user.name}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.score >= 90 ? 'bg-green-100 text-green-800' :
                          user.score >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          Score: {user.score}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Verified {user.time}</p>
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

export default BankDashboard;
