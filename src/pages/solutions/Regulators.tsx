
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart2, Shield, Search, CheckCircle } from 'lucide-react';

const RegulatorsSolution: React.FC = () => {
  return (
    <PageLayout 
      title="For Regulators" 
      description="Enhanced oversight, streamlined compliance monitoring, and improved transparency for regulatory bodies."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Blockchain-Powered Oversight</h2>
          <p className="text-muted-foreground mb-6">
            Our platform provides regulatory bodies with enhanced visibility into financial institution compliance activities while maintaining privacy and security.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Immutable Audit Trails</h3>
                <p className="text-sm text-muted-foreground">Access tamper-proof records of all KYC and verification activities.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">Monitor compliance metrics and institutional activities in real-time.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Standardized Compliance</h3>
                <p className="text-sm text-muted-foreground">Enforce consistent verification standards across all participating institutions.</p>
              </div>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/auth/register">Learn More</Link>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="Regulatory Oversight Illustration" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features for Regulators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-green-100">
            <CardHeader>
              <BarChart2 className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Compliance Analytics</CardTitle>
              <CardDescription>
                Detailed metrics and reports on industry-wide compliance activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our analytics dashboard provides comprehensive visibility into verification rates, compliance metrics, and exception handling across all participating institutions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Enhanced Due Diligence</CardTitle>
              <CardDescription>
                Tools to investigate suspicious activities and ensure proper compliance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Regulators can drill down into specific verification processes, review documentation, and ensure that financial institutions are properly conducting their due diligence.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Systemic Risk Monitoring</CardTitle>
              <CardDescription>
                Identify patterns and potential risks across the financial ecosystem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform helps regulators identify systemic risks, monitor for unusual patterns, and take proactive measures to maintain financial system integrity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in our regulatory solutions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us to learn how our blockchain-based verification system can enhance regulatory oversight and compliance monitoring.
        </p>
        <Button size="lg" asChild>
          <Link to="/company/contact">Contact Our Team</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default RegulatorsSolution;
