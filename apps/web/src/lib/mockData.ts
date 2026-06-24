// Global Dashboard Mock Data

export const globalKpis = {
  portfolioValue: '$2.42',
  valueTrend: '+ 4.2%',
  annualizedRevenue: '$42.5',
  revenueTrend: '+ 8.1%',
  totalAssets: 142,
  occupancyRate: 96.2,
  collections: 98.0,
  riskIndex: 'LOW',
  esgScore: 'A-',
  capExRunway: '18'
};

export const topYieldAssets = [
  { id: 'nexus', name: 'Nexus Tower, NY', class: 'Class A Commercial', yield: 8.4, ytd: '+12M' },
  { id: 'azure', name: 'Azure Logistics Hub', class: 'Industrial', yield: 7.9, ytd: '+8.4M' },
  { id: 'vertex', name: 'Vertex Bio-Labs', class: 'Life Sciences', yield: 7.2, ytd: '+6.1M' }
];

export const revenueData = [
  { month: 'Jan', actual: 30, forecast: 25 },
  { month: 'Feb', actual: 40, forecast: 30 },
  { month: 'Mar', actual: 35, forecast: 30 },
  { month: 'Apr', actual: 38, forecast: 32 },
  { month: 'May', actual: 55, forecast: 45 },
  { month: 'Jun', actual: 58, forecast: 48 },
  { month: 'Jul', actual: 60, forecast: 50 },
  { month: 'Aug', actual: 65, forecast: 52 },
  { month: 'Sep', actual: 85, forecast: 55 },
  { month: 'Oct', actual: 0, forecast: 58 },
  { month: 'Nov', actual: 0, forecast: 60 },
  { month: 'Dec', actual: 0, forecast: 58 },
];

export const riskWatchlist = [
  { id: 'beacon', name: 'Beacon Retail Park', issue: 'Occupancy drop', metric: '-12%', level: 'danger' },
  { id: 'horizon', name: 'Project Horizon', issue: 'Budget Overrun', metric: '+4%', level: 'warning' }
];

export const heatmapData = [
  { id: 'na1', x: 25, y: 35, glow: 'brand-blue', size: 12 },
  { id: 'na2', x: 18, y: 40, glow: 'brand-blue', size: 8 }, 
  { id: 'eu1', x: 48, y: 30, glow: 'warning', size: 10 },   
  { id: 'me1', x: 58, y: 45, glow: 'success', size: 14 }    
];

export const dashboardInsights = {
  recommendations: [
    {
      id: 'rec1',
      title: 'Revenue Optimization',
      level: 'High Confidence',
      description: 'Data suggests a 4.5% premium can be applied to Q3 renewals in the West Coast commercial sector based on recent comparable lease velocities.',
      actionText: 'Execute Pricing Model ->',
      icon: 'blue-dot'
    },
    {
      id: 'rec2',
      title: 'Risk Mitigation: Climate',
      level: 'Medium Priority',
      description: 'Upcoming weather patterns indicate increased flood risk for 3 assets in the Southeast portfolio. Review insurance coverages.',
      actionText: 'View Affected Assets',
      icon: 'shield-alert'
    }
  ]
};

