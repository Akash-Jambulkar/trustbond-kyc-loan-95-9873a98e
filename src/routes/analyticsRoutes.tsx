
import React from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardAnalytics from '../pages/DashboardAnalytics';

// Define analytics routes
export const analyticsRoutes: RouteObject[] = [
  {
    path: '/analytics',
    element: <DashboardAnalytics />
  }
];

export default analyticsRoutes;
