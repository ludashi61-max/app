import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CostCalculator from './pages/CostCalculator';
import IncomeSimulator from './pages/IncomeSimulator';
import ScholarshipAnalyzer from './pages/ScholarshipAnalyzer';
import Methodology from './pages/Methodology';
import OptimizationEngine from './pages/OptimizationEngine';
import FutureScope from './pages/FutureScope';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/future" element={<FutureScope />} />
            
            {/* Protected Routes */}
            <Route
              path="/calculator"
              element={
                <ProtectedRoute>
                  <CostCalculator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  <IncomeSimulator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scholarship"
              element={
                <ProtectedRoute>
                  <ScholarshipAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/optimization"
              element={
                <ProtectedRoute>
                  <OptimizationEngine />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ChatBot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;