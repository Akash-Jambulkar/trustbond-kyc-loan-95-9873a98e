
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Shield, FileText, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

const UserSidebarLinks: React.FC<{ 
  handleLinkClick?: () => void;
  isActive: (path: string) => boolean;
}> = ({ handleLinkClick, isActive }) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">User</h2>
      <div className="space-y-1">
        <Button
          variant={isActive('/user/kyc-status') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/user/kyc-status">
            <User className="mr-2 h-4 w-4" />
            KYC Status
          </Link>
        </Button>
        <Button
          variant={isActive('/user/documents') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
        >
          <Link to="/user/loans">
            <CreditCard className="mr-2 h-4 w-4" />
            Loans
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserSidebarLinks;
