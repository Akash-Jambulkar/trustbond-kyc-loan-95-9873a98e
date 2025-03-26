
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Code, BookOpen, Users } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <PageLayout 
      title="Documentation" 
      description="Comprehensive guides, tutorials, and references for our blockchain KYC platform."
    >
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-100">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                New to our platform? Start here for quick setup guides.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-primary hover:underline">Platform Overview</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Account Setup</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Wallet Configuration</Link></li>
                <li><Link to="#" className="text-primary hover:underline">First Verification</Link></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="#">View All</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>User Guides</CardTitle>
              <CardDescription>
                Detailed instructions for individual users and banks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-primary hover:underline">KYC Submission Guide</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Document Requirements</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Bank Verification Process</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Loan Application Flow</Link></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="#">View All</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <Code className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Developer Docs</CardTitle>
              <CardDescription>
                Technical documentation for developers and integrators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-primary hover:underline">API Reference</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Smart Contract Specs</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Integration Guide</Link></li>
                <li><Link to="#" className="text-primary hover:underline">SDK Documentation</Link></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="#">View All</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Tutorials</CardTitle>
              <CardDescription>
                Step-by-step tutorials and practical examples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-primary hover:underline">Setting Up Your First KYC</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Bank Verification Tutorial</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Loan Management Walkthrough</Link></li>
                <li><Link to="#" className="text-primary hover:underline">Analytics Dashboard Guide</Link></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="#">View All</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Updates</h2>
        
        <div className="space-y-6">
          <div className="p-6 border border-green-100 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">API Documentation v2.3 Release</h3>
                <p className="text-sm text-muted-foreground">Updated: May 15, 2023</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-primary text-xs rounded-full">New</span>
            </div>
            <p className="mb-4 text-muted-foreground">
              We've released a new version of our API documentation, including new endpoints for trust score calculation and enhanced KYC verification.
            </p>
            <Button size="sm" asChild>
              <Link to="#">Read Release Notes</Link>
            </Button>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Smart Contract Security Audit</h3>
                <p className="text-sm text-muted-foreground">Updated: April 2, 2023</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Updated</span>
            </div>
            <p className="mb-4 text-muted-foreground">
              We've published the results of our latest smart contract security audit, demonstrating our commitment to providing secure blockchain infrastructure.
            </p>
            <Button size="sm" asChild>
              <Link to="#">View Audit Results</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/resources/community">Join Our Community</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/company/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Documentation;
