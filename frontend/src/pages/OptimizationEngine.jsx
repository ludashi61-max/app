import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Lightbulb, AlertTriangle, TrendingUp, Home } from 'lucide-react';
import { calculateTotalCosts, calculateIncome, getRecommendations, DEFAULT_VALUES, DORM_OPTIONS } from '../utils/mockData';

const OptimizationEngine = () => {
  const [tuition, setTuition] = useState(DEFAULT_VALUES.tuitionPerYear);
  const [dormType, setDormType] = useState('shared');
  const [food, setFood] = useState(DEFAULT_VALUES.foodPerMonth);
  const [transport, setTransport] = useState(DEFAULT_VALUES.transportPerMonth);
  const [misc, setMisc] = useState(DEFAULT_VALUES.miscPerMonth);
  const [scholarshipPercentage, setScholarshipPercentage] = useState(0);
  const [wage, setWage] = useState(DEFAULT_VALUES.averageWagePerHour);
  const [workHours, setWorkHours] = useState(DEFAULT_VALUES.legalWorkHoursPerWeek);
  
  const expenses = useMemo(() => {
    const yearlyData = calculateTotalCosts({
      tuition,
      dormType,
      food,
      transport,
      misc,
      scholarshipPercentage: scholarshipPercentage / 100,
      inflation: 0.02
    });
    return yearlyData[0].total; // First year cost
  }, [tuition, dormType, food, transport, misc, scholarshipPercentage]);
  
  const income = useMemo(() => {
    return calculateIncome(wage, workHours, 0.1);
  }, [wage, workHours]);
  
  const recommendations = useMemo(() => {
    return getRecommendations(expenses, income.netYearlyIncome, scholarshipPercentage / 100);
  }, [expenses, income, scholarshipPercentage]);
  
  const deficit = expenses - income.netYearlyIncome;
  const hasDeficit = deficit > 0;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Optimization Logic & Recommendations</h1>
          <p className="text-lg text-gray-600">
            Rule-based decision engine that analyzes your financial situation and provides actionable, data-driven recommendations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Current Plan</CardTitle>
                <CardDescription>Input your expected expenses and income</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tuition-opt">Annual Tuition (¥)</Label>
                  <Input
                    id="tuition-opt"
                    type="number"
                    value={tuition}
                    onChange={(e) => setTuition(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Scholarship: {scholarshipPercentage}%</Label>
                  <Slider
                    value={[scholarshipPercentage]}
                    onValueChange={(value) => setScholarshipPercentage(value[0])}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Housing Type</Label>
                  <Select value={dormType} onValueChange={setDormType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DORM_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="food-opt">Food/Month (¥)</Label>
                  <Input
                    id="food-opt"
                    type="number"
                    value={food}
                    onChange={(e) => setFood(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="wage-opt">Hourly Wage (¥)</Label>
                  <Input
                    id="wage-opt"
                    type="number"
                    value={wage}
                    onChange={(e) => setWage(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Work Hours/Week: {workHours}</Label>
                  <Slider
                    value={[workHours]}
                    onValueChange={(value) => setWorkHours(value[0])}
                    max={28}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results & Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Annual Expenses</CardDescription>
                  <CardTitle className="text-3xl text-red-600">
                    ¥{expenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Annual Income (Net)</CardDescription>
                  <CardTitle className="text-3xl text-green-600">
                    ¥{income.netYearlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Financial Balance</CardDescription>
                  <CardTitle className={`text-3xl ${
                    hasDeficit ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {hasDeficit ? '-' : '+'}¥{Math.abs(deficit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            {hasDeficit && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Deficit Detected</AlertTitle>
                <AlertDescription>
                  Your annual expenses exceed income by ¥{deficit.toLocaleString()}. Review recommendations below.
                </AlertDescription>
              </Alert>
            )}
            
            {!hasDeficit && (
              <Alert className="border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Financial Surplus</AlertTitle>
                <AlertDescription className="text-green-800">
                  Your plan shows a positive balance. Consider saving the surplus for emergencies or future goals.
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Optimization Recommendations
                </CardTitle>
                <CardDescription>Rule-based analysis of your financial plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const severityColors = {
                      high: 'bg-red-50 border-red-200',
                      medium: 'bg-yellow-50 border-yellow-200',
                      low: 'bg-blue-50 border-blue-200',
                      positive: 'bg-green-50 border-green-200'
                    };
                    
                    const severityBadgeColors = {
                      high: 'destructive',
                      medium: 'default',
                      low: 'secondary',
                      positive: 'outline'
                    };
                    
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${severityColors[rec.severity]}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold capitalize">{rec.type}</h3>
                          <Badge variant={severityBadgeColors[rec.severity]}>
                            {rec.severity === 'positive' ? 'Good' : rec.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{rec.message}</p>
                        {rec.action && (
                          <p className="text-sm text-gray-600">
                            <strong>Action:</strong> {rec.action}
                          </p>
                        )}
                        {rec.savings && (
                          <p className="text-sm text-green-600">
                            <strong>Potential Savings:</strong> {rec.savings}
                          </p>
                        )}
                        {rec.potential && (
                          <p className="text-sm text-blue-600">
                            <strong>Potential:</strong> {rec.potential}
                          </p>
                        )}
                        {rec.target && (
                          <p className="text-sm text-gray-600">
                            <strong>Target:</strong> {rec.target}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Decision Logic Explained</CardTitle>
                <CardDescription>How recommendations are generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rule 1: Deficit Detection</h4>
                    <p className="font-mono text-xs mb-2">IF (Annual_Expenses - Annual_Income) {'>'} 0 THEN trigger_recommendations()</p>
                    <p>When expenses exceed income, the system analyzes all adjustable variables.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rule 2: Scholarship Priority</h4>
                    <p className="font-mono text-xs mb-2">IF scholarship {'<'} 50% AND deficit {'>'} 0 THEN recommend_scholarship_applications()</p>
                    <p>Scholarships have the highest impact-to-effort ratio for reducing costs.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rule 3: Housing Optimization</h4>
                    <p className="font-mono text-xs mb-2">IF housing_cost {'>'} minimum_option THEN calculate_savings(switch_to_shared)</p>
                    <p>Housing is a fixed monthly cost that can be reduced without compromising academics.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rule 4: Income Maximization</h4>
                    <p className="font-mono text-xs mb-2">IF work_hours {'<'} 28 OR vacation_utilization {'<'} 100% THEN suggest_increased_hours()</p>
                    <p>Legal work capacity should be maximized before cutting essential expenses.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Rule 5: Expense Reduction</h4>
                    <p className="font-mono text-xs mb-2">IF deficit persists THEN review_discretionary_spending(food, transport, misc)</p>
                    <p>Variable expenses can be optimized through lifestyle adjustments and budgeting.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationEngine;