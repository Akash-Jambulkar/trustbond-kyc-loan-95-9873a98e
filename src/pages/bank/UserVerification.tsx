import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, CheckCircle, Clock, FileText, ExternalLink } from 'lucide-react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { IKYCDocument } from '@/services/database/models/KYCDocuments';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const UserVerification: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingVerifications, setPendingVerifications] = useState<IKYCDocument[]>([]);
  const [verifiedDocuments, setVerifiedDocuments] = useState<IKYCDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<IKYCDocument | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const { getPendingKYCRequests, verifyUserKYC } = useBlockchain();
  
  useEffect(() => {
    fetchVerifications();
  }, []);
  
  const fetchVerifications = async () => {
    try {
      setIsLoading(true);
      
      const pendingDocs = await getPendingKYCRequests();
      
      const verifiedDocs = pendingDocs
        .filter(doc => doc.status === 'verified')
        .slice(0, 4);
      
      setPendingVerifications(pendingDocs.filter(doc => doc.status === 'pending'));
      setVerifiedDocuments(verifiedDocs);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast.error('Failed to load verification data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerify = async (approved: boolean) => {
    try {
      if (!selectedDocument) return;
      
      await verifyUserKYC(
        selectedDocument.walletAddress,
        selectedDocument._id,
        approved,
        approved ? '' : rejectionReason
      );
      
      setIsVerifyModalOpen(false);
      setRejectionReason('');
      fetchVerifications();
      
      toast.success(`Document ${approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify document');
    }
  };
  
  const openVerifyModal = (document: IKYCDocument) => {
    setSelectedDocument(document);
    setIsVerifyModalOpen(true);
  };
  
  const openViewModal = (document: IKYCDocument) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };
  
  const getTrustScoreClass = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  const renderTransactionHash = (hash: string) => {
    if (!hash || hash.startsWith('tx-')) {
      return <span className="text-xs text-muted-foreground">Pending blockchain confirmation</span>;
    }
    
    return (
      <a 
        href={`https://etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline flex items-center text-xs font-mono"
      >
        {hash.substring(0, 8)}...{hash.substring(hash.length - 6)}
        <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    );
  };
  
  const filteredPending = searchQuery
    ? pendingVerifications.filter(doc => 
        doc.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pendingVerifications;
    
  const filteredVerified = searchQuery
    ? verifiedDocuments.filter(doc => 
        doc.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : verifiedDocuments;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">User Verification</h1>
        <p className="text-muted-foreground">Verify users and view their trust scores</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingVerifications.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Documents</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedDocuments.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully verified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Trust Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {verifiedDocuments.length ? 85 : 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Among verified users
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by user address or document name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="pending">Pending Verifications</TabsTrigger>
            <TabsTrigger value="verified">Verified Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Verification Requests</CardTitle>
                <CardDescription>
                  Review user documents and KYC applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse flex space-x-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filteredPending.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-semibold">No pending documents</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? "No results match your search" : "All documents have been reviewed"}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Submitted Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPending.map((doc) => (
                        <TableRow key={doc._id}>
                          <TableCell className="font-mono text-xs">
                            {doc.walletAddress.substring(0, 6)}...{doc.walletAddress.substring(doc.walletAddress.length - 4)}
                          </TableCell>
                          <TableCell className="capitalize">{doc.documentType.replace('_', ' ')}</TableCell>
                          <TableCell>{doc.documentName}</TableCell>
                          <TableCell>{new Date(doc.submissionDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => openViewModal(doc)}>
                                View
                              </Button>
                              <Button size="sm" onClick={() => openVerifyModal(doc)}>Verify</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verified" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verified Documents</CardTitle>
                <CardDescription>
                  Documents that have completed verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse flex space-x-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filteredVerified.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-semibold">No verified documents</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? "No results match your search" : "No documents have been verified yet"}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Verified Date</TableHead>
                        <TableHead>Trust Score</TableHead>
                        <TableHead>Blockchain Hash</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVerified.map((doc) => (
                        <TableRow key={doc._id}>
                          <TableCell className="font-mono text-xs">
                            {doc.walletAddress.substring(0, 6)}...{doc.walletAddress.substring(doc.walletAddress.length - 4)}
                          </TableCell>
                          <TableCell className="capitalize">{doc.documentType.replace('_', ' ')}</TableCell>
                          <TableCell>{doc.verificationDate ? new Date(doc.verificationDate).toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell>
                            <Badge className={getTrustScoreClass(85)}>
                              85
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {doc.blockchainTxHash ? 
                              `${doc.blockchainTxHash.substring(0, 6)}...${doc.blockchainTxHash.substring(doc.blockchainTxHash.length - 4)}` : 
                              'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => openViewModal(doc)}>View</Button>
                              {doc.blockchainTxHash && (
                                <Button variant="ghost" size="sm" className="text-xs" onClick={() => 
                                  window.open(`https://etherscan.io/tx/${doc.blockchainTxHash}`, '_blank')
                                }>
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Explorer
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Document Details</DialogTitle>
              <DialogDescription>
                View the details of the selected document
              </DialogDescription>
            </DialogHeader>
            
            {selectedDocument && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-medium text-right">Document Type:</div>
                  <div className="col-span-2 capitalize">{selectedDocument.documentType.replace('_', ' ')}</div>
                  
                  <div className="col-span-1 font-medium text-right">Document Name:</div>
                  <div className="col-span-2">{selectedDocument.documentName}</div>
                  
                  <div className="col-span-1 font-medium text-right">Status:</div>
                  <div className="col-span-2 capitalize">{selectedDocument.status}</div>
                  
                  <div className="col-span-1 font-medium text-right">Submitted:</div>
                  <div className="col-span-2">{new Date(selectedDocument.submissionDate).toLocaleDateString()}</div>
                  
                  <div className="col-span-1 font-medium text-right">Document Hash:</div>
                  <div className="col-span-2 font-mono text-xs break-all">{selectedDocument.documentHash}</div>
                  
                  {selectedDocument.blockchainTxHash && (
                    <>
                      <div className="col-span-1 font-medium text-right">Transaction Hash:</div>
                      <div className="col-span-2 font-mono text-xs break-all">
                        {renderTransactionHash(selectedDocument.blockchainTxHash)}
                      </div>
                    </>
                  )}
                  
                  {selectedDocument.description && (
                    <>
                      <div className="col-span-1 font-medium text-right">Description:</div>
                      <div className="col-span-2">{selectedDocument.description}</div>
                    </>
                  )}
                </div>
                
                <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center h-48">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            )}
            
            <DialogFooter className="sm:justify-end">
              <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>Close</Button>
              
              {selectedDocument?.status === 'pending' && (
                <Button onClick={() => {
                  setIsViewModalOpen(false);
                  openVerifyModal(selectedDocument);
                }}>
                  Verify
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Document</DialogTitle>
              <DialogDescription>
                Approve or reject this document verification
              </DialogDescription>
            </DialogHeader>
            
            {selectedDocument && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1 font-medium text-right">Document:</div>
                  <div className="col-span-2">{selectedDocument.documentName}</div>
                  
                  <div className="col-span-1 font-medium text-right">Type:</div>
                  <div className="col-span-2 capitalize">{selectedDocument.documentType.replace('_', ' ')}</div>
                  
                  <div className="col-span-1 font-medium text-right">User:</div>
                  <div className="col-span-2 font-mono text-xs">
                    {selectedDocument.walletAddress.substring(0, 6)}...{selectedDocument.walletAddress.substring(selectedDocument.walletAddress.length - 4)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="rejection-reason" className="text-sm font-medium">
                    Rejection Reason (if rejected)
                  </label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Enter reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVerifyModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleVerify(false)}>
                Reject
              </Button>
              <Button variant="default" onClick={() => handleVerify(true)}>
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UserVerification;