export const hierarchyData = [
  {
    id: 'global',
    name: 'Global Portfolio',
    type: 'root',
    children: [
      {
        id: 'na',
        name: 'North America',
        type: 'region',
        children: [
          {
            id: 'ny',
            name: 'New York',
            type: 'city',
            children: [
              {
                id: 'manhattan',
                name: 'Manhattan Campus',
                type: 'campus',
                health: 98,
                children: [
                  { id: 't-a', name: 'Tower A', type: 'building', status: 'nominal' },
                  { id: 't-b', name: 'Tower B', type: 'building', status: 'warning' },
                  { id: 't-c', name: 'Tower C', type: 'building', status: 'critical' },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// ---------------------------------------------------------
// CONSTRUCTION ERP PROJECT DATA
// ---------------------------------------------------------

export const projectInsights = [
  {
    id: 'pi1',
    title: 'Delay Prediction',
    type: 'danger',
    description: '5% risk due to weather patterns incoming next week.'
  },
  {
    id: 'pi2',
    title: 'Material Optimization',
    type: 'brand-blue',
    description: 'Cement procurement suggested in 48h to avoid spot market premium.'
  },
  {
    id: 'pi3',
    title: 'Safety Alert',
    type: 'warning',
    description: 'High wind speeds predicted for Tower Crane ops tomorrow afternoon.'
  }
];

export const projectActivities = [
  {
    id: 'act1',
    type: 'delivery',
    title: 'Material Delivery: Steel Rebars (12 tons) - Received',
    time: '10 mins ago',
    actor: 'Logistics Hub'
  },
  {
    id: 'act2',
    type: 'safety',
    title: 'Safety Audit Passed - Site B',
    time: '1 hr ago',
    actor: 'Compliance Team'
  },
  {
    id: 'act3',
    type: 'report',
    title: 'DPR Submitted by J. Miller',
    time: '3 hrs ago',
    actor: 'Operations'
  }
];

export const projectHealthData = [
  { week: 'W1', planned: 10, actual: 12 },
  { week: 'W2', planned: 20, actual: 21 },
  { week: 'W3', planned: 30, actual: 28 },
  { week: 'W4', planned: 45, actual: 44 },
  { week: 'W5', planned: 55, actual: 56 },
  { week: 'W6', planned: 65, actual: 68 },
];

// ---------------------------------------------------------
// FACILITIES ERP DATA
// ---------------------------------------------------------

export const facilityKpis = {
  health: '92%',
  openWos: '14',
  critical: '0',
  utilityEff: '94%',
  esgScore: '88/100'
};

export const facilityInsights = [
  {
    id: 'fi1',
    type: 'warning',
    label: 'PREDICTIVE ALERT',
    title: 'Asset ID: HX-402 showing vibration anomalies. Est. failure: 48h.',
    action: 'Create Work Order'
  },
  {
    id: 'fi2',
    type: 'brand-blue',
    label: 'ENERGY OPPORTUNITY',
    title: 'Optimize chiller load based on current ambient temp for est. 12% savings today.',
    action: 'Optimize Energy'
  },
  {
    id: 'fi3',
    type: 'success',
    label: 'ESG INSIGHT',
    title: 'Monthly carbon offset target exceeded by 4%. Ready for stakeholder reporting.',
    action: 'Generate ESG Report'
  }
];

// ---------------------------------------------------------
// RESIDENT PORTAL DATA
// ---------------------------------------------------------

export const residentUser = {
  name: 'Alexander',
  unit: 'Unit 4202, Skyline Tower A',
  status: 'Elite Member',
  score: 98
};

export const residentKpis = {
  outstandingDues: '$0.00',
  walletBalance: '$2,450',
  walletCashback: '+$50 cashback',
  expectedVisitors: '2',
  upcomingBookings: '1',
  qrCodeId: 'PH360-8842-A'
};

export const residentCopilot = {
  message: 'Good morning, Alexander. You have a package waiting at the reception. I also noticed the pool is relatively quiet if you wanted to book your usual lane.',
  actions: [
    'Book the pool for 4 PM',
    'Generate guest pass',
    'Show recent utility bill'
  ]
};

// ---------------------------------------------------------
// OWNER & INVESTOR WORKSPACE DATA
// ---------------------------------------------------------

export const ownerKpis = {
  totalValue: '$124,500,000',
  valueGrowth: '+12.4%',
  monthlyIncome: '$842,000',
  incomeGrowth: '2.1%',
  annualYield: '6.8%'
};

export const ownerSecondaryKpis = {
  occupancy: '94.2%',
  vacantUnits: '4',
  activeLeases: '142',
  expCollection: '$842k',
  avgCapRate: '5.2%'
};

export const ownerRevenueData = [
  { month: 'Jan', revenue: 600, forecast: 580 },
  { month: 'Feb', revenue: 700, forecast: 650 },
  { month: 'Mar', revenue: 650, forecast: 600 },
  { month: 'Apr', revenue: 800, forecast: 750 },
  { month: 'May', revenue: 842, forecast: 800 },
  { month: 'Jun', revenue: 0, forecast: 850 },
  { month: 'Jul', revenue: 0, forecast: 870 },
  { month: 'Aug', revenue: 0, forecast: 900 }
];

export const ownerLeaseData = [
  { name: 'Renewed (90d)', value: 68, color: '#4F84FF' },
  { name: 'Expiring (30d)', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 20, color: '#333333' }
];

export const ownerAssets = [
  { id: '1', name: 'Skyline Plaza', class: 'Commercial • NY', value: '$42.5M', yield: '7.1%', status: 'success' },
  { id: '2', name: 'Marina Heights', class: 'Multi-Family • FL', value: '$28.2M', yield: '6.4%', status: 'warning' },
  { id: '3', name: 'Apex Industrial', class: 'Industrial • TX', value: '$53.8M', yield: '6.9%', status: 'danger' }
];

export const ownerCopilotInsights = [
  {
    id: '1',
    type: 'warning',
    title: 'Yield Optimization Opportunity',
    description: 'Rent increase recommended for Marina Heights Unit 402 based on localized market comps (+4.2%).'
  },
  {
    id: '2',
    type: 'danger',
    title: 'Risk Alert',
    description: '12% of portfolio leases expire in Q3. Recommend initiating early renewal protocols for Apex Industrial.'
  }
];

// ---------------------------------------------------------
// PROCUREMENT COMMAND CENTER DATA
// ---------------------------------------------------------

export const procurementKpis = {
  activeVendors: '142',
  purchaseOrders: '84',
  inventoryValue: '$4.2M',
  openReqs: '12',
  whseCapacity: '78%',
  budgetConsumed: '62%'
};

export const procurementInventory = [
  {
    id: 'inv1',
    name: 'Commercial HVAC Units',
    sku: 'HVC-CM-X900',
    status: 'Optimal',
    stockLevel: '24 Units',
    valuation: '$144,000',
    progress: 75,
    color: 'success'
  },
  {
    id: 'inv2',
    name: 'Smart Lighting Hubs',
    sku: 'SLH-IOT-V2',
    status: 'Low Stock',
    stockLevel: '150 Units',
    valuation: '$12,500',
    progress: 25,
    color: 'amber-500'
  }
];

export const procurementActivity = [
  {
    id: 'act1',
    time: '10:42 AM - Today',
    title: 'PO #4928 Generated',
    details: 'Vendor: Apex Steel Corp. Amount: $45K',
    color: 'brand-blue'
  },
  {
    id: 'act2',
    time: '08:15 AM - Today',
    title: 'Material Shipped',
    details: 'Tracking: TRK-992-XYZ (In Transit)',
    color: 'success'
  },
  {
    id: 'act3',
    time: 'Yesterday',
    title: 'PR #1029 Approved',
    details: 'Approver: J. Smith (Facilities Head)',
    color: '#71717A'
  }
];

export const procurementCopilotInsights = [
  {
    id: '1',
    type: 'amber-500',
    icon: 'AlertTriangle',
    title: 'STOCKOUT PREDICTION',
    description: 'HVAC Filters (SKU: F-20x20) likely to stock out in 4 days across 3 properties based on seasonal consumption rates.',
    action: 'Create Emergency PR ->'
  },
  {
    id: '2',
    type: 'success',
    icon: 'Activity',
    title: 'COST SAVING OPP',
    description: "Consolidating outstanding orders with 'Lumin Lighting' could trigger a 5% volume discount, saving est. $1,200.",
    action: 'Analyze Vendors ->'
  }
];
