
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart2, Users, Clock, ShieldCheck } from 'lucide-react';

const BanksSolution: React.FC = () => {
  return (
    <PageLayout 
      title="For Banks & Financial Institutions" 
      description="Streamline customer onboarding, reduce KYC costs, and enhance compliance with our blockchain-based verification system."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Transform Your KYC Process</h2>
          <p className="text-muted-foreground mb-6">
            Our blockchain-based KYC solution reduces the time, cost, and complexity of customer onboarding while enhancing security and regulatory compliance.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Reduced Onboarding Time</h3>
                <p className="text-sm text-muted-foreground">Cut customer verification time from days to minutes with pre-verified identities.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Lower Compliance Costs</h3>
                <p className="text-sm text-muted-foreground">Reduce the cost of KYC by leveraging our blockchain verification network.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Enhanced Due Diligence</h3>
                <p className="text-sm text-muted-foreground">Access immutable verification records and trust scores for better risk assessment.</p>
              </div>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/auth/register">Register Your Institution</Link>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="Bank Dashboard Illustration" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features for Financial Institutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-green-100">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Verification Dashboard</CardTitle>
              <CardDescription>
                Comprehensive tools to review and verify customer identities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our intuitive dashboard allows your compliance team to review customer information, verify documents, and manage the entire KYC workflow efficiently.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <BarChart2 className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Trust Score System</CardTitle>
              <CardDescription>
                Access blockchain-verified trust scores for better risk assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our proprietary trust scoring algorithm combines verification status, historical data, and blockchain records to provide a comprehensive risk profile for each customer.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>
                Stay compliant with AML and KYC regulations with immutable audit trails.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every verification action is recorded on the blockchain, creating a tamper-proof audit trail that satisfies regulatory requirements and simplifies reporting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Integrated Loan Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-green-50 p-8 rounded-xl border border-green-100">
            <img 
              src="/placeholder.svg" 
              alt="Loan Management Illustration" 
              className="w-full rounded-lg"
            />
          </div>
          
          <div>
            <p className="text-muted-foreground mb-6">
              Our platform seamlessly integrates with your loan management processes, allowing you to leverage verified identity and trust scores to streamline loan approvals.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Faster Loan Processing</h3>
                  <p className="text-sm text-muted-foreground">Reduce loan approval time with pre-verified customer information.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <BarChart2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Better Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">Make more informed lending decisions with blockchain-verified trust scores.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Enhanced Customer Experience</h3>
                  <p className="text-sm text-muted-foreground">Provide a smoother application process for your customers with less paperwork.</p>
                </div>
              </div>
            </div>
            
            <Button asChild variant="outline">
              <Link to="/solutions/loan-management">Learn More About Loan Management</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your KYC process?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join leading financial institutions already benefiting from our blockchain-based verification system.
        </p>
        <Button size="lg" asChild>
          <Link to="/auth/register">Register Your Institution Today</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default BanksSolution;
