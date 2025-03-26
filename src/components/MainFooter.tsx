
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const MainFooter: React.FC = () => {
  return (
    <footer className="bg-green-50 py-12 px-4 border-t border-green-100">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <Logo dark size="md" />
            </div>
            <p className="text-muted-foreground">
              The future of decentralized identity verification for financial services.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Solutions</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/solutions/individuals" className="hover:text-primary transition-colors">For Individuals</Link></li>
              <li><Link to="/solutions/banks" className="hover:text-primary transition-colors">For Banks</Link></li>
              <li><Link to="/solutions/regulators" className="hover:text-primary transition-colors">For Regulators</Link></li>
              <li><Link to="/solutions/enterprise" className="hover:text-primary transition-colors">Enterprise</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/resources/documentation" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/resources/whitepaper" className="hover:text-primary transition-colors">Whitepaper</Link></li>
              <li><Link to="/resources/api-reference" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link to="/resources/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/company/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/company/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/company/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-200 mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TrustBond. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
