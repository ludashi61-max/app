import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, BookOpen, Brain, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: '4-Year Cost Estimator',
      description: 'Calculate comprehensive expenses including tuition, housing, and living costs with inflation adjustment'
    },
    {
      icon: TrendingUp,
      title: 'Income Simulator',
      description: 'Model part-time earnings within Japan\'s legal 28-hour weekly limit during academic semesters'
    },
    {
      icon: BookOpen,
      title: 'Scholarship Impact',
      description: 'Compare 30%, 50%, 80%, and 100% scholarship scenarios across 4 academic years'
    },
    {
      icon: Brain,
      title: 'Smart Recommendations',
      description: 'Rule-based optimization engine for housing, work hours, and budget adjustments'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            International Student Financial & Work-Life Optimizer for Japan
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Data-driven decision support for international students at Tokyo International University
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            A DSAI admissions project demonstrating applied problem-solving through financial modeling and constraint-based optimization
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/methodology">
              <Button size="lg" variant="outline">
                View Methodology
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
            <p className="text-lg text-gray-700 mb-4">
              International students in Japan face complex financial challenges: balancing tuition fees, living expenses, legal part-time work restrictions (28 hours/week), and scholarship opportunities while maintaining academic performance.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Without clear financial planning, students risk deficit situations, academic stress, or non-compliance with visa work regulations.
            </p>
            <p className="text-lg text-gray-700">
              This tool addresses that gap by providing transparent, data-driven financial projections and actionable recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who This Helps</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Prospective Students</h3>
                <p className="text-gray-600">Pre-enrollment financial planning and scholarship assessment</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Current Students</h3>
                <p className="text-gray-600">Ongoing budget optimization and work-hour planning</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Academic Advisors</h3>
                <p className="text-gray-600">Evidence-based financial counseling tool</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Optimize Your Financial Plan?</h2>
        <p className="text-lg text-gray-600 mb-8">Start with the cost calculator to see your 4-year projection</p>
        <Link to="/calculator">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;