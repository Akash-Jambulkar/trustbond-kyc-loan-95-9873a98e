
import React, { ReactNode } from 'react';
import MainNavigation from './MainNavigation';
import MainFooter from './MainFooter';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  description, 
  className = ""
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <div className="bg-green-50 py-12 px-4 border-b border-green-100">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          {description && <p className="text-muted-foreground mt-2 max-w-3xl">{description}</p>}
        </div>
      </div>
      
      <main className={`flex-grow py-12 px-4 ${className}`}>
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default PageLayout;
