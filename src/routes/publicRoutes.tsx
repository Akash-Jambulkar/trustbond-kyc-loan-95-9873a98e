
import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';

// Define public routes
export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/index',
    element: <Index />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default publicRoutes;
