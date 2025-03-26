
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Home, 
  Users,
  Building2, 
  Shield, 
  FileText, 
  CreditCard, 
  BarChart3, 
  UserCheck,
  FileCog,
  Activity,
  BookOpen,
  Webhook,
  FileQuestion,
  MessageSquare,
  Code,
  Database
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { UserRole } from '@/contexts/blockchain/BlockchainTypes';

// Export the SidebarLink interface so it can be imported in other files
export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarLinksProps {
  userRole: UserRole | null;
  links?: SidebarLink[]; // Add links prop support for backward compatibility
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ 
  userRole, 
  links, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path ? true : false;
  };

  // Handle mobile navigation closure when clicking on a link
  const handleLinkClick = () => {
    if (sidebarOpen && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="space-y-1 py-2">
      {/* Common Links for all users */}
      <div className="px-3 py-2">
        <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Dashboard</h2>
        <div className="space-y-1">
          <Button
            variant={isActive('/') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
            onClick={handleLinkClick}
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          
          {/* User Role Specific Dashboard */}
          {userRole === 'user' && (
            <Button
              variant={isActive('/user/dashboard') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
              onClick={handleLinkClick}
            >
              <Link to="/user/dashboard">
                <User className="mr-2 h-4 w-4" />
                User Dashboard
              </Link>
            </Button>
          )}
          
          {userRole === 'bank' && (
            <Button
              variant={isActive('/bank/dashboard') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
              onClick={handleLinkClick}
            >
              <Link to="/bank/dashboard">
                <Building2 className="mr-2 h-4 w-4" />
                Bank Dashboard
              </Link>
            </Button>
          )}
          
          {userRole === 'admin' && (
            <Button
              variant={isActive('/admin/dashboard') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
              onClick={handleLinkClick}
            >
              <Link to="/admin/dashboard">
                <Shield className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {/* User specific links */}
      {userRole === 'user' && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">User</h2>
          <div className="space-y-1">
            <Button
              variant={isActive('/user/kyc-status') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/user/kyc-status">
                <UserCheck className="mr-2 h-4 w-4" />
                KYC Status
              </Link>
            </Button>
            <Button
              variant={isActive('/user/documents') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/user/documents">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Link>
            </Button>
            <Button
              variant={isActive('/user/loans') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/user/loans">
                <CreditCard className="mr-2 h-4 w-4" />
                Loans
              </Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Bank specific links */}
      {userRole === 'bank' && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Financial Institution</h2>
          <div className="space-y-1">
            <Button
              variant={isActive('/bank/loan-management') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/bank/loan-management">
                <CreditCard className="mr-2 h-4 w-4" />
                Loan Management
              </Link>
            </Button>
            <Button
              variant={isActive('/bank/user-verification') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/bank/user-verification">
                <UserCheck className="mr-2 h-4 w-4" />
                User Verification
              </Link>
            </Button>
            <Button
              variant={isActive('/bank/performance') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/bank/performance">
                <BarChart3 className="mr-2 h-4 w-4" />
                Performance
              </Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Admin specific links */}
      {userRole === 'admin' && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Administration</h2>
          <div className="space-y-1">
            <Button
              variant={isActive('/admin/user-management') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/admin/user-management">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Link>
            </Button>
            <Button
              variant={isActive('/admin/bank-management') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/admin/bank-management">
                <Building2 className="mr-2 h-4 w-4" />
                Bank Management
              </Link>
            </Button>
            <Button
              variant={isActive('/admin/kyc-management') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/admin/kyc-management">
                <FileCog className="mr-2 h-4 w-4" />
                KYC Management
              </Link>
            </Button>
            <Button
              variant={isActive('/admin/transaction-monitoring') ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to="/admin/transaction-monitoring">
                <Activity className="mr-2 h-4 w-4" />
                Transaction Monitoring
              </Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Documentation and Resources - visible to all */}
      <Separator className="my-2" />
      <div className="px-3 py-2">
        <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Resources</h2>
        <div className="space-y-1">
          <Button
            variant={isActive('/resources/documentation') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to="/resources/documentation">
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation
            </Link>
          </Button>
          <Button
            variant={isActive('/resources/api') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to="/resources/api">
              <Webhook className="mr-2 h-4 w-4" />
              API Reference
            </Link>
          </Button>
          <Button
            variant={isActive('/resources/api-directory') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to="/resources/api-directory">
              <Code className="mr-2 h-4 w-4" />
              API Directory
            </Link>
          </Button>
          <Button
            variant={isActive('/resources/whitepaper') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to="/resources/whitepaper">
              <FileQuestion className="mr-2 h-4 w-4" />
              Whitepaper
            </Link>
          </Button>
          <Button
            variant={isActive('/resources/community') ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to="/resources/community">
              <MessageSquare className="mr-2 h-4 w-4" />
              Community
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarLinks;
