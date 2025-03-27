import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightIcon, ShieldCheckIcon, Building2Icon, UserIcon, BookOpenIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl md:text-6xl">
            <span className="text-primary">Trustbond</span> KYC & Loan Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A secure and decentralized application for KYC verification and loan management powered by blockchain technology
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth/register">
                Get Started <ArrowRightIcon />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/resources/documentation">Learn More</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="users">For Users</TabsTrigger>
            <TabsTrigger value="banks">For Banks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="animate-hover">
                <CardHeader>
                  <ShieldCheckIcon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure KYC Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Advanced blockchain-based KYC verification for enhanced security and user privacy.</p>
                </CardContent>
              </Card>
              
              <Card className="animate-hover">
                <CardHeader>
                  <Building2Icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Decentralized Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Apply for and manage loans in a fully decentralized and transparent environment.</p>
                </CardContent>
              </Card>
              
              <Card className="animate-hover">
                <CardHeader>
                  <UserIcon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Trust Score System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Fair and transparent trust scoring system based on verified credentials and loan history.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits for Individual Users</CardTitle>
                <CardDescription>How Trustbond helps individual users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Submit KYC documents securely with cryptographic proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Apply for loans with competitive interest rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Build your trust score for better loan terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Full transparency and control over your personal data</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/solutions/individuals">Learn More About Individual Features</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="banks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits for Financial Institutions</CardTitle>
                <CardDescription>How Trustbond helps banks and lenders</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Verify KYC documents with cryptographic assurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Assess loan applications with reliable trust scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Manage loan portfolios with real-time blockchain data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="h-5 w-5 text-primary mt-0.5" />
                    <span>Reduce fraud and compliance costs significantly</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/solutions/banks">Explore Bank Solutions</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our blockchain-powered KYC and loan platform today. Setup is quick and easy with our local Ganache testnet.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="default">
              <Link to="/auth/register">Sign Up</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/company/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
