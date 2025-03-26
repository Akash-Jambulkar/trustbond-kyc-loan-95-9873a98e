
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, Lock, Settings, CheckCircle } from 'lucide-react';

const EnterpriseSolution: React.FC = () => {
  return (
    <PageLayout 
      title="Enterprise Solutions" 
      description="Custom blockchain-based identity and verification solutions tailored for large organizations and complex use cases."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Enterprise-Grade Identity Verification</h2>
          <p className="text-muted-foreground mb-6">
            Our enterprise solutions provide large organizations with customizable, scalable, and secure identity verification infrastructure built on blockchain technology.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Custom Integration</h3>
                <p className="text-sm text-muted-foreground">Seamlessly integrate with your existing systems and workflows.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Enterprise Scale</h3>
                <p className="text-sm text-muted-foreground">Handle millions of verifications with high performance and reliability.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
              <div>
                <h3 className="font-medium">Dedicated Support</h3>
                <p className="text-sm text-muted-foreground">Get priority access to our technical experts and implementation team.</p>
              </div>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/company/contact">Contact Sales</Link>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="Enterprise Solution Illustration" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Enterprise Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-green-100">
            <CardHeader>
              <Building className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Multi-Entity Management</CardTitle>
              <CardDescription>
                Manage verification across multiple business units or subsidiaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our enterprise platform allows central management of verification processes while supporting unique requirements for different business units or geographical regions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Lock className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Enhanced Security</CardTitle>
              <CardDescription>
                Enterprise-grade security features with advanced encryption.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our enterprise solutions include additional security measures such as hardware security module support, multi-factor authentication, and role-based access controls.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Settings className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Custom Workflows</CardTitle>
              <CardDescription>
                Tailor verification processes to your specific business requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create custom verification workflows with specific approval steps, document requirements, and integration points with your existing systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Private Blockchain Deployment</h2>
            <p className="text-muted-foreground mb-6">
              For enterprises with specific security or regulatory requirements, we offer private blockchain deployments that provide all the benefits of blockchain technology while maintaining complete control over your data.
            </p>
            <Button asChild variant="outline">
              <Link to="/resources/private-blockchain">Learn About Private Deployment</Link>
            </Button>
          </div>
          <div>
            <img 
              src="/placeholder.svg" 
              alt="Private Blockchain Illustration" 
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to discuss your enterprise needs?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team of experts will work with you to design a custom solution that meets your specific requirements.
        </p>
        <Button size="lg" asChild>
          <Link to="/company/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default EnterpriseSolution;
