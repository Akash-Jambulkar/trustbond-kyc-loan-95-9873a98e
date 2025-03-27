
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'
import { Toaster as SonnerToaster } from 'sonner'
import { Buffer } from 'buffer'

// Polyfill Buffer for ethers.js
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <SonnerToaster position="top-right" richColors />
  </React.StrictMode>,
)
