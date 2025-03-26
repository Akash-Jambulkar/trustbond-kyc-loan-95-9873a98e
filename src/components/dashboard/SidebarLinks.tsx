
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { UserRole } from '@/contexts/blockchain/BlockchainTypes';
import CommonDashboardLinks from './CommonDashboardLinks';
import UserSidebarLinks from './UserSidebarLinks';
import BankSidebarLinks from './BankSidebarLinks';
import AdminSidebarLinks from './AdminSidebarLinks';
import ResourceLinks from './ResourceLinks';

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
      {/* Common Dashboard Links */}
      <CommonDashboardLinks 
        userRole={userRole} 
        isActive={isActive} 
        handleLinkClick={handleLinkClick} 
      />
      
      <Separator className="my-2" />
      
      {/* User specific links */}
      {userRole === 'user' && (
        <UserSidebarLinks 
          isActive={isActive} 
          handleLinkClick={handleLinkClick} 
        />
      )}
      
      {/* Bank specific links */}
      {userRole === 'bank' && (
        <BankSidebarLinks 
          isActive={isActive} 
          handleLinkClick={handleLinkClick} 
        />
      )}
      
      {/* Admin specific links */}
      {userRole === 'admin' && (
        <AdminSidebarLinks 
          isActive={isActive} 
          handleLinkClick={handleLinkClick} 
        />
      )}
      
      {/* Documentation and Resources - visible to all */}
      <Separator className="my-2" />
      <ResourceLinks 
        isActive={isActive} 
        handleLinkClick={handleLinkClick} 
      />
    </div>
  );
};

export default SidebarLinks;
