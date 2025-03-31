import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useBlockchain } from './contexts/BlockchainContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { BlockchainProvider } from './contexts/BlockchainContext';
import LandingPage from './pages/LandingPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AboutUs from './pages/company/AboutUs';
import Contact from './pages/company/Contact';
import Privacy from './pages/company/Privacy';
import Individuals from './pages/solutions/Individuals';
import Banks from './pages/solutions/Banks';
import Enterprise from './pages/solutions/Enterprise';
import Regulators from './pages/solutions/Regulators';
import Documentation from './pages/resources/Documentation';
import Community from './pages/resources/Community';
import Whitepaper from './pages/resources/Whitepaper';
import ApiReference from './pages/resources/ApiReference';
import ApiDirectory from './pages/resources/ApiDirectory';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/user/UserDashboard';
import Documents from './pages/user/Documents';
import Loans from './pages/user/Loans';
import KYCStatus from './pages/user/KYCStatus';
import BankDashboard from './pages/bank/BankDashboard';
import LoanManagement from './pages/bank/LoanManagement';
import UserVerification from './pages/bank/UserVerification';
import Performance from './pages/bank/Performance';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import BankManagement from './pages/admin/BankManagement';
import KYCManagement from './pages/admin/KYCManagement';
import TransactionMonitoring from './pages/admin/TransactionMonitoring';
import DashboardAnalytics from './pages/DashboardAnalytics';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlockchainProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/index" element={<Index />} />
            <Route path="/company/about" element={<AboutUs />} />
            <Route path="/company/contact" element={<Contact />} />
            <Route path="/company/privacy" element={<Privacy />} />
            <Route path="/solutions/individuals" element={<Individuals />} />
            <Route path="/solutions/banks" element={<Banks />} />
            <Route path="/solutions/enterprise" element={<Enterprise />} />
            <Route path="/solutions/regulators" element={<Regulators />} />
            <Route path="/resources/documentation" element={<Documentation />} />
            <Route path="/resources/community" element={<Community />} />
            <Route path="/resources/whitepaper" element={<Whitepaper />} />
            <Route path="/resources/api" element={<ApiReference />} />
            <Route path="/resources/api-directory" element={<ApiDirectory />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/documents" element={<Documents />} />
            <Route path="/user/loans" element={<Loans />} />
            <Route path="/user/kyc-status" element={<KYCStatus />} />
            <Route path="/bank/dashboard" element={<BankDashboard />} />
            <Route path="/bank/loan-management" element={<LoanManagement />} />
            <Route path="/bank/user-verification" element={<UserVerification />} />
            <Route path="/bank/performance" element={<Performance />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/bank-management" element={<BankManagement />} />
            <Route path="/admin/kyc-management" element={<KYCManagement />} />
            <Route path="/admin/transaction-monitoring" element={<TransactionMonitoring />} />
            <Route path="/analytics" element={<DashboardAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </BlockchainProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
