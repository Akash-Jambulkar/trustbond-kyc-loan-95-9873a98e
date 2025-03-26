
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Building2, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserRole } from '@/contexts/blockchain/BlockchainTypes';

interface CommonDashboardLinksProps {
  userRole: UserRole | null;
  isActive: (path: string) => boolean;
  handleLinkClick?: () => void;
}

const CommonDashboardLinks: React.FC<CommonDashboardLinksProps> = ({ 
  userRole, 
  isActive, 
  handleLinkClick 
}) => {
  return (
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
  );
};

export default CommonDashboardLinks;
