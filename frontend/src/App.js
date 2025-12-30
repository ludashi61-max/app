import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CostCalculator from './pages/CostCalculator';
import IncomeSimulator from './pages/IncomeSimulator';
import ScholarshipAnalyzer from './pages/ScholarshipAnalyzer';
import Methodology from './pages/Methodology';
import OptimizationEngine from './pages/OptimizationEngine';
import FutureScope from './pages/FutureScope';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<CostCalculator />} />
          <Route path="/income" element={<IncomeSimulator />} />
          <Route path="/scholarship" element={<ScholarshipAnalyzer />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/optimization" element={<OptimizationEngine />} />
          <Route path="/future" element={<FutureScope />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;