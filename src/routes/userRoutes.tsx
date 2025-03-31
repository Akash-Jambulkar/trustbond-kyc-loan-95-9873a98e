
import React from 'react';
import { RouteObject } from 'react-router-dom';
import UserDashboard from '../pages/user/UserDashboard';
import Documents from '../pages/user/Documents';
import Loans from '../pages/user/Loans';
import KYCStatus from '../pages/user/KYCStatus';

// Define user routes
export const userRoutes: RouteObject[] = [
  {
    path: '/user/dashboard',
    element: <UserDashboard />
  },
  {
    path: '/user/documents',
    element: <Documents />
  },
  {
    path: '/user/loans',
    element: <Loans />
  },
  {
    path: '/user/kyc-status',
    element: <KYCStatus />
  }
];

export default userRoutes;
