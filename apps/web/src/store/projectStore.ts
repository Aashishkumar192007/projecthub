import { create } from 'zustand';

export type ProjectStatus = 'Active' | 'Delayed' | 'Completed' | 'Upcoming' | 'High Risk';

export interface Escalation {
  id: string;
  title: string;
  severity: 'Critical' | 'Warning';
  metric: string; // e.g., '11 Days', '₹ 2.1 Cr'
  reason: string;
  type: 'Delay' | 'Budget' | 'Quality' | 'Safety';
}

export interface ConstructionProject {
  id: string;
  name: string;
  developer: string;
  location: string;
  status: ProjectStatus;
  completionPercentage: number;
  budgetUtilization: number;
  healthScore: number;
  
  // Resources
  resources: {
    labor: number;
    equipment: number;
    contractors: number;
    vendors: number;
  };
  
  // Copilot Metrics
  delayProbability: number;
  budgetRisk: number;
  qualityRisk: number;
  safetyRisk: number;
  
  escalations: Escalation[];
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  stage: 'Land Acquisition' | 'Planning' | 'Approvals' | 'Construction' | 'Finishing' | 'QA/QC' | 'Handover';
  status: 'Completed' | 'Active' | 'Delayed' | 'Pending';
  date: string;
}

export interface ProjectEvent {
  id: string;
  projectId: string;
  time: string;
  message: string;
  type: 'DPR' | 'Safety' | 'Procurement' | 'Snag';
}

interface ProjectState {
  projects: ConstructionProject[];
  milestones: ProjectMilestone[];
  events: ProjectEvent[];
  activeProjectId: string | null;
  
  setActiveProject: (id: string) => void;
}

const mockProjects: ConstructionProject[] = [
  {
    id: 'prj-001',
    name: 'Millennium Tower Phase 2',
    developer: 'PropertyHub DevCo',
    location: 'West Region, Financial District',
    status: 'Active',
    completionPercentage: 68,
    budgetUtilization: 72,
    healthScore: 85,
    resources: { labor: 412, equipment: 38, contractors: 17, vendors: 62 },
    delayProbability: 15,
    budgetRisk: 22,
    qualityRisk: 8,
    safetyRisk: 5,
    escalations: [
      { id: 'esc-1', title: 'Tower B Delay Risk', severity: 'Critical', metric: '11 Days', reason: 'Procurement Lag', type: 'Delay' },
      { id: 'esc-2', title: 'Budget Overrun', severity: 'Critical', metric: '₹ 2.1 Cr', reason: 'Concrete Consumption', type: 'Budget' }
    ]
  },
  {
    id: 'prj-002',
    name: 'Sunset Heights Residential',
    developer: 'Acme Builders',
    location: 'North Region',
    status: 'High Risk',
    completionPercentage: 35,
    budgetUtilization: 45,
    healthScore: 42,
    resources: { labor: 150, equipment: 12, contractors: 5, vendors: 20 },
    delayProbability: 85,
    budgetRisk: 90,
    qualityRisk: 40,
    safetyRisk: 15,
    escalations: [
      { id: 'esc-3', title: 'Foundation Delay', severity: 'Critical', metric: '25 Days', reason: 'Weather Conditions', type: 'Delay' }
    ]
  },
  {
    id: 'prj-003',
    name: 'Tech Park Alpha',
    developer: 'PropertyHub DevCo',
    location: 'South Region',
    status: 'Completed',
    completionPercentage: 100,
    budgetUtilization: 98,
    healthScore: 95,
    resources: { labor: 45, equipment: 5, contractors: 3, vendors: 15 },
    delayProbability: 0,
    budgetRisk: 0,
    qualityRisk: 0,
    safetyRisk: 0,
    escalations: []
  }
];

const mockMilestones: ProjectMilestone[] = [
  { id: 'm-1', projectId: 'prj-001', stage: 'Land Acquisition', status: 'Completed', date: 'Jan 2024' },
  { id: 'm-2', projectId: 'prj-001', stage: 'Planning', status: 'Completed', date: 'Mar 2024' },
  { id: 'm-3', projectId: 'prj-001', stage: 'Approvals', status: 'Completed', date: 'Jun 2024' },
  { id: 'm-4', projectId: 'prj-001', stage: 'Construction', status: 'Active', date: 'Ongoing' },
  { id: 'm-5', projectId: 'prj-001', stage: 'Finishing', status: 'Delayed', date: 'Expected Nov 2025' },
  { id: 'm-6', projectId: 'prj-001', stage: 'QA/QC', status: 'Pending', date: 'TBD' },
  { id: 'm-7', projectId: 'prj-001', stage: 'Handover', status: 'Pending', date: 'TBD' },
];

const mockEvents: ProjectEvent[] = [
  { id: 'ev-1', projectId: 'prj-001', time: '09:14', message: 'DPR Submitted by Site Eng.', type: 'DPR' },
  { id: 'ev-2', projectId: 'prj-001', time: '09:22', message: 'Safety Audit Completed (Score: 98%)', type: 'Safety' },
  { id: 'ev-3', projectId: 'prj-001', time: '09:37', message: 'Purchase Order #4422 Approved', type: 'Procurement' },
  { id: 'ev-4', projectId: 'prj-001', time: '09:55', message: 'Snag #1105 Closed', type: 'Snag' },
];

export const useProjectStore = create<ProjectState>((set) => ({
  projects: mockProjects,
  milestones: mockMilestones,
  events: mockEvents,
  activeProjectId: null,
  
  setActiveProject: (id) => set({ activeProjectId: id }),
}));
