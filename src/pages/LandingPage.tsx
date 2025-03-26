
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Shield, FileCheck, Building, ArrowRight, Users, BarChart2 } from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';
import MainFooter from '@/components/MainFooter';

const LandingPage: React.FC = () => {
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-20 lg:py-32 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Decentralized KYC <br /> for Modern Finance
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-xl">
                A secure blockchain-based identity verification system that streamlines KYC processes while keeping users in control of their data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="text-base bg-white text-primary hover:bg-white/90">
                  <Link to="/auth/register">Get Started</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base bg-transparent hover:bg-white/20 text-white border-white/20"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/placeholder.svg" 
                alt="Blockchain KYC Illustration" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Features</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform combines the security of blockchain with the efficiency of modern verification systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:border-primary transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Decentralized Identity</CardTitle>
                <CardDescription>
                  Your identity data is stored on the blockchain, giving you full control over who can access it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Self-sovereign identity management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>No central point of failure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Immutable verification records</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-primary transition-colors">
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Smart KYC Process</CardTitle>
                <CardDescription>
                  Streamlined verification with multiple levels of security and trust scoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Document verification automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dynamic trust scoring algorithm</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Rapid approval workflows</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-primary transition-colors">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Financial Institution Tools</CardTitle>
                <CardDescription>
                  Purpose-built tools for banks and financial institutions to streamline customer onboarding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Customer verification dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Integrated loan management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Risk analytics and reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our blockchain-based KYC system makes identity verification simple, secure, and efficient
            </p>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md bg-green-100">
                <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-white">For Users</TabsTrigger>
                <TabsTrigger value="banks" className="data-[state=active]:bg-primary data-[state=active]:text-white">For Banks</TabsTrigger>
                <TabsTrigger value="admins" className="data-[state=active]:bg-primary data-[state=active]:text-white">For Admins</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="users" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Register & Connect</h3>
                  <p className="text-muted-foreground">Create an account and connect your wallet to establish your digital identity</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <FileCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Submit Documents</h3>
                  <p className="text-muted-foreground">Upload your identity documents securely through our encrypted platform</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Get Verified</h3>
                  <p className="text-muted-foreground">Once verified, use your KYC status across any supported financial institution</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button asChild>
                  <Link to="/auth/register">
                    Start Verification <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="banks" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Register Institution</h3>
                  <p className="text-muted-foreground">Register your bank and connect to our blockchain verification system</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Verify Customers</h3>
                  <p className="text-muted-foreground">Access pre-verified user information with their consent</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <BarChart2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Manage Loans</h3>
                  <p className="text-muted-foreground">Process loan applications based on verified identity and trust scores</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button asChild>
                  <Link to="/auth/register">
                    Register as Bank <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="admins" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. System Oversight</h3>
                  <p className="text-muted-foreground">Manage the verification network and monitor system health</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Approve Institutions</h3>
                  <p className="text-muted-foreground">Verify and onboard legitimate financial institutions to the platform</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm border border-green-100">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <BarChart2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Monitor Metrics</h3>
                  <p className="text-muted-foreground">Track system performance, transaction volumes and verification rates</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Streamline Your KYC Process?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users and institutions already benefiting from our blockchain-based verification system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary font-medium">
              <Link to="/auth/register">Create Account</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 font-medium"
            >
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
};

export default LandingPage;
