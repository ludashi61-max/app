import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SCHOLARSHIP_LEVELS, DEFAULT_VALUES, calculateTotalCosts } from '../utils/mockData';

const ScholarshipAnalyzer = () => {
  const [dormType] = useState('shared');
  
  // Calculate scenarios for all scholarship levels
  const scenarios = SCHOLARSHIP_LEVELS.map(level => {
    const yearlyData = calculateTotalCosts({
      tuition: DEFAULT_VALUES.tuitionPerYear,
      dormType,
      food: DEFAULT_VALUES.foodPerMonth,
      transport: DEFAULT_VALUES.transportPerMonth,
      misc: DEFAULT_VALUES.miscPerMonth,
      scholarshipPercentage: level.percentage,
      inflation: 0.02
    });
    
    const totalCost = yearlyData.reduce((sum, year) => sum + year.total, 0);
    const totalScholarship = yearlyData.reduce((sum, year) => sum + year.scholarship, 0);
    
    return {
      level: level.label,
      percentage: level.value,
      totalCost,
      totalScholarship,
      yearlyData
    };
  });
  
  // Data for comparison chart
  const comparisonData = scenarios.map(s => ({
    name: `${s.percentage}%`,
    'Total Cost': Math.round(s.totalCost),
    'Scholarship Savings': Math.round(s.totalScholarship)
  }));
  
  // Data for year-by-year impact
  const yearByYearData = [];
  for (let year = 1; year <= 4; year++) {
    const yearData = { year: `Year ${year}` };
    scenarios.forEach(s => {
      yearData[`${s.percentage}% Scholarship`] = Math.round(s.yearlyData[year - 1].total);
    });
    yearByYearData.push(yearData);
  }
  
  const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#8b5cf6'];
  
  return (
    <div className="min-h-screen page-bg py-12" style={{ backgroundImage: "url('/images/scholarship-fuji-sunrise.jpg')" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Scholarship Impact Analyzer</h1>
          <p className="text-lg text-white/90">
            Compare how different scholarship levels (30%, 50%, 80%, 100%) affect your total cost and monthly cash flow over 4 years.
          </p>
        </div>
        
        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="yearByYear">Year-by-Year</TabsTrigger>
            <TabsTrigger value="details">Detailed Scenarios</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Total 4-Year Cost Comparison</CardTitle>
                <CardDescription>How scholarships reduce your overall financial burden</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Total Cost" fill="#3b82f6" />
                    <Bar dataKey="Scholarship Savings" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-5 gap-4">
              {scenarios.map((scenario, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-xs">{scenario.level}</CardDescription>
                    <CardTitle className="text-2xl" style={{ color: COLORS[index] }}>
                      ¥{(scenario.totalCost / 1000000).toFixed(2)}M
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-600">Total 4-Year Cost</p>
                    {scenario.totalScholarship > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        Saves: ¥{(scenario.totalScholarship / 1000000).toFixed(2)}M
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="yearByYear" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Year-by-Year Cost Trends</CardTitle>
                <CardDescription>How costs evolve with inflation and scholarship coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={yearByYearData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                    {scenarios.map((s, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={`${s.percentage}% Scholarship`}
                        stroke={COLORS[index]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            {scenarios.map((scenario, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle style={{ color: COLORS[index] }}>{scenario.level}</CardTitle>
                  <CardDescription>
                    Total 4-Year Cost: ¥{scenario.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} |
                    Total Scholarship: ¥{scenario.totalScholarship.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </CardDescription>
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
                          <th className="text-right py-2">Monthly Avg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scenario.yearlyData.map((year) => (
                          <tr key={year.year} className="border-b">
                            <td className="py-2">Year {year.year}</td>
                            <td className="text-right">¥{year.tuition.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="text-right text-green-600">-¥{year.scholarship.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="text-right">¥{year.netTuition.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="text-right">¥{year.living.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="text-right font-semibold">¥{year.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="text-right">¥{(year.total / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="cashflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cash Flow Analysis</CardTitle>
                <CardDescription>Average monthly expenses under each scholarship scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenarios.map((scenario, index) => {
                    const monthlyAvg = scenario.totalCost / 48; // 4 years = 48 months
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold" style={{ color: COLORS[index] }}>{scenario.level}</h3>
                          <p className="text-sm text-gray-600">Average monthly expense</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">¥{monthlyAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          <p className="text-xs text-gray-500">per month</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900">30% Scholarship Impact</p>
                    <p className="text-blue-700">Reduces total cost by ¥{scenarios[1].totalScholarship.toLocaleString()} - significant but still requires substantial self-funding</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-900">50% Scholarship Impact</p>
                    <p className="text-green-700">Cuts tuition burden in half - makes education accessible with part-time work and modest savings</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-semibold text-purple-900">80% Scholarship Impact</p>
                    <p className="text-purple-700">Highly competitive merit scholarship - reduces costs to ¥{(scenarios[3].totalCost / 1000000).toFixed(1)}M total</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="font-semibold text-emerald-900">100% Scholarship Impact</p>
                    <p className="text-emerald-700">Full tuition coverage (MEXT-level) - only living expenses remain at ¥{(scenarios[4].totalCost / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScholarshipAnalyzer;