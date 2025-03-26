
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Code, Shield, CreditCard, Users, FileText, Lock, Key } from 'lucide-react';

const ApiReference: React.FC = () => {
  return (
    <PageLayout 
      title="API Reference" 
      description="Complete documentation of our RESTful and blockchain APIs for developers and integrators."
    >
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">API Overview</h2>
            <p className="text-muted-foreground mb-6">
              Our platform provides comprehensive APIs for interacting with the TrustBond ecosystem. Whether you're building a custom integration or extending our platform's functionality, our well-documented APIs make it easy to get started.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">RESTful APIs</h3>
                  <p className="text-sm text-muted-foreground">Standard HTTP APIs for platform interactions and data access.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Code className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Blockchain APIs</h3>
                  <p className="text-sm text-muted-foreground">Direct interfaces to our smart contracts for on-chain operations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Key className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Authentication</h3>
                  <p className="text-sm text-muted-foreground">Secure API access using OAuth 2.0 and blockchain wallet authentication.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">Base URLs</h4>
                  <p className="font-mono bg-slate-50 p-2 rounded text-xs mt-1">
                    REST API: <span className="text-primary">https://api.trustbond.io/v1</span><br />
                    Blockchain API: <span className="text-primary">https://blockchain.trustbond.io</span>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Authentication</h4>
                  <p className="mb-2">All API requests require authentication:</p>
                  <div className="font-mono bg-slate-50 p-2 rounded text-xs">
                    <span className="text-slate-500">// Example Request with Bearer Token</span><br />
                    GET /users/profile<br />
                    Authorization: Bearer {'<your-api-token>'}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button size="sm" asChild>
                    <Link to="/resources/documentation">View Setup Guide</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">API Reference</h2>
        
        <Tabs defaultValue="identity" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-green-50">
            <TabsTrigger value="identity" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Identity & KYC
            </TabsTrigger>
            <TabsTrigger value="trust" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Trust Scores
            </TabsTrigger>
            <TabsTrigger value="loans" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Loan Management
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Admin APIs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="identity" className="p-6 border border-green-100 rounded-b-lg mt-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Identity & KYC Endpoints
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  APIs for user identity verification, KYC document submission, and status checking.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">POST /identity/submit-kyc</h4>
                  <p className="text-sm text-muted-foreground mb-2">Submit KYC documents for verification.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Requires Auth</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">GET /identity/kyc-status/{'{userId}'}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Check KYC verification status for a user.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Requires Auth</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">PUT /identity/verify-kyc/{'{userId}'}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Verify a user's KYC (bank/admin only).</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Bank/Admin Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trust" className="p-6 border border-green-100 rounded-b-lg mt-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Trust Score Endpoints
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  APIs for calculating, retrieving, and managing user trust scores.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">GET /trust/score/{'{userId}'}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get a user's current trust score.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Requires Auth</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">POST /trust/calculate/{'{userId}'}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Calculate or recalculate a user's trust score.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Bank/Admin Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="loans" className="p-6 border border-green-100 rounded-b-lg mt-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Loan Management Endpoints
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  APIs for loan applications, approvals, and management.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">POST /loans/apply</h4>
                  <p className="text-sm text-muted-foreground mb-2">Submit a new loan application.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Requires Auth</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">GET /loans/user/{'{userId}'}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get all loans for a specific user.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Requires Auth</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">PUT /loans/{'{loanId}'}/approve</h4>
                  <p className="text-sm text-muted-foreground mb-2">Approve a pending loan application.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Bank Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="admin" className="p-6 border border-green-100 rounded-b-lg mt-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Admin & Management Endpoints
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  APIs for system administration, user management, and analytics.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">POST /admin/register-bank</h4>
                  <p className="text-sm text-muted-foreground mb-2">Register a new financial institution.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Admin Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">GET /admin/metrics</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get system-wide metrics and statistics.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Admin Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-green-50 rounded-lg">
                  <h4 className="font-mono text-sm font-bold text-primary">GET /admin/users</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get a list of all registered users.</p>
                  <div className="flex justify-between">
                    <span className="text-xs bg-green-100 text-primary px-2 py-1 rounded">Admin Only</span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                      <Link to="#">View Documentation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="border-green-100">
          <CardHeader>
            <FileText className="h-6 w-6 text-primary mb-2" />
            <CardTitle>SDK Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our client SDKs make it easier to integrate with our API. Available for JavaScript, Python, and Java.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link to="#">View SDK Docs</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-green-100">
          <CardHeader>
            <Code className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Smart Contract ABIs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download ABI definitions for direct interaction with our blockchain smart contracts.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link to="#">Download ABIs</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-green-100">
          <CardHeader>
            <Users className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Developer Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need help with implementation? Our developer support team is here to assist.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link to="/resources/community">Join Developer Community</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ApiReference;
