
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Documentation from '../pages/resources/Documentation';
import Community from '../pages/resources/Community';
import Whitepaper from '../pages/resources/Whitepaper';
import ApiReference from '../pages/resources/ApiReference';
import ApiDirectory from '../pages/resources/ApiDirectory';

// Define resources routes
export const resourcesRoutes: RouteObject[] = [
  {
    path: '/resources/documentation',
    element: <Documentation />
  },
  {
    path: '/resources/community',
    element: <Community />
  },
  {
    path: '/resources/whitepaper',
    element: <Whitepaper />
  },
  {
    path: '/resources/api',
    element: <ApiReference />
  },
  {
    path: '/resources/api-directory',
    element: <ApiDirectory />
  }
];

export default resourcesRoutes;
