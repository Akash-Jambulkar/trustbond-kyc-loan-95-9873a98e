
import React, { useState, useEffect } from 'react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, AlertCircle, User, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { connectDB, isConnected } from '@/services/database/mongoConnection';
import { getUserDocuments } from '@/services/database/kycService';

const RealTimeUserStatus: React.FC = () => {
  const { 
    isConnected: isWalletConnected, 
    account, 
    userRole
  } = useBlockchain();
  
  const [isLoading, setIsLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<string>('not_submitted');
  const [documentsSubmitted, setDocumentsSubmitted] = useState(0);
  const [documentsRequired, setDocumentsRequired] = useState(3); // Default required docs
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [isDbConnected, setIsDbConnected] = useState(false);
  
  useEffect(() => {
    const checkDbConnection = async () => {
      const connected = await connectDB();
      setIsDbConnected(connected);
    };
    
    checkDbConnection();
  }, []);
  
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!isWalletConnected || !account) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Check MongoDB connection
        if (!isConnected()) {
          await connectDB();
        }
        
        // Get user documents from database
        const documents = await getUserDocuments(account);
        
        // Update documents count
        setDocumentsSubmitted(documents.length);
        
        // Determine KYC status based on documents
        if (documents.length === 0) {
          setKycStatus('not_submitted');
        } else {
          const verifiedDocs = documents.filter(doc => doc.status === 'verified');
          const rejectedDocs = documents.filter(doc => doc.status === 'rejected');
          
          if (verifiedDocs.length === documentsRequired) {
            setKycStatus('verified');
            // Mock trust score - in a real app, this would come from the blockchain
            setTrustScore(85);
          } else if (rejectedDocs.length > 0) {
            setKycStatus('rejected');
          } else {
            setKycStatus('pending');
          }
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
        setKycStatus('error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserStatus();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchUserStatus, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [isWalletConnected, account]);
  
  const getKycStatusDetails = () => {
    switch (kycStatus) {
      case 'verified':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: 'Verified',
          color: 'bg-green-100 text-green-800 border-green-200',
          description: 'Your KYC has been verified and approved'
        };
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          description: 'Your KYC is pending verification'
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          label: 'Rejected',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'Your KYC has been rejected. Please resubmit.'
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          label: 'Error',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'There was an error fetching your KYC status'
        };
      default:
        return {
          icon: <FileText className="h-5 w-5 text-gray-500" />,
          label: 'Not Submitted',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'You have not submitted your KYC documents yet'
        };
    }
  };
  
  const statusDetails = getKycStatusDetails();
  const completionPercentage = Math.round((documentsSubmitted / documentsRequired) * 100);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">User Status</CardTitle>
        <CardDescription>Real-time KYC and document status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : !isWalletConnected ? (
          <div className="text-center py-6">
            <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium">Not Connected</h3>
            <p className="text-sm text-muted-foreground">
              Connect your wallet to view your status
            </p>
          </div>
        ) : (
          <>
            {/* Database Connection Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              {isDbConnected ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                  <XCircle className="h-3 w-3 mr-1" />
                  Disconnected
                </Badge>
              )}
            </div>
            
            {/* User Role */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge variant="secondary" className="capitalize">
                {userRole || 'guest'}
              </Badge>
            </div>
            
            {/* KYC Status */}
            <div className="mt-4 p-3 rounded-md flex items-start gap-3" 
              style={{ backgroundColor: statusDetails.color.split(' ')[0], color: statusDetails.color.split(' ')[1] }}>
              {statusDetails.icon}
              <div>
                <h4 className="font-medium">{statusDetails.label}</h4>
                <p className="text-sm">{statusDetails.description}</p>
              </div>
            </div>
            
            {/* Document Progress */}
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Documents Submitted</span>
                <span className="font-medium">{documentsSubmitted} of {documentsRequired}</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            {/* Trust Score */}
            {trustScore !== null && (
              <div className="mt-4 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Trust Score</span>
                  <span className="font-bold text-lg">{trustScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${trustScore}%`,
                      backgroundColor: trustScore > 80 ? '#22c55e' : 
                                       trustScore > 60 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeUserStatus;
