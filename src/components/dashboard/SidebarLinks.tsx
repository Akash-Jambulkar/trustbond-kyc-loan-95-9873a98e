
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarLinksProps {
  links: SidebarLink[];
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ 
  links, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const location = useLocation();
  
  const isLinkActive = (href: string) => {
    if (href === '/admin' || href === '/bank' || href === '/user') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="mt-5 flex-1 px-4 space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            isLinkActive(link.href)
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/70 hover:bg-primary/10 hover:text-foreground'
          }`}
          onClick={() => sidebarOpen && setSidebarOpen && setSidebarOpen(false)}
        >
          <span className="mr-3">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarLinks;
