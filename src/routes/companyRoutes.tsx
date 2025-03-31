
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AboutUs from '../pages/company/AboutUs';
import Contact from '../pages/company/Contact';
import Privacy from '../pages/company/Privacy';

// Define company routes
export const companyRoutes: RouteObject[] = [
  {
    path: '/company/about',
    element: <AboutUs />
  },
  {
    path: '/company/contact',
    element: <Contact />
  },
  {
    path: '/company/privacy',
    element: <Privacy />
  }
];

export default companyRoutes;
