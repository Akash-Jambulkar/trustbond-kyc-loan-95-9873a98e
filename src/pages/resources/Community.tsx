
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MessageSquare, Github, Users, BookOpen, ArrowRight } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <PageLayout 
      title="Community" 
      description="Join our growing community of developers, financial institutions, and blockchain enthusiasts."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            The TrustBond community brings together developers, financial institutions, and blockchain enthusiasts to collaborate, share knowledge, and build the future of decentralized identity verification.
          </p>
          <p className="text-muted-foreground mb-6">
            Whether you're looking for technical support, want to contribute to our open-source projects, or simply want to stay updated on the latest developments, our community platforms offer something for everyone.
          </p>
          <Button asChild size="lg">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-4 w-4" />
              Join Our Discord
            </a>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <img 
            src="/placeholder.svg" 
            alt="Community Illustration" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Community Platforms</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-100">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Discord</CardTitle>
              <CardDescription>
                Join discussions, get support, and connect with the team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our Discord server is the hub of our community, with dedicated channels for technical support, development, announcements, and general discussion.
              </p>
              <Button size="sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>GitHub</CardTitle>
              <CardDescription>
                Explore our open-source projects and contribute to development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Check out our repositories, report issues, submit pull requests, and contribute to our open-source projects on GitHub.
              </p>
              <Button size="sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Visit GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Forum</CardTitle>
              <CardDescription>
                Participate in in-depth discussions and knowledge sharing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our community forum is the place for in-depth technical discussions, feature requests, case studies, and best practices.
              </p>
              <Button size="sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Browse Forum
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Access comprehensive guides, tutorials, and references.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our documentation portal provides detailed guides, API references, tutorials, and examples to help you get the most out of our platform.
              </p>
              <Button size="sm" asChild>
                <Link to="/resources/documentation">
                  View Docs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
        
        <div className="space-y-6">
          <div className="p-6 border border-green-100 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">TrustBond Developer Conference</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  June 15-16, 2023 • San Francisco, CA & Virtual
                </p>
                <p className="text-sm text-muted-foreground">
                  Join us for two days of workshops, presentations, and networking focused on blockchain identity and KYC solutions.
                </p>
              </div>
              <Button variant="outline" asChild className="shrink-0">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </div>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Monthly Community Call</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Last Thursday of every month • 10:00 AM PST • Virtual
                </p>
                <p className="text-sm text-muted-foreground">
                  Monthly update on product development, roadmap, and Q&A with the TrustBond team.
                </p>
              </div>
              <Button variant="outline" asChild className="shrink-0">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Add to Calendar
                </a>
              </Button>
            </div>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Blockchain KYC Workshop</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  July 8, 2023 • Virtual
                </p>
                <p className="text-sm text-muted-foreground">
                  Hands-on workshop on implementing and integrating our blockchain KYC solutions.
                </p>
              </div>
              <Button variant="outline" asChild className="shrink-0">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <h3 className="text-xl font-bold mb-4">Contribute to Open Source</h3>
          <p className="text-muted-foreground mb-6">
            We believe in the power of open source to drive innovation and transparency in blockchain technology. Many of our components are open source, and we welcome contributions from the community.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Contribute to our Core libraries</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Help improve documentation</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Develop integrations with other platforms</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Report and fix bugs</span>
            </li>
          </ul>
          <Button asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Explore Repositories
            </a>
          </Button>
        </div>
        
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <h3 className="text-xl font-bold mb-4">Ambassador Program</h3>
          <p className="text-muted-foreground mb-6">
            Join our ambassador program to represent TrustBond in your region, organize local events, and help grow our community. Ambassadors receive exclusive benefits and early access to new features.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Represent TrustBond at local events</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Organize meetups and workshops</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Create educational content</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">Provide feedback on new features</span>
            </li>
          </ul>
          <Button asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
