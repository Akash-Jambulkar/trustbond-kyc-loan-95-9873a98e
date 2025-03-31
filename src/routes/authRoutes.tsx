
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Define auth routes
export const authRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  }
];

export default authRoutes;
