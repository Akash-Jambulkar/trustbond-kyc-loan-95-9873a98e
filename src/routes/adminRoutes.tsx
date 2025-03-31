
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import BankManagement from '../pages/admin/BankManagement';
import KYCManagement from '../pages/admin/KYCManagement';
import TransactionMonitoring from '../pages/admin/TransactionMonitoring';

// Define admin routes
export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/admin/user-management',
    element: <UserManagement />
  },
  {
    path: '/admin/bank-management',
    element: <BankManagement />
  },
  {
    path: '/admin/kyc-management',
    element: <KYCManagement />
  },
  {
    path: '/admin/transaction-monitoring',
    element: <TransactionMonitoring />
  }
];

export default adminRoutes;
