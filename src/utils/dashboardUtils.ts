
import React from 'react';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Users, 
  Building, 
  CreditCard, 
  PieChart, 
  Shield 
} from 'lucide-react';
import { SidebarLink } from '../components/dashboard/SidebarLinks';

// Create icon elements without using JSX
const createIcon = (Icon: React.FC<any>) => {
  return React.createElement(Icon, { size: 18 });
};

export const getSidebarLinks = (userRole: string): SidebarLink[] => {
  switch (userRole) {
    case 'admin':
      return [
        { label: 'Dashboard', href: '/admin', icon: createIcon(Home) },
        { label: 'KYC Management', href: '/admin/kyc', icon: createIcon(Shield) },
        { label: 'Users', href: '/admin/users', icon: createIcon(Users) },
        { label: 'Banks', href: '/admin/banks', icon: createIcon(Building) },
        { label: 'Trust Scores', href: '/admin/scores', icon: createIcon(BarChart3) },
        { label: 'Transactions', href: '/admin/transactions', icon: createIcon(CreditCard) },
        { label: 'Analytics', href: '/admin/analytics', icon: createIcon(PieChart) },
      ];
    case 'bank':
      return [
        { label: 'Dashboard', href: '/bank', icon: createIcon(Home) },
        { label: 'User Verification', href: '/bank/verification', icon: createIcon(Shield) },
        { label: 'Loan Management', href: '/bank/loans', icon: createIcon(FileText) },
        { label: 'Performance', href: '/bank/performance', icon: createIcon(BarChart3) },
      ];
    case 'user':
      return [
        { label: 'Dashboard', href: '/user', icon: createIcon(Home) },
        { label: 'KYC Status', href: '/user/kyc', icon: createIcon(Shield) },
        { label: 'Documents', href: '/user/documents', icon: createIcon(FileText) },
        { label: 'Loan Center', href: '/user/loans', icon: createIcon(CreditCard) },
      ];
    default:
      return [];
  }
};
