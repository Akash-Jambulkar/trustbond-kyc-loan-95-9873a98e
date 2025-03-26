
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const MainNavigation: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="py-4 border-b border-green-100">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <Logo dark size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/solutions/individuals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">For Individuals</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Secure identity verification for personal use
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/solutions/banks" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">For Banks</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Streamlined customer onboarding and verification
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/solutions/regulators" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">For Regulators</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Oversight and compliance monitoring tools
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/solutions/enterprise" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Enterprise</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Custom solutions for large organizations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/resources/documentation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Documentation</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive guides and API documentation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/resources/whitepaper" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Whitepaper</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Technical details of our blockchain implementation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/resources/api-reference" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">API Reference</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Detailed API documentation for developers
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/resources/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Community</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Join our community of developers and users
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/company/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn more about our mission and team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/company/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Contact</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get in touch with our support team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/company/privacy" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Privacy Policy</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Information about how we protect your data
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-b border-gray-100 absolute left-0 right-0 z-50">
          <ul className="flex flex-col space-y-4">
            <li className="font-medium">
              <span className="text-sm text-muted-foreground">Solutions</span>
              <ul className="mt-2 ml-4 space-y-2">
                <li><Link to="/solutions/individuals" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>For Individuals</Link></li>
                <li><Link to="/solutions/banks" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>For Banks</Link></li>
                <li><Link to="/solutions/regulators" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>For Regulators</Link></li>
                <li><Link to="/solutions/enterprise" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Enterprise</Link></li>
              </ul>
            </li>
            <li className="font-medium">
              <span className="text-sm text-muted-foreground">Resources</span>
              <ul className="mt-2 ml-4 space-y-2">
                <li><Link to="/resources/documentation" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Documentation</Link></li>
                <li><Link to="/resources/whitepaper" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Whitepaper</Link></li>
                <li><Link to="/resources/api-reference" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>API Reference</Link></li>
                <li><Link to="/resources/community" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Community</Link></li>
              </ul>
            </li>
            <li className="font-medium">
              <span className="text-sm text-muted-foreground">Company</span>
              <ul className="mt-2 ml-4 space-y-2">
                <li><Link to="/company/about" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>About Us</Link></li>
                <li><Link to="/company/contact" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Contact</Link></li>
                <li><Link to="/company/privacy" className="text-sm hover:text-primary" onClick={() => setMobileNavOpen(false)}>Privacy Policy</Link></li>
              </ul>
            </li>
            <li className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth/login" onClick={() => setMobileNavOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/auth/register" onClick={() => setMobileNavOpen(false)}>Get Started</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
