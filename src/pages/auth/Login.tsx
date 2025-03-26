
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get redirect path from location state or use default
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo account info
  const demoAccounts = [
    { role: 'Admin', email: 'admin@example.com', password: 'password' },
    { role: 'Bank', email: 'bank@example.com', password: 'password' },
    { role: 'User', email: 'user@example.com', password: 'password' },
  ];

  const loginWithDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background to-secondary/20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo dark size="lg" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            DeFi KYC & Loan Management System
          </p>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground/80">
                    Password
                  </label>
                  <Link to="/auth/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full button-transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-xs text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:text-primary/80 transition-colors">
                Create account
              </Link>
            </div>
            
            <div className="w-full">
              <div className="relative flex py-4 items-center w-full">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-3 text-xs text-muted-foreground">Demo Accounts</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.role}
                    variant="outline"
                    size="sm"
                    onClick={() => loginWithDemo(account.email)}
                    className="text-xs"
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
