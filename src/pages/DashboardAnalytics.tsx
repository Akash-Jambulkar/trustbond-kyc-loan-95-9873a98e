
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import BlockchainStatsVisualizer from '../components/BlockchainStatsVisualizer';
import TrustScoreGauge from '../components/TrustScoreGauge';
import LoanActivityChart from '../components/LoanActivityChart';
import RealTimeBlockchainStatus from '../components/RealTimeBlockchainStatus';
import RealTimeUserStatus from '../components/RealTimeUserStatus';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, FileCheck, UserCheck, Database, ChartBarIcon, Layers } from 'lucide-react';

const DashboardAnalytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Real-Time Analytics</h1>
        <p className="text-muted-foreground">Monitor blockchain activity, KYC verification, and loan status in real-time</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <BlockchainStatsVisualizer />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <RealTimeBlockchainStatus />
            <RealTimeUserStatus />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrustScoreGauge 
            score={78} 
            status="verified" 
            title="Your Trust Score" 
            description="Based on verification level and transaction history"
            size="lg"
          />
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Trust Factors</CardTitle>
              <CardDescription>Components contributing to your trust score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">KYC Verification</span>
                    <span className="text-sm">90/100</span>
                  </div>
                  <TrustScoreGauge score={90} showIcon={false} size="sm" title="" description="" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Transaction History</span>
                    <span className="text-sm">75/100</span>
                  </div>
                  <TrustScoreGauge score={75} showIcon={false} size="sm" title="" description="" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Loan Repayment</span>
                    <span className="text-sm">85/100</span>
                  </div>
                  <TrustScoreGauge score={85} showIcon={false} size="sm" title="" description="" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Document Quality</span>
                    <span className="text-sm">65/100</span>
                  </div>
                  <TrustScoreGauge score={65} showIcon={false} size="sm" title="" description="" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full">
          <LoanActivityChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytics;
