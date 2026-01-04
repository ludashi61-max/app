import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { BookOpen, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const Methodology = () => {
  return (
    <div className="min-h-screen page-bg py-12" style={{ backgroundImage: "url('/images/methodology-zen-garden.jpg')" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Data & Methodology</h1>
          <p className="text-lg text-white/90">
            Transparent explanation of formulas, assumptions, data sources, and limitations underlying this financial optimizer.
          </p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Core Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Tuition & Fees</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Base annual tuition: ¥1,400,000 (TIU undergraduate estimate)</li>
                  <li>Does not include enrollment fees, lab fees, or insurance</li>
                  <li>Subject to annual inflation adjustment (default 2%)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Living Expenses</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Housing: ¥40,000 (shared dorm), ¥60,000 (single dorm), ¥80,000 (private apartment)</li>
                  <li>Food: ¥35,000/month (cooking at home, occasional dining out)</li>
                  <li>Transport: ¥10,000/month (commuter pass + occasional travel)</li>
                  <li>Miscellaneous: ¥20,000/month (utilities, mobile, entertainment, supplies)</li>
                  <li>Total base living cost: ¥105,000/month for shared housing</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Part-Time Work</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Legal limit: 28 hours/week during semester (Immigration Bureau of Japan)</li>
                  <li>Vacation limit: 40 hours/week during official breaks</li>
                  <li>Semester duration: 32 weeks (8 months)</li>
                  <li>Vacation duration: 20 weeks (5 months including summer/winter/spring breaks)</li>
                  <li>Average wage: ¥1,200/hour (typical for convenience stores, restaurants, tutoring)</li>
                  <li>Tax rate: 10% approximation (income tax + social insurance for low earners)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Scholarships</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Modeled as percentage reductions of tuition only (not living expenses)</li>
                  <li>30%: Entry-level merit or need-based scholarships</li>
                  <li>50%: Competitive academic scholarships</li>
                  <li>80%: High-merit scholarships</li>
                  <li>100%: Full tuition waiver (MEXT, institutional full rides)</li>
                  <li>Scholarship amounts increase with tuition inflation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Calculation Formulas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                <p className="font-semibold text-gray-900">Annual Cost (Year N):</p>
                <p>Tuition(N) = Base_Tuition × (1 + inflation)^(N-1)</p>
                <p>Scholarship(N) = Tuition(N) × scholarship_percentage</p>
                <p>Net_Tuition(N) = Tuition(N) - Scholarship(N)</p>
                <p>Living(N) = (Housing + Food + Transport + Misc) × 12 × (1 + inflation)^(N-1)</p>
                <p>Total_Cost(N) = Net_Tuition(N) + Living(N)</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                <p className="font-semibold text-gray-900">Annual Income:</p>
                <p>Semester_Income = wage × hours_per_week × 32 weeks</p>
                <p>Vacation_Income = wage × 40 hours × 20 weeks</p>
                <p>Gross_Income = Semester_Income + Vacation_Income</p>
                <p>Tax = Gross_Income × tax_rate</p>
                <p>Net_Income = Gross_Income - Tax</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                <p className="font-semibold text-gray-900">Financial Balance:</p>
                <p>Annual_Deficit = Total_Cost - Net_Income</p>
                <p>If Annual_Deficit {'>'} 0: Recommendations triggered</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Limitations & Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>Not Financial Advice:</strong> This tool provides estimates for academic demonstration purposes. Consult TIU's official financial aid office for actual costs.</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>Simplified Tax Model:</strong> Actual tax obligations depend on total income, deductions, residency status, and bilateral tax treaties.</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>Fixed Living Costs:</strong> Actual expenses vary by lifestyle, location within Tokyo, dietary preferences, and personal spending habits.</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>Work Availability:</strong> Part-time job availability fluctuates based on Japanese language proficiency, economic conditions, and competition.</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>Scholarship Eligibility:</strong> Actual scholarship awards depend on academic merit, financial need, nationality, and application timing.</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <p><strong>No Emergency Costs:</strong> Model does not include medical emergencies, travel home, visa renewals, or unexpected expenses.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Ethical Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Compliance First:</strong> All income calculations enforce Japanese visa regulations. The tool actively warns users when work hours exceed legal limits.
                </p>
                <p>
                  <strong>Transparency:</strong> All assumptions and formulas are publicly documented. Users can verify calculations and adjust inputs to match their situation.
                </p>
                <p>
                  <strong>Academic Integrity:</strong> This tool was created as a DSAI admissions project to demonstrate applied data science thinking, not as a commercial product.
                </p>
                <p>
                  <strong>Merit-Based:</strong> Scholarship scenarios are presented neutrally without encouraging unqualified applications. Students should apply based on eligibility criteria.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Methodology;