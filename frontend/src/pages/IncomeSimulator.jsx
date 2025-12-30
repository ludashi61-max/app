import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DEFAULT_VALUES, calculateIncome } from '../utils/mockData';

const IncomeSimulator = () => {
  const [wage, setWage] = useState(DEFAULT_VALUES.averageWagePerHour);
  const [workHours, setWorkHours] = useState(DEFAULT_VALUES.legalWorkHoursPerWeek);
  const [taxRate, setTaxRate] = useState(DEFAULT_VALUES.taxRate);
  
  const incomeData = useMemo(() => {
    return calculateIncome(wage, workHours, taxRate);
  }, [wage, workHours, taxRate]);
  
  const isLegalLimit = workHours <= DEFAULT_VALUES.legalWorkHoursPerWeek;
  
  const pieData = [
    { name: 'Semester Income', value: incomeData.semesterIncome },
    { name: 'Vacation Income', value: incomeData.vacationIncome }
  ];
  
  const COLORS = ['#3b82f6', '#60a5fa'];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Part-Time Income Simulator</h1>
          <p className="text-lg text-gray-600">
            Model your potential earnings within Japan's legal work restrictions for international students on student visas.
          </p>
        </div>
        
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>Legal Limits:</strong> International students in Japan can work up to 28 hours per week during academic semesters and up to 40 hours per week during official vacation periods.
          </AlertDescription>
        </Alert>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="wage">Hourly Wage (¥)</Label>
                  <Input
                    id="wage"
                    type="number"
                    value={wage}
                    onChange={(e) => setWage(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: ¥1,000 - ¥1,500</p>
                </div>
                
                <div>
                  <Label>Weekly Hours (Semester): {workHours} hrs</Label>
                  <Slider
                    value={[workHours]}
                    onValueChange={(value) => setWorkHours(value[0])}
                    max={40}
                    step={1}
                    className="mt-2"
                  />
                  {!isLegalLimit && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Exceeds legal limit of 28 hours/week
                    </p>
                  )}
                  {isLegalLimit && workHours === 28 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Maximum legal semester hours
                    </p>
                  )}
                </div>
                
                <div>
                  <Label>Tax Rate: {(taxRate * 100).toFixed(1)}%</Label>
                  <Slider
                    value={[taxRate * 100]}
                    onValueChange={(value) => setTaxRate(value[0] / 100)}
                    max={20}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Approximate income tax and social insurance</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>• Semester: 32 weeks (8 months)</p>
                <p>• Vacation: 20 weeks (5 months)</p>
                <p>• Vacation limit: 40 hours/week</p>
                <p>• Tax includes income tax & insurance</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {!isLegalLimit && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> Working more than 28 hours per week during semester violates student visa regulations and may result in visa cancellation.
                </AlertDescription>
              </Alert>
            )}
            
            {isLegalLimit && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-900">
                  Your work hours comply with Japanese student visa regulations.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Gross Annual Income</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    ¥{incomeData.grossYearlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Net Annual Income</CardDescription>
                  <CardTitle className="text-3xl text-green-600">
                    ¥{incomeData.netYearlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Tax & Insurance</CardDescription>
                  <CardTitle className="text-3xl text-gray-900">
                    ¥{incomeData.taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Monthly Average (Net)</CardDescription>
                  <CardTitle className="text-3xl text-gray-900">
                    ¥{incomeData.monthlyAverage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Income Distribution</CardTitle>
                <CardDescription>Breakdown by academic period</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ¥${entry.value.toLocaleString()}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">Semester Income (32 weeks @ {workHours} hrs/week)</span>
                    <span className="font-semibold">¥{incomeData.semesterIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">Vacation Income (20 weeks @ 40 hrs/week)</span>
                    <span className="font-semibold">¥{incomeData.vacationIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">Gross Yearly Total</span>
                    <span className="font-semibold">¥{incomeData.grossYearlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700 text-red-600">Tax & Insurance ({(taxRate * 100).toFixed(1)}%)</span>
                    <span className="font-semibold text-red-600">-¥{incomeData.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-900 font-bold">Net Yearly Income</span>
                    <span className="font-bold text-green-600 text-xl">¥{incomeData.netYearlyIncome.toLocaleString()}</span>
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

export default IncomeSimulator;