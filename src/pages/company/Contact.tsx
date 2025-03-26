
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form submission logic would go here
    console.log('Form submitted!');
  };

  return (
    <PageLayout 
      title="Contact Us" 
      description="Get in touch with our team for support, sales inquiries, or partnership opportunities."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have questions about our platform? Want to discuss a potential partnership? Our team is here to help. Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Your Company" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inquiry-type">Inquiry Type</Label>
              <Select>
                <SelectTrigger id="inquiry-type">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="press">Press & Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="How can we help you?" 
                rows={4}
                required
              />
            </div>
            
            <Button type="submit">Send Message</Button>
          </form>
        </div>
        
        <div>
          <Card className="border-green-100 mb-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly or visit our offices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Headquarters</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Blockchain Avenue<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +1 (800) 123-4567
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:info@trustbond.io" className="text-primary hover:underline">info@trustbond.io</a> (General Inquiries)<br />
                    <a href="mailto:support@trustbond.io" className="text-primary hover:underline">support@trustbond.io</a> (Technical Support)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-bold mb-4">Global Offices</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">London</h4>
                <p className="text-sm text-muted-foreground">
                  45 Fintech Street<br />
                  London, EC2A 4BQ<br />
                  United Kingdom
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Singapore</h4>
                <p className="text-sm text-muted-foreground">
                  8 Marina View<br />
                  Singapore 018960
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Sydney</h4>
                <p className="text-sm text-muted-foreground">
                  300 Barangaroo Avenue<br />
                  Sydney, NSW 2000<br />
                  Australia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-green-100 rounded-lg">
            <h3 className="font-bold mb-2">How quickly will I receive a response?</h3>
            <p className="text-sm text-muted-foreground">
              We aim to respond to all inquiries within 24 business hours. Support tickets are prioritized based on urgency and complexity.
            </p>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Do you offer technical support on weekends?</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise customers have access to 24/7 emergency support. Standard support is available during business hours, Monday through Friday.
            </p>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <h3 className="font-bold mb-2">How can I schedule a product demo?</h3>
            <p className="text-sm text-muted-foreground">
              You can request a demo by selecting "Sales" in the inquiry type dropdown and mentioning your interest in a product demonstration.
            </p>
          </div>
          
          <div className="p-6 border border-green-100 rounded-lg">
            <h3 className="font-bold mb-2">How do I report a security vulnerability?</h3>
            <p className="text-sm text-muted-foreground">
              Please email <a href="mailto:security@trustbond.io" className="text-primary hover:underline">security@trustbond.io</a> with details about the vulnerability. We take security concerns very seriously.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
