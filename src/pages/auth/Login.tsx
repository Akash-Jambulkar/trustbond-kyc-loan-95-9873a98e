
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useBlockchain } from '../../contexts/BlockchainContext';
import Logo from '../../components/Logo';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Mail, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { connectToWallet, account, isConnected } = useBlockchain();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('email');

  // Get redirect path from location state or use default
  const from = location.state?.from?.pathname || '/';

  // Redirect if connected via wallet
  useEffect(() => {
    if (loginMethod === 'wallet' && isConnected && account) {
      navigate('/dashboard');
      toast.success(`Logged in as ${account.substring(0, 6)}...${account.substring(account.length - 4)}`);
    }
  }, [isConnected, account, loginMethod, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
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

  const handleWalletLogin = async () => {
    try {
      setIsSubmitting(true);
      await connectToWallet();
      // The redirect is handled in the useEffect above
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
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
    setLoginMethod('email');
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
            <CardDescription>Choose your preferred login method</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="email" value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'wallet')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Login
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center justify-center">
                <Wallet className="h-4 w-4 mr-2" />
                Wallet Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <CardContent>
                <form onSubmit={handleEmailLogin} className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="wallet">
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 space-y-4">
                  <Wallet className="h-16 w-16 text-primary opacity-80" />
                  <p className="text-sm text-center text-muted-foreground">
                    Connect your MetaMask wallet to sign in securely using your blockchain identity.
                  </p>
                  <Button
                    onClick={handleWalletLogin}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-xs text-center text-muted-foreground w-full">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:text-primary/80 transition-colors">
                Create account
              </Link>
            </div>
            
            <Separator />
            
            <div className="w-full">
              <div className="text-xs text-center text-muted-foreground mb-2">Demo Accounts</div>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.role}
                    variant="outline"
                    size="sm"
                    onClick={() => loginWithDemo(account.email)}
                    className="text-xs"
                  >
                    <User className="h-3 w-3 mr-1" />
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
