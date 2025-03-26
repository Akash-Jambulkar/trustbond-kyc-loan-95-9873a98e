
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Building2, FileCog, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AdminSidebarLinks: React.FC<{ 
  handleLinkClick?: () => void;
  isActive: (path: string) => boolean;
}> = ({ handleLinkClick, isActive }) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Administration</h2>
      <div className="space-y-1">
        <Button
          variant={isActive('/admin/user-management') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
        >
          <Link to="/admin/transaction-monitoring">
            <Activity className="mr-2 h-4 w-4" />
            Transaction Monitoring
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebarLinks;
