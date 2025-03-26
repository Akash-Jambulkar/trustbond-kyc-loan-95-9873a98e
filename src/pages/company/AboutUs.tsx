
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Code, Building } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <PageLayout 
      title="About TrustBond" 
      description="Learn about our mission, team, and the technology behind our blockchain KYC platform."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            At TrustBond, we're on a mission to transform how identity verification works in the financial sector. We believe that individuals should have ownership of their identity data, while financial institutions should have access to reliable verification methods that reduce costs and improve security.
          </p>
          <p className="text-muted-foreground">
            Founded in 2020 by a team of blockchain experts and financial industry veterans, TrustBond has grown to become a leading provider of decentralized KYC solutions that bridge the gap between traditional finance and blockchain technology.
          </p>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="TrustBond Team" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  We never compromise on security, employing the most robust cryptographic methods to protect user data.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">User Empowerment</h3>
                <p className="text-sm text-muted-foreground">
                  We believe that individuals should control their own data and decide who can access it and when.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Technical Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We push the boundaries of what's possible with blockchain technology to create innovative solutions.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  We design our solutions to meet or exceed regulatory requirements in all jurisdictions we serve.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Our Leadership Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-green-50">
              <img 
                src="/placeholder.svg" 
                alt="CEO Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold">Sarah Johnson</h3>
            <p className="text-primary text-sm mb-2">CEO & Co-founder</p>
            <p className="text-sm text-muted-foreground">
              Former fintech executive with 15+ years of experience in digital banking and blockchain.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-green-50">
              <img 
                src="/placeholder.svg" 
                alt="CTO Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold">Michael Chen</h3>
            <p className="text-primary text-sm mb-2">CTO & Co-founder</p>
            <p className="text-sm text-muted-foreground">
              Blockchain architect and security expert with background in cryptographic systems.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-green-50">
              <img 
                src="/placeholder.svg" 
                alt="COO Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold">Emily Rodriguez</h3>
            <p className="text-primary text-sm mb-2">COO</p>
            <p className="text-sm text-muted-foreground">
              Operations expert with experience scaling fintech startups and enterprise solutions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-8 rounded-xl border border-green-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Journey</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 ml-6 border-l-2 border-primary/30 h-full"></div>
            
            <div className="mb-10 ml-12 relative">
              <div className="absolute -left-14 mt-1.5">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <h3 className="font-bold">2020: Foundation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                TrustBond was founded with the vision of creating a decentralized KYC platform.
              </p>
            </div>
            
            <div className="mb-10 ml-12 relative">
              <div className="absolute -left-14 mt-1.5">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <h3 className="font-bold">2021: Beta Launch</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Released our beta platform and secured partnerships with three regional banks.
              </p>
            </div>
            
            <div className="mb-10 ml-12 relative">
              <div className="absolute -left-14 mt-1.5">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <h3 className="font-bold">2022: Full Launch</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Official platform launch with enhanced features and regulatory approval.
              </p>
            </div>
            
            <div className="ml-12 relative">
              <div className="absolute -left-14 mt-1.5">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
              </div>
              <h3 className="font-bold">2023: Global Expansion</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Expanded to multiple countries and integrated with major financial networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutUs;
