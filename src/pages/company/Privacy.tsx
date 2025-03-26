
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Lock, Shield, FileText, Users } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <PageLayout 
      title="Privacy Policy" 
      description="Our commitment to protecting your personal information and privacy."
    >
      <div className="mb-8">
        <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-8">
          <div className="flex items-start">
            <Lock className="h-8 w-8 text-primary mr-4 mt-1 shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">Privacy First Approach</h2>
              <p className="text-muted-foreground">
                At TrustBond, we take your privacy seriously. Our blockchain-based platform is designed with privacy at its core, giving you control over your personal information while maintaining security and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          <strong>Last Updated:</strong> January 15, 2023
        </p>
        
        <div className="prose max-w-none">
          <h2>Introduction</h2>
          <p>
            TrustBond ("we", "our", or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, and disclose your personal information when you use our blockchain-based KYC platform and related services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
          
          <h2>Information We Collect</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our service to you:
          </p>
          
          <h3>Personal Data</h3>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
          </p>
          <ul>
            <li>Name, address, and date of birth</li>
            <li>Email address and phone number</li>
            <li>Government-issued identification documents</li>
            <li>Blockchain wallet addresses</li>
            <li>Financial information for KYC verification purposes</li>
            <li>Biometric data (where permitted by law and with explicit consent)</li>
          </ul>
          
          <h3>Usage Data</h3>
          <p>
            We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
          </p>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To verify your identity as part of our KYC process</li>
            <li>To calculate trust scores and facilitate financial transactions</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>
          
          <h2>Blockchain Data and Privacy</h2>
          <p>
            Our service utilizes blockchain technology, which creates immutable records. However, we employ several techniques to protect your privacy:
          </p>
          <ul>
            <li>Personal identifying information is stored off-chain with appropriate encryption</li>
            <li>On-chain data is limited to verification statuses and cryptographic proofs</li>
            <li>Zero-knowledge proofs are used to enable verification without revealing underlying data</li>
            <li>Selective disclosure mechanisms allow you to control what information is shared with specific parties</li>
          </ul>
          
          <h2>Data Retention</h2>
          <p>
            We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
          </p>
          
          <h2>Data Transfer</h2>
          <p>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
          </p>
          <p>
            If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to the United States and process it there.
          </p>
          <p>
            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>
          
          <h2>Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          
          <h2>Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information (subject to legal requirements)</li>
            <li>The right to restrict or object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent where processing is based on consent</li>
          </ul>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: <a href="mailto:privacy@trustbond.io" className="text-primary hover:underline">privacy@trustbond.io</a></li>
            <li>By mail: TrustBond, 123 Blockchain Avenue, San Francisco, CA 94107, United States</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-6 border border-green-100 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold mb-2">Data Protection</h3>
            <p className="text-sm text-muted-foreground">
              We implement robust security measures to protect your personal information from unauthorized access.
            </p>
          </div>
        </div>
        
        <div className="p-6 border border-green-100 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold mb-2">User Control</h3>
            <p className="text-sm text-muted-foreground">
              Our platform gives you control over what personal information is shared and with whom.
            </p>
          </div>
        </div>
        
        <div className="p-6 border border-green-100 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <Lock className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold mb-2">Encryption</h3>
            <p className="text-sm text-muted-foreground">
              We use advanced encryption techniques to secure your data both in transit and at rest.
            </p>
          </div>
        </div>
        
        <div className="p-6 border border-green-100 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold mb-2">Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Our platform is designed to comply with global privacy regulations including GDPR and CCPA.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
