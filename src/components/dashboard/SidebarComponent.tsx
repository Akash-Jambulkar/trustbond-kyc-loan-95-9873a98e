
import React from 'react';
import { X } from 'lucide-react';
import Logo from '../Logo';
import SidebarLinks from './SidebarLinks';
import UserProfileSection, { UserProfile } from './UserProfileSection';
import { UserRole } from '@/contexts/blockchain/BlockchainTypes';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarComponentProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarLinks: SidebarLink[];
  user: UserProfile;
  isMobile?: boolean;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarLinks,
  user,
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 flex z-40 md:hidden transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="h-16 flex items-center px-6 border-b border-border">
            <Logo dark />
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <SidebarLinks 
              userRole={user.role as UserRole}
              links={sidebarLinks} 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
            />
          </div>
          
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex-shrink-0 w-full group block">
              <UserProfileSection user={user} />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-border bg-card">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Logo dark />
        </div>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <SidebarLinks 
            userRole={user.role as UserRole}
            links={sidebarLinks} 
          />
        </div>
        <div className="flex-shrink-0 flex border-t border-border p-4">
          <div className="flex-shrink-0 w-full group block">
            <UserProfileSection user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
