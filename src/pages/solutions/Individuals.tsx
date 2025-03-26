
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Unlock, Send } from 'lucide-react';

const IndividualsSolution: React.FC = () => {
  return (
    <PageLayout 
      title="For Individuals" 
      description="Secure, private, and blockchain-backed identity verification that puts you in control of your data."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Identity, Your Control</h2>
          <p className="text-muted-foreground mb-6">
            In today's digital world, your identity data is scattered across numerous platforms, companies, and institutions. Our blockchain-based KYC solution puts you back in control of who can access your information and when.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">One-Time Verification</h3>
                <p className="text-sm text-muted-foreground">Submit your KYC information once and reuse it across multiple financial institutions.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Self-Sovereign Identity</h3>
                <p className="text-sm text-muted-foreground">Own and control your identity data on the blockchain.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Selective Disclosure</h3>
                <p className="text-sm text-muted-foreground">Choose exactly what information to share with each institution.</p>
              </div>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/auth/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="Identity Control Illustration" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-green-100">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Enhanced Privacy</CardTitle>
              <CardDescription>
                Your sensitive personal data is cryptographically secured on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                With our zero-knowledge proof technology, you can prove your identity without revealing all your personal details. This minimizes data exposure and protects your privacy.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Unlock className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Faster Access</CardTitle>
              <CardDescription>
                Skip repetitive KYC processes when dealing with new financial institutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once verified on our platform, you can grant instant access to your KYC data to any participating bank or financial institution, saving time and eliminating paperwork.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Send className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Simplified Loans</CardTitle>
              <CardDescription>
                Apply for loans with participating banks using your verified digital identity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your blockchain-verified identity and trust score make loan applications faster and more likely to be approved, as banks can instantly verify your credentials.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Ready to take control of your identity?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of users who are already benefiting from our secure, blockchain-based identity verification system.
        </p>
        <Button size="lg" asChild>
          <Link to="/auth/register">Create Your Secure Identity Now</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default IndividualsSolution;
