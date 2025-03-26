
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCard, UserCheck, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BankSidebarLinks: React.FC<{ 
  handleLinkClick?: () => void;
  isActive: (path: string) => boolean;
}> = ({ handleLinkClick, isActive }) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Financial Institution</h2>
      <div className="space-y-1">
        <Button
          variant={isActive('/bank/loan-management') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
        >
          <Link to="/bank/performance">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BankSidebarLinks;
