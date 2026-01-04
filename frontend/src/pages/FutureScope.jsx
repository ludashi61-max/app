import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Rocket, Brain, Database, Users, TrendingUp, Globe } from 'lucide-react';

const FutureScope = () => {
  const expansions = [
    {
      icon: Brain,
      title: 'Machine Learning Integration',
      status: 'Planned',
      description: 'Train predictive models on real student financial data to improve cost estimates and success predictions',
      features: [
        'Regression models for actual expense prediction based on demographic factors',
        'Classification models to predict scholarship eligibility',
        'Clustering to identify student financial profiles and risk groups',
        'Time-series forecasting for inflation and living cost trends'
      ]
    },
    {
      icon: Database,
      title: 'Real Student Data Collection',
      status: 'Research Phase',
      description: 'Gather anonymized financial data from current international students at TIU and partner universities',
      features: [
        'Survey-based data collection with privacy protection',
        'Track actual vs. estimated costs over 4-year periods',
        'Analyze regional variations (Tokyo vs. other cities)',
        'Identify common financial challenges and success patterns'
      ]
    },
    {
      icon: Users,
      title: 'Multi-University Support',
      status: 'Expansion Goal',
      description: 'Extend the tool to support international students at universities across Japan',
      features: [
        'University-specific tuition and scholarship databases',
        'Regional living cost adjustments (Tokyo, Osaka, Kyoto, Fukuoka)',
        'Program-specific cost variations (STEM, humanities, business)',
        'Peer comparison with anonymized student cohorts'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Advanced Financial Planning',
      status: 'Enhancement',
      description: 'Add sophisticated features for long-term financial health and academic success',
      features: [
        'Monte Carlo simulation for risk assessment',
        'Emergency fund recommendations',
        'Student loan analysis and repayment planning',
        'Academic performance vs. work hours correlation modeling'
      ]
    },
    {
      icon: Globe,
      title: 'International Expansion',
      status: 'Vision',
      description: 'Adapt the model for international students in other countries (South Korea, Singapore, USA, Europe)',
      features: [
        'Country-specific visa work regulations',
        'Currency conversion and exchange rate modeling',
        'Healthcare and insurance cost variations',
        'Cultural and lifestyle expense adjustments'
      ]
    },
    {
      icon: Rocket,
      title: 'Mobile Application',
      status: 'Development',
      description: 'Native iOS/Android apps for on-the-go financial tracking and real-time expense logging',
      features: [
        'Receipt scanning and automatic expense categorization',
        'Bank account integration for real expense tracking',
        'Push notifications for budget alerts',
        'Gamification for savings goals'
      ]
    }
  ];
  
  return (
    <div className="min-h-screen page-bg py-12" style={{ backgroundImage: "url('/images/future-torii-gate.jpg')" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Future Scope & Development Roadmap</h1>
          <p className="text-lg text-white/90">
            Planned expansions using machine learning, real student data, and multi-university support to transform this tool into a comprehensive financial platform.
          </p>
        </div>
        
        <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vision Statement</h2>
          <p className="text-gray-700 leading-relaxed">
            This project began as a DSAI admissions demonstration of applied problem-solving. The ultimate vision is to evolve it into a 
            <strong> production-ready financial planning platform</strong> that serves international students across Japan and eventually worldwide. 
            By integrating machine learning, real behavioral data, and advanced optimization algorithms, this tool could significantly reduce 
            financial stress, improve academic outcomes, and help thousands of students make informed decisions about their education journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {expansions.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <item.icon className="h-10 w-10 text-blue-600" />
                  <Badge variant={item.status === 'Planned' ? 'default' : 'outline'}>
                    {item.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Why Machine Learning?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700">
              <p>
                The current tool uses <strong>rule-based logic</strong> with fixed assumptions. While transparent and interpretable, 
                it cannot adapt to individual student circumstances or learn from real-world outcomes.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Machine Learning Applications:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Personalized Predictions:</strong> Train models on actual student data to predict expenses based on nationality, program, lifestyle, and language proficiency.</li>
                  <li>• <strong>Scholarship Success Modeling:</strong> Predict scholarship award probability based on GPA, test scores, essays, and demographic factors.</li>
                  <li>• <strong>Risk Assessment:</strong> Identify students at high risk of financial dropout and trigger early interventions.</li>
                  <li>• <strong>Optimization at Scale:</strong> Use reinforcement learning to find optimal work-study-expense balance for academic success.</li>
                  <li>• <strong>Natural Language Processing:</strong> Analyze scholarship application essays and provide improvement suggestions.</li>
                </ul>
              </div>
              
              <p>
                With sufficient training data, ML models could achieve <strong>{'>'} 85% accuracy</strong> in cost prediction and 
                <strong> {'>'} 75% accuracy</strong> in scholarship outcome prediction, far exceeding static calculators.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">From DSAI Project to Production Platform</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            This tool demonstrates that <strong>data science can solve real problems</strong> for international students. 
            With continued development, partnerships with universities, and access to real data, it could become an essential 
            resource for tens of thousands of students making life-changing educational decisions.
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="font-bold text-2xl text-blue-600">10,000+</div>
              <div>Potential Users (Year 1)</div>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="font-bold text-2xl text-blue-600">50+</div>
              <div>Partner Universities</div>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="font-bold text-2xl text-blue-600">¥1B+</div>
              <div>Student Savings (Projected)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureScope;