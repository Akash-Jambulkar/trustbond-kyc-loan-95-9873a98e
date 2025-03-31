
import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { BlockchainProvider } from './contexts/BlockchainContext';
import routes from './routes';
import './App.css';

// RouteComponent to render all the routes using useRoutes hook
const RouteComponent = () => {
  return useRoutes(routes);
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlockchainProvider>
          <RouteComponent />
          <Toaster position="top-right" />
        </BlockchainProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
