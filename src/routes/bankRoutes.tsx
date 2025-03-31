
import React from 'react';
import { RouteObject } from 'react-router-dom';
import BankDashboard from '../pages/bank/BankDashboard';
import LoanManagement from '../pages/bank/LoanManagement';
import UserVerification from '../pages/bank/UserVerification';
import Performance from '../pages/bank/Performance';

// Define bank routes
export const bankRoutes: RouteObject[] = [
  {
    path: '/bank/dashboard',
    element: <BankDashboard />
  },
  {
    path: '/bank/loan-management',
    element: <LoanManagement />
  },
  {
    path: '/bank/user-verification',
    element: <UserVerification />
  },
  {
    path: '/bank/performance',
    element: <Performance />
  }
];

export default bankRoutes;
