
import React from 'react';
import PageLayout from '@/components/PageLayout';
import ApiCategorySummary from '@/components/resources/ApiCategorySummary';
import ApiTabs from '@/components/resources/ApiTabs';
import { apiCategories } from '@/data/apiDirectoryData';

const ApiDirectory: React.FC = () => {
  return (
    <PageLayout 
      title="API Directory"
      description="Complete reference of all available APIs for the TrustBond DeFi KYC & Loan Platform"
    >
      <div className="container mx-auto py-10 px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">API Directory</h1>
        <p className="text-muted-foreground mb-6">
          Complete reference of all available APIs for the TrustBond DeFi KYC & Loan Platform
        </p>

        <ApiCategorySummary categories={apiCategories} />
        <ApiTabs categories={apiCategories} />
      </div>
    </PageLayout>
  );
};

export default ApiDirectory;
