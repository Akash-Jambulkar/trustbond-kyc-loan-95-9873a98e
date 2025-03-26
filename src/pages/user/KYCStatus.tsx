
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CheckCircle, Clock, AlertCircle, Upload, Shield, User } from 'lucide-react';
import { useBlockchain } from '@/contexts/BlockchainContext';

type KYCStatus = 'pending' | 'verified' | 'rejected';

const KYCStatus: React.FC = () => {
  const { account } = useBlockchain();
  const [kycStatus, setKycStatus] = useState<KYCStatus>('pending');
  const [submittedDate, setSubmittedDate] = useState<string>("2023-07-15");
  const [trustScore, setTrustScore] = useState<number>(0);
  const [verificationProgress, setVerificationProgress] = useState<number>(30);
  
  // This would be connected to blockchain data in a real app
  useEffect(() => {
    // Mock data loading
    const timer = setTimeout(() => {
      // You would get this from blockchain
      setVerificationProgress(65);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: KYCStatus) => {
    if (status === "verified") {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      );
    } else if (status === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    }
  };

  const documents = [
    { type: "Government ID", status: "verified", submittedDate: "2023-07-15", verifiedDate: "2023-07-16" },
    { type: "Proof of Address", status: "verified", submittedDate: "2023-07-15", verifiedDate: "2023-07-17" },
    { type: "Selfie Verification", status: "pending", submittedDate: "2023-07-15", verifiedDate: null },
  ];

  const verificationSteps = [
    { id: 1, name: "Register Account", completed: true },
    { id: 2, name: "Connect Wallet", completed: true },
    { id: 3, name: "Upload Documents", completed: true },
    { id: 4, name: "KYC Verification", completed: kycStatus === "verified" },
    { id: 5, name: "Trust Score Assigned", completed: kycStatus === "verified" && trustScore > 0 },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">KYC Status</h1>
        <p className="text-muted-foreground">Monitor your verification status and trust score</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold capitalize">{kycStatus}</div>
                {getStatusBadge(kycStatus)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Submitted on {submittedDate}
              </p>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Verification Progress</span>
                  <span>{verificationProgress}%</span>
                </div>
                <Progress value={verificationProgress} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kycStatus === "verified" ? trustScore : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {kycStatus === "verified" 
                  ? "Your decentralized trust rating" 
                  : "Complete verification to receive your score"}
              </p>
              {kycStatus === "verified" && (
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Trust Level</span>
                    <span>{trustScore >= 80 ? "High" : trustScore >= 60 ? "Medium" : "Low"}</span>
                  </div>
                  <Progress value={trustScore} className={
                    trustScore >= 80 ? "bg-green-100" : 
                    trustScore >= 60 ? "bg-yellow-100" : 
                    "bg-red-100"
                  } />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Document Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Documents submitted
              </p>
              <div className="mt-4 space-y-1">
                <div className="text-xs flex justify-between">
                  <span>Verified</span>
                  <span>{documents.filter(doc => doc.status === "verified").length} of {documents.length}</span>
                </div>
                <Progress value={
                  (documents.filter(doc => doc.status === "verified").length / documents.length) * 100
                } />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="documents">Submitted Documents</TabsTrigger>
            <TabsTrigger value="steps">Verification Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
                <CardDescription>
                  Status of your submitted verification documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Verified Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{doc.type}</TableCell>
                        <TableCell>
                          {doc.status === "verified" ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          ) : doc.status === "rejected" ? (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Rejected
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{doc.submittedDate}</TableCell>
                        <TableCell>{doc.verifiedDate || "Pending"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                          {doc.status !== "verified" && (
                            <Button variant="outline" size="sm" className="ml-2">
                              <Upload className="mr-1 h-3 w-3" />
                              Reupload
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Additional Document
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="steps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Process</CardTitle>
                <CardDescription>
                  Track your progress through the KYC verification steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {verificationSteps.map((step) => (
                    <div key={step.id} className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        step.completed ? 'bg-green-100' : 'bg-muted'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-base font-medium">{step.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.completed ? (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              In Progress
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default KYCStatus;
