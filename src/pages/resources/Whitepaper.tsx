
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Whitepaper: React.FC = () => {
  return (
    <PageLayout 
      title="TrustBond Whitepaper" 
      description="Our technical whitepaper detailing the architecture, implementation, and security features of our blockchain-based KYC platform."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">TrustBond: A Decentralized KYC Solution</h2>
          
          <div className="prose max-w-none mb-8">
            <p>
              Our whitepaper provides an in-depth look at the TrustBond platform, explaining the technical architecture, cryptographic principles, and blockchain implementation that power our decentralized KYC solution.
            </p>
            
            <h3>Abstract</h3>
            <p>
              Know Your Customer (KYC) processes are essential for financial institutions to comply with regulatory requirements and mitigate fraud risks. However, traditional KYC methods are often fragmented, redundant, and inefficient. This whitepaper introduces TrustBond, a blockchain-based identity verification platform that creates a secure, decentralized ecosystem for KYC data sharing while maintaining user privacy and regulatory compliance.
            </p>
            
            <h3>Key Topics Covered</h3>
            <ul>
              <li>Blockchain architecture and implementation details</li>
              <li>Zero-knowledge proof mechanisms for privacy-preserving verification</li>
              <li>Trust score calculation methodology</li>
              <li>Security measures and cryptographic techniques</li>
              <li>Regulatory compliance framework</li>
              <li>Implementation roadmap and future developments</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" />
                Download PDF (3.2 MB)
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#" download>
                <FileText className="mr-2 h-4 w-4" />
                Download Executive Summary
              </a>
            </Button>
          </div>
        </div>
        
        <div>
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Whitepaper Version</CardTitle>
              <CardDescription>Currently at v2.1, last updated May 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Authors</h4>
                  <p className="text-sm text-muted-foreground">
                    Dr. Jane Smith, Chief Cryptographer<br />
                    Alex Johnson, Blockchain Architect<br />
                    Dr. Robert Chen, Security Researcher
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Citation</h4>
                  <p className="text-sm text-muted-foreground">
                    Smith, J., Johnson, A., & Chen, R. (2023). TrustBond: A Decentralized KYC Solution for Modern Finance. TrustBond Labs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">License</h4>
                  <p className="text-sm text-muted-foreground">
                    This whitepaper is licensed under Creative Commons Attribution-NonCommercial 4.0 International License.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Technical Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our whitepaper details the layered approach to our blockchain architecture, explaining how we combine public and private chains for optimal security and efficiency.
              </p>
              <Button variant="link" size="sm" asChild className="p-0">
                <Link to="#">Read Architecture Section <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Privacy Preservation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how we implement zero-knowledge proofs and selective disclosure to maintain user privacy while enabling necessary verification.
              </p>
              <Button variant="link" size="sm" asChild className="p-0">
                <Link to="#">Read Privacy Section <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Trust Score Mechanism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Discover the mathematical model behind our trust scoring system and how it incorporates multiple verification factors.
              </p>
              <Button variant="link" size="sm" asChild className="p-0">
                <Link to="#">Read Trust Score Section <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Dive deeper into our technical implementation with our additional resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/resources/api-reference">Explore API Reference</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/resources/documentation">View Technical Docs</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Whitepaper;
