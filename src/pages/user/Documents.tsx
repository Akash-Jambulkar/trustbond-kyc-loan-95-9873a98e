
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, Download, Eye, FilePlus, Clock, Check, X, AlertCircle } from 'lucide-react';

const Documents: React.FC = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [modificationDialogOpen, setModificationDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Mock data for demonstration
  const documents = [
    { id: 1, name: "Passport", type: "Identity", status: "verified", lastUpdated: "2023-05-15", version: 1 },
    { id: 2, name: "Utility Bill", type: "Address", status: "pending", lastUpdated: "2023-05-20", version: 1 },
    { id: 3, name: "Bank Statement", type: "Financial", status: "rejected", lastUpdated: "2023-05-10", version: 2, reason: "Document too old (>3 months)" },
    { id: 4, name: "Income Proof", type: "Financial", status: "verified", lastUpdated: "2023-04-25", version: 1 },
  ];

  const documentHistory = [
    { id: 1, documentId: 1, version: 1, action: "Upload", timestamp: "2023-05-15 10:30 AM", status: "success" },
    { id: 2, documentId: 1, version: 1, action: "Verification", timestamp: "2023-05-15 02:45 PM", status: "approved" },
    { id: 3, documentId: 2, version: 1, action: "Upload", timestamp: "2023-05-20 11:15 AM", status: "success" },
    { id: 4, documentId: 3, version: 1, action: "Upload", timestamp: "2023-05-01 09:30 AM", status: "success" },
    { id: 5, documentId: 3, version: 1, action: "Verification", timestamp: "2023-05-02 03:20 PM", status: "rejected", reason: "Document too old (>3 months)" },
    { id: 6, documentId: 3, version: 2, action: "Upload", timestamp: "2023-05-10 09:30 AM", status: "success" },
    { id: 7, documentId: 4, version: 1, action: "Upload", timestamp: "2023-04-25 01:15 PM", status: "success" },
    { id: 8, documentId: 4, version: 1, action: "Verification", timestamp: "2023-04-26 11:45 AM", status: "approved" },
  ];

  const documentTypes = [
    { id: "identity", name: "Identity Document (Passport, ID Card)" },
    { id: "address", name: "Proof of Address (Utility Bill, Bank Statement)" },
    { id: "financial", name: "Financial Document (Bank Statement, Income Proof)" },
    { id: "other", name: "Other Document" }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Verified</span>;
      case 'pending':
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" /> Pending</span>;
      case 'rejected':
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800"><X className="mr-1 h-3 w-3" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const handleRequestModification = (document: any) => {
    setSelectedDocument(document);
    setModificationDialogOpen(true);
  };

  const handleUploadDocument = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle document upload would go here
    setUploadDialogOpen(false);
  };

  const handleRequestChange = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle modification request would go here
    setModificationDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">Manage your personal and financial documents</p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                Upload New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Upload a new document for KYC verification. Supported formats: PDF, JPG, PNG.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUploadDocument}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="document-name">Document Name</Label>
                    <Input id="document-name" placeholder="e.g., Passport, Utility Bill" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document-file">Document File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop a file here, or click to browse</p>
                      <Input id="document-file" type="file" className="hidden" />
                      <Button type="button" variant="outline" size="sm">Browse Files</Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document-notes">Additional Notes (Optional)</Label>
                    <Textarea id="document-notes" placeholder="Any additional information about the document" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Upload Document</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={modificationDialogOpen} onOpenChange={setModificationDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Document Modification</DialogTitle>
                <DialogDescription>
                  {selectedDocument && (
                    <>Request a change for document: <strong>{selectedDocument.name}</strong></>
                  )}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestChange}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="modification-reason">Reason for Modification</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="update">Document needs updating</SelectItem>
                        <SelectItem value="expired">Document expired</SelectItem>
                        <SelectItem value="wrong">Wrong document submitted</SelectItem>
                        <SelectItem value="quality">Poor quality document</SelectItem>
                        <SelectItem value="other">Other reason</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="modification-details">Additional Details</Label>
                    <Textarea id="modification-details" placeholder="Provide more information about your request" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setModificationDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="pending">Pending Verification</TabsTrigger>
            <TabsTrigger value="history">Document History</TabsTrigger>
          </TabsList>
          
          {/* All Documents Tab */}
          <TabsContent value="all" className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">{document.name}</TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>
                      {getStatusBadge(document.status)}
                      {document.status === "rejected" && document.reason && (
                        <div className="mt-1 flex items-start gap-1">
                          <AlertCircle className="h-3 w-3 text-red-500 mt-0.5" />
                          <span className="text-xs text-red-500">{document.reason}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{document.lastUpdated}</TableCell>
                    <TableCell>v{document.version}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRequestModification(document)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Request Change
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Pending Verification Tab */}
          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.filter(doc => doc.status === "pending").map((document) => (
                <Card key={document.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{document.name}</CardTitle>
                      {getStatusBadge(document.status)}
                    </div>
                    <CardDescription>
                      Type: {document.type} | Last Updated: {document.lastUpdated}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 bg-secondary rounded-md">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Verification in Progress</p>
                          <p className="text-xs text-blue-700">Your document is being reviewed by our verification team.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRequestModification(document)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Request Change
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {documents.filter(doc => doc.status === "pending").length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Pending Documents</h3>
                  <p className="text-muted-foreground">All your documents have been processed.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Document History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Activity Timeline</CardTitle>
                <CardDescription>
                  History of all document uploads and verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  <div className="space-y-6">
                    {documentHistory.map((event) => {
                      const document = documents.find(doc => doc.id === event.documentId);
                      return (
                        <div key={event.id} className="relative pl-10">
                          <div className="absolute left-0 top-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {event.action === "Upload" ? (
                              <Upload className="h-4 w-4 text-primary" />
                            ) : (
                              event.status === "approved" ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )
                            )}
                          </div>
                          <div className="bg-card border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium">
                                  {event.action} - {document?.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">Version: {event.version}</p>
                                {event.reason && (
                                  <p className="text-sm text-red-500">Reason: {event.reason}</p>
                                )}
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                                <span className={`inline-flex items-center rounded-full mt-1 px-2.5 py-0.5 text-xs font-medium ${
                                  event.status === "approved" ? "bg-green-100 text-green-800" :
                                  event.status === "rejected" ? "bg-red-100 text-red-800" :
                                  "bg-blue-100 text-blue-800"
                                }`}>
                                  {event.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
