
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu } from 'lucide-react';
import PageTransition from './PageTransition';
import { Button } from '@/components/ui/button';
import SidebarComponent from './dashboard/SidebarComponent';
import UserDropdownMenu from './dashboard/UserDropdownMenu';
import { getSidebarLinks } from '../utils/dashboardUtils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const sidebarLinks = getSidebarLinks(user.role);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <SidebarComponent 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarLinks={sidebarLinks}
        user={user}
      />

      {/* Mobile Sidebar */}
      <SidebarComponent 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarLinks={sidebarLinks}
        user={user}
        isMobile={true}
      />

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-background border-b border-border">
          <button
            type="button"
            className="px-4 border-r border-border text-foreground md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <UserDropdownMenu user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <PageTransition>
            <div className="py-6">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
