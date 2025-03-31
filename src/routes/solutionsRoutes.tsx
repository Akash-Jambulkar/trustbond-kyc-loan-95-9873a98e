
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Individuals from '../pages/solutions/Individuals';
import Banks from '../pages/solutions/Banks';
import Enterprise from '../pages/solutions/Enterprise';
import Regulators from '../pages/solutions/Regulators';

// Define solutions routes
export const solutionsRoutes: RouteObject[] = [
  {
    path: '/solutions/individuals',
    element: <Individuals />
  },
  {
    path: '/solutions/banks',
    element: <Banks />
  },
  {
    path: '/solutions/enterprise',
    element: <Enterprise />
  },
  {
    path: '/solutions/regulators',
    element: <Regulators />
  }
];

export default solutionsRoutes;
