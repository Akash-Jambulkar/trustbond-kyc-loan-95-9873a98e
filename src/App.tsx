
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import AppShell from "./components/AppShell";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Solution Pages
import IndividualsSolution from "./pages/solutions/Individuals";
import BanksSolution from "./pages/solutions/Banks";
import RegulatorsSolution from "./pages/solutions/Regulators";
import EnterpriseSolution from "./pages/solutions/Enterprise";

// Resource Pages
import Documentation from "./pages/resources/Documentation";
import Whitepaper from "./pages/resources/Whitepaper";
import ApiReference from "./pages/resources/ApiReference";
import Community from "./pages/resources/Community";

// Company Pages
import AboutUs from "./pages/company/AboutUs";
import Contact from "./pages/company/Contact";
import Privacy from "./pages/company/Privacy";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import KYCManagement from "./pages/admin/KYCManagement";
import UserManagement from "./pages/admin/UserManagement";
import BankManagement from "./pages/admin/BankManagement";
import TransactionMonitoring from "./pages/admin/TransactionMonitoring";

// Bank Pages
import BankDashboard from "./pages/bank/BankDashboard";
import UserVerification from "./pages/bank/UserVerification";
import LoanManagement from "./pages/bank/LoanManagement";
import Performance from "./pages/bank/Performance";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import KYCStatus from "./pages/user/KYCStatus";
import Documents from "./pages/user/Documents";
import Loans from "./pages/user/Loans";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BlockchainProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />

              {/* Solution Pages */}
              <Route path="/solutions/individuals" element={<IndividualsSolution />} />
              <Route path="/solutions/banks" element={<BanksSolution />} />
              <Route path="/solutions/regulators" element={<RegulatorsSolution />} />
              <Route path="/solutions/enterprise" element={<EnterpriseSolution />} />

              {/* Resource Pages */}
              <Route path="/resources/documentation" element={<Documentation />} />
              <Route path="/resources/whitepaper" element={<Whitepaper />} />
              <Route path="/resources/api-reference" element={<ApiReference />} />
              <Route path="/resources/community" element={<Community />} />

              {/* Company Pages */}
              <Route path="/company/about" element={<AboutUs />} />
              <Route path="/company/contact" element={<Contact />} />
              <Route path="/company/privacy" element={<Privacy />} />

              {/* Authentication Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AppShell requiredRole="admin" />}>
                <Route index element={<AdminDashboard />} />
                <Route path="kyc" element={<KYCManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="banks" element={<BankManagement />} />
                <Route path="transactions" element={<TransactionMonitoring />} />
              </Route>

              {/* Bank Routes */}
              <Route path="/bank" element={<AppShell requiredRole="bank" />}>
                <Route index element={<BankDashboard />} />
                <Route path="verification" element={<UserVerification />} />
                <Route path="loans" element={<LoanManagement />} />
                <Route path="performance" element={<Performance />} />
              </Route>

              {/* User Routes */}
              <Route path="/user" element={<AppShell requiredRole="user" />}>
                <Route index element={<UserDashboard />} />
                <Route path="kyc" element={<KYCStatus />} />
                <Route path="documents" element={<Documents />} />
                <Route path="loans" element={<Loans />} />
              </Route>

              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BlockchainProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
