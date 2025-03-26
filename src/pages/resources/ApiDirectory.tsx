
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Database, ServerCrash, Server, Globe, Lock, Webhook, Braces, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PageLayout from '@/components/PageLayout';

// Helper function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard');
  }).catch(() => {
    toast.error('Failed to copy');
  });
};

const ApiDirectory: React.FC = () => {
  const blockchainApis = [
    {
      name: 'Register User',
      endpoint: '/blockchain/register-user',
      method: 'POST',
      description: 'Register a new user on the blockchain',
      parameters: [
        { name: 'address', type: 'string', description: 'Ethereum address of the user' },
        { name: 'userData', type: 'object', description: 'Optional user data (fullName, email)' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires wallet connection'
    },
    {
      name: 'Register Bank',
      endpoint: '/blockchain/register-bank',
      method: 'POST',
      description: 'Register a new financial institution on the blockchain',
      parameters: [
        { name: 'address', type: 'string', description: 'Ethereum address of the bank' },
        { name: 'name', type: 'string', description: 'Name of the bank' },
        { name: 'regId', type: 'string', description: 'Registration ID of the bank' },
        { name: 'additionalInfo', type: 'object', description: 'Optional additional information' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires admin wallet'
    },
    {
      name: 'Assign Admin Role',
      endpoint: '/blockchain/assign-admin',
      method: 'POST',
      description: 'Assign admin role to a user',
      parameters: [
        { name: 'address', type: 'string', description: 'Ethereum address of the user' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires admin wallet'
    },
    {
      name: 'Get User Role',
      endpoint: '/blockchain/user-role',
      method: 'GET',
      description: 'Get the role of a user',
      parameters: [
        { name: 'address', type: 'string', description: 'Ethereum address of the user' }
      ],
      returns: 'String indicating user role (user, bank, admin)',
      auth: 'Public'
    }
  ];

  const kycApis = [
    {
      name: 'Submit KYC Document',
      endpoint: '/kyc/submit',
      method: 'POST',
      description: 'Submit KYC document for verification',
      parameters: [
        { name: 'documentData', type: 'object', description: 'Document data including hash, type, etc.' }
      ],
      returns: 'Document object with ID and status',
      auth: 'Requires wallet connection'
    },
    {
      name: 'Verify KYC Document',
      endpoint: '/kyc/verify',
      method: 'POST',
      description: 'Verify or reject a KYC document',
      parameters: [
        { name: 'userAddress', type: 'string', description: 'User wallet address' },
        { name: 'documentId', type: 'string', description: 'Document ID' },
        { name: 'isVerified', type: 'boolean', description: 'Verification status' },
        { name: 'rejectionReason', type: 'string', description: 'Optional reason for rejection' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires bank or admin wallet'
    },
    {
      name: 'Get KYC Status',
      endpoint: '/kyc/status',
      method: 'GET',
      description: 'Get KYC verification status for a user',
      parameters: [
        { name: 'address', type: 'string', description: 'User wallet address' }
      ],
      returns: 'Object with verification status details',
      auth: 'Requires wallet connection (own address) or bank/admin for any address'
    },
    {
      name: 'Get Pending Verifications',
      endpoint: '/kyc/pending',
      method: 'GET',
      description: 'Get all pending KYC verification requests',
      parameters: [],
      returns: 'Array of pending verification documents',
      auth: 'Requires bank or admin wallet'
    }
  ];

  const loanApis = [
    {
      name: 'Request Loan',
      endpoint: '/loans/request',
      method: 'POST',
      description: 'Submit a loan request to a bank',
      parameters: [
        { name: 'bankAddress', type: 'string', description: 'Bank wallet address' },
        { name: 'amount', type: 'number', description: 'Loan amount in ETH' },
        { name: 'purpose', type: 'string', description: 'Loan purpose' },
        { name: 'duration', type: 'number', description: 'Loan duration in days' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires verified user wallet'
    },
    {
      name: 'Approve Loan',
      endpoint: '/loans/approve',
      method: 'POST',
      description: 'Approve a loan request',
      parameters: [
        { name: 'loanId', type: 'number', description: 'ID of the loan' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires bank wallet'
    },
    {
      name: 'Reject Loan',
      endpoint: '/loans/reject',
      method: 'POST',
      description: 'Reject a loan request',
      parameters: [
        { name: 'loanId', type: 'number', description: 'ID of the loan' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires bank wallet'
    },
    {
      name: 'Get Loan Details',
      endpoint: '/loans/:id',
      method: 'GET',
      description: 'Get details of a specific loan',
      parameters: [
        { name: 'loanId', type: 'number', description: 'ID of the loan' }
      ],
      returns: 'Loan object with all details',
      auth: 'Requires wallet connection (own loans) or bank/admin for any loan'
    },
    {
      name: 'Get User Loans',
      endpoint: '/loans/user/:address',
      method: 'GET',
      description: 'Get all loans for a user',
      parameters: [
        { name: 'address', type: 'string', description: 'User wallet address' }
      ],
      returns: 'Array of loan objects',
      auth: 'Requires wallet connection (own loans) or bank/admin for any user'
    },
    {
      name: 'Repay Loan',
      endpoint: '/loans/repay',
      method: 'POST',
      description: 'Make a payment towards a loan',
      parameters: [
        { name: 'loanId', type: 'number', description: 'ID of the loan' },
        { name: 'amount', type: 'number', description: 'Payment amount in ETH' }
      ],
      returns: 'Boolean indicating success',
      auth: 'Requires wallet connection (borrower only)'
    }
  ];

  const databaseApis = [
    {
      name: 'Save User Info',
      endpoint: '/database/users',
      method: 'POST',
      description: 'Save or update user information in MongoDB',
      parameters: [
        { name: 'userData', type: 'object', description: 'User data object' }
      ],
      returns: 'User object with MongoDB ID',
      auth: 'Requires wallet connection (own data) or admin for any user'
    },
    {
      name: 'Get User Info',
      endpoint: '/database/users/:address',
      method: 'GET',
      description: 'Get user information from MongoDB',
      parameters: [
        { name: 'walletAddress', type: 'string', description: 'User wallet address' }
      ],
      returns: 'User object',
      auth: 'Requires wallet connection (own data) or bank/admin for any user'
    },
    {
      name: 'Save Bank Info',
      endpoint: '/database/banks',
      method: 'POST',
      description: 'Save or update bank information in MongoDB',
      parameters: [
        { name: 'bankData', type: 'object', description: 'Bank data object' }
      ],
      returns: 'Bank object with MongoDB ID',
      auth: 'Requires wallet connection (own data) or admin for any bank'
    },
    {
      name: 'Get All Banks',
      endpoint: '/database/banks',
      method: 'GET',
      description: 'Get all banks from MongoDB',
      parameters: [],
      returns: 'Array of bank objects',
      auth: 'Public'
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto py-10 px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">API Directory</h1>
        <p className="text-muted-foreground mb-6">
          Complete reference of all available APIs for the TrustBond DeFi KYC & Loan Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Braces className="mr-2 h-5 w-5 text-primary" />
                Blockchain APIs
              </CardTitle>
              <CardDescription>Smart contract interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{blockchainApis.length}</p>
              <p className="text-muted-foreground text-sm">Available endpoints</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                KYC APIs
              </CardTitle>
              <CardDescription>Verification services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kycApis.length}</p>
              <p className="text-muted-foreground text-sm">Available endpoints</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Webhook className="mr-2 h-5 w-5 text-primary" />
                Loan APIs
              </CardTitle>
              <CardDescription>Loan management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{loanApis.length}</p>
              <p className="text-muted-foreground text-sm">Available endpoints</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Database APIs
              </CardTitle>
              <CardDescription>MongoDB operations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{databaseApis.length}</p>
              <p className="text-muted-foreground text-sm">Available endpoints</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="blockchain" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="kyc">KYC</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          <TabsContent value="blockchain">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  Blockchain APIs
                </CardTitle>
                <CardDescription>
                  APIs for interacting with smart contracts on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockchainApis.map((api, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell>
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {api.endpoint}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                              api.method === 'POST' ? 'bg-green-100 text-green-800' :
                              api.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {api.method}
                            </Badge>
                          </TableCell>
                          <TableCell>{api.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              <span className="text-xs">{api.auth}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  KYC APIs
                </CardTitle>
                <CardDescription>
                  APIs for KYC verification and document management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {kycApis.map((api, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell>
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {api.endpoint}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                              api.method === 'POST' ? 'bg-green-100 text-green-800' :
                              api.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {api.method}
                            </Badge>
                          </TableCell>
                          <TableCell>{api.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              <span className="text-xs">{api.auth}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="mr-2 h-5 w-5" />
                  Loan APIs
                </CardTitle>
                <CardDescription>
                  APIs for loan management and processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApis.map((api, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell>
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {api.endpoint}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                              api.method === 'POST' ? 'bg-green-100 text-green-800' :
                              api.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {api.method}
                            </Badge>
                          </TableCell>
                          <TableCell>{api.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              <span className="text-xs">{api.auth}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Database APIs
                </CardTitle>
                <CardDescription>
                  APIs for MongoDB database operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {databaseApis.map((api, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell>
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {api.endpoint}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                              api.method === 'POST' ? 'bg-green-100 text-green-800' :
                              api.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {api.method}
                            </Badge>
                          </TableCell>
                          <TableCell>{api.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              <span className="text-xs">{api.auth}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ApiDirectory;
