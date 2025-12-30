// Mock data for International Student Financial Optimizer

export const DEFAULT_VALUES = {
  tuitionPerYear: 1400000,
  livingCostPerMonth: 105000,
  dormCostPerMonth: {
    shared: 40000,
    single: 60000,
    private: 80000
  },
  transportPerMonth: 10000,
  foodPerMonth: 35000,
  miscPerMonth: 20000,
  averageWagePerHour: 1200,
  legalWorkHoursPerWeek: 28,
  vacationWorkHoursPerWeek: 40,
  taxRate: 0.10,
  inflationRate: 0.02
};

export const SCHOLARSHIP_LEVELS = [
  { value: 0, label: 'No Scholarship (0%)', percentage: 0 },
  { value: 30, label: 'Partial Scholarship (30%)', percentage: 0.30 },
  { value: 50, label: 'Half Scholarship (50%)', percentage: 0.50 },
  { value: 80, label: 'Merit Scholarship (80%)', percentage: 0.80 },
  { value: 100, label: 'Full Scholarship (100%)', percentage: 1.00 }
];

export const DORM_OPTIONS = [
  { value: 'shared', label: 'Shared Dorm', cost: 40000 },
  { value: 'single', label: 'Single Dorm', cost: 60000 },
  { value: 'private', label: 'Private Apartment', cost: 80000 }
];

// Calculate 4-year costs
export const calculateTotalCosts = (params) => {
  const {
    tuition,
    dormType,
    food,
    transport,
    misc,
    scholarshipPercentage,
    inflation
  } = params;

  const years = [];
  const dormCost = DEFAULT_VALUES.dormCostPerMonth[dormType];
  
  for (let year = 1; year <= 4; year++) {
    const inflationMultiplier = Math.pow(1 + inflation, year - 1);
    
    const yearlyTuition = tuition * inflationMultiplier;
    const scholarshipAmount = yearlyTuition * scholarshipPercentage;
    const netTuition = yearlyTuition - scholarshipAmount;
    
    const yearlyLiving = (dormCost + food + transport + misc) * 12 * inflationMultiplier;
    const totalCost = netTuition + yearlyLiving;
    
    years.push({
      year,
      tuition: yearlyTuition,
      scholarship: scholarshipAmount,
      netTuition,
      living: yearlyLiving,
      total: totalCost
    });
  }
  
  return years;
};

// Calculate part-time income
export const calculateIncome = (wage, workHours, taxRate) => {
  const weeksPerSemester = 32;
  const weeksVacation = 20;
  
  const semesterIncome = wage * workHours * weeksPerSemester;
  const vacationIncome = wage * DEFAULT_VALUES.vacationWorkHoursPerWeek * weeksVacation;
  
  const grossYearlyIncome = semesterIncome + vacationIncome;
  const taxAmount = grossYearlyIncome * taxRate;
  const netYearlyIncome = grossYearlyIncome - taxAmount;
  
  return {
    semesterIncome,
    vacationIncome,
    grossYearlyIncome,
    taxAmount,
    netYearlyIncome,
    monthlyAverage: netYearlyIncome / 12
  };
};

// Optimization recommendations
export const getRecommendations = (totalExpenses, totalIncome, scholarshipPercentage) => {
  const deficit = totalExpenses - totalIncome;
  const recommendations = [];
  
  if (deficit > 0) {
    recommendations.push({
      type: 'deficit',
      message: `Annual deficit detected: ¥${deficit.toLocaleString()}`,
      severity: 'high'
    });
    
    if (scholarshipPercentage < 0.5) {
      recommendations.push({
        type: 'scholarship',
        message: 'Apply for higher scholarship percentages (50%+ recommended)',
        action: 'Research MEXT and TIU scholarship programs',
        severity: 'high'
      });
    }
    
    recommendations.push({
      type: 'housing',
      message: 'Consider switching to shared dormitory to reduce costs',
      savings: '¥240,000 - ¥480,000 per year',
      severity: 'medium'
    });
    
    recommendations.push({
      type: 'work',
      message: 'Maximize legal work hours during vacation periods',
      potential: '¥960,000 per year at ¥1,200/hour',
      severity: 'medium'
    });
    
    recommendations.push({
      type: 'expenses',
      message: 'Review discretionary spending (food, transport, misc)',
      target: 'Reduce by 10-15% to improve cash flow',
      severity: 'low'
    });
  } else {
    recommendations.push({
      type: 'surplus',
      message: `Annual surplus: ¥${Math.abs(deficit).toLocaleString()}`,
      action: 'Consider saving for emergencies or further education',
      severity: 'positive'
    });
  }
  
  return recommendations;
};