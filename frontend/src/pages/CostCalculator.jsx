import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DEFAULT_VALUES, DORM_OPTIONS, calculateTotalCosts } from '../utils/mockData';

const CostCalculator = () => {
  const [tuition, setTuition] = useState(DEFAULT_VALUES.tuitionPerYear);
  const [dormType, setDormType] = useState('shared');
  const [food, setFood] = useState(DEFAULT_VALUES.foodPerMonth);
  const [transport, setTransport] = useState(DEFAULT_VALUES.transportPerMonth);
  const [misc, setMisc] = useState(DEFAULT_VALUES.miscPerMonth);
  const [scholarshipPercentage, setScholarshipPercentage] = useState(0);
  const [inflation, setInflation] = useState(0.02);
  
  const yearlyData = useMemo(() => {
    return calculateTotalCosts({
      tuition,
      dormType,
      food,
      transport,
      misc,
      scholarshipPercentage: scholarshipPercentage / 100,
      inflation
    });
  }, [tuition, dormType, food, transport, misc, scholarshipPercentage, inflation]);
  
  const totalCost = yearlyData.reduce((sum, year) => sum + year.total, 0);
  const totalScholarship = yearlyData.reduce((sum, year) => sum + year.scholarship, 0);
  
  const chartData = yearlyData.map(year => ({
    name: `Year ${year.year}`,
    Tuition: Math.round(year.netTuition),
    Living: Math.round(year.living)
  }));
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">4-Year Cost Calculator</h1>
          <p className="text-lg text-gray-600">
            Estimate your total expenses over 4 years at Tokyo International University with realistic cost assumptions and inflation adjustments.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tuition & Scholarship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tuition">Annual Tuition (¥)</Label>
                  <Input
                    id="tuition"
                    type="number"
                    value={tuition}
                    onChange={(e) => setTuition(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Scholarship Coverage: {scholarshipPercentage}%</Label>
                  <Slider
                    value={[scholarshipPercentage]}
                    onValueChange={(value) => setScholarshipPercentage(value[0])}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Living Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Housing Type</Label>
                  <Select value={dormType} onValueChange={setDormType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DORM_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} (¥{option.cost.toLocaleString()}/month)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="food">Food per Month (¥)</Label>
                  <Input
                    id="food"
                    type="number"
                    value={food}
                    onChange={(e) => setFood(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="transport">Transport per Month (¥)</Label>
                  <Input
                    id="transport"
                    type="number"
                    value={transport}
                    onChange={(e) => setTransport(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="misc">Miscellaneous per Month (¥)</Label>
                  <Input
                    id="misc"
                    type="number"
                    value={misc}
                    onChange={(e) => setMisc(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Annual Inflation Rate: {(inflation * 100).toFixed(1)}%</Label>
                  <Slider
                    value={[inflation * 100]}
                    onValueChange={(value) => setInflation(value[0] / 100)}
                    max={5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total 4-Year Cost</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    ¥{totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Scholarship Savings</CardDescription>
                  <CardTitle className="text-3xl text-green-600">
                    ¥{totalScholarship.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Average per Year</CardDescription>
                  <CardTitle className="text-3xl text-gray-900">
                    ¥{(totalCost / 4).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Year-by-Year Breakdown</CardTitle>
                <CardDescription>Costs adjusted for {(inflation * 100).toFixed(1)}% annual inflation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Tuition" fill="#3b82f6" />
                    <Bar dataKey="Living" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detailed Annual Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Year</th>
                        <th className="text-right py-2">Tuition</th>
                        <th className="text-right py-2">Scholarship</th>
                        <th className="text-right py-2">Net Tuition</th>
                        <th className="text-right py-2">Living</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyData.map((year) => (
                        <tr key={year.year} className="border-b">
                          <td className="py-2">Year {year.year}</td>
                          <td className="text-right">¥{year.tuition.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="text-right text-green-600">-¥{year.scholarship.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="text-right">¥{year.netTuition.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="text-right">¥{year.living.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          <td className="text-right font-semibold">¥{year.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;