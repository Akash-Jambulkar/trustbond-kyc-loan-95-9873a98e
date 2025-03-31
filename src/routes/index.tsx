
import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import AboutUs from '../pages/company/AboutUs';
import Contact from '../pages/company/Contact';
import Privacy from '../pages/company/Privacy';
import Individuals from '../pages/solutions/Individuals';
import Banks from '../pages/solutions/Banks';
import Enterprise from '../pages/solutions/Enterprise';
import Regulators from '../pages/solutions/Regulators';
import Documentation from '../pages/resources/Documentation';
import Community from '../pages/resources/Community';
import Whitepaper from '../pages/resources/Whitepaper';
import ApiReference from '../pages/resources/ApiReference';
import ApiDirectory from '../pages/resources/ApiDirectory';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDashboard from '../pages/user/UserDashboard';
import Documents from '../pages/user/Documents';
import Loans from '../pages/user/Loans';
import KYCStatus from '../pages/user/KYCStatus';
import BankDashboard from '../pages/bank/BankDashboard';
import LoanManagement from '../pages/bank/LoanManagement';
import UserVerification from '../pages/bank/UserVerification';
import Performance from '../pages/bank/Performance';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import BankManagement from '../pages/admin/BankManagement';
import KYCManagement from '../pages/admin/KYCManagement';
import TransactionMonitoring from '../pages/admin/TransactionMonitoring';
import DashboardAnalytics from '../pages/DashboardAnalytics';

// Define route groups for better organization
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

export const analyticsRoutes: RouteObject[] = [
  {
    path: '/analytics',
    element: <DashboardAnalytics />
  }
];

// Combine all routes
const routes: RouteObject[] = [
  ...publicRoutes,
  ...companyRoutes,
  ...solutionsRoutes,
  ...resourcesRoutes,
  ...authRoutes,
  ...userRoutes,
  ...bankRoutes,
  ...adminRoutes,
  ...analyticsRoutes
];

export default routes;
