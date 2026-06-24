'use client';

function GenericMockTab({ title, type }: { title: string, type: string }) {
  return (
    <div className="p-8 h-[500px] flex items-center justify-center">
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 relative overflow-hidden h-64 w-full flex flex-col items-center justify-center group">
        <div className="absolute inset-0 bg-[#161616] pointer-events-none opacity-50"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            This module integrates directly with the Enterprise {type} microservice architecture. 
            UI visualization implementation is scheduled for Phase 3 rollout.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#71717A] animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#3F3F46] animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BoqTab() { return <GenericMockTab title="Bill of Quantities (BOQ)" type="Estimation" />; }
export function ProcurementTab() { return <GenericMockTab title="Procurement Hub" type="ERP / Supply Chain" />; }
export function DprTab() { return <GenericMockTab title="Daily Progress Reports (DPR)" type="Operations" />; }
export function QualityTab() { return <GenericMockTab title="QA/QC Dashboards" type="Compliance" />; }
export function SafetyTab() { return <GenericMockTab title="Safety Operations Center" type="EHS" />; }
export function SnaggingTab() { return <GenericMockTab title="Defect & Snag Tracking" type="Operations" />; }
export function DocumentsTab() { return <GenericMockTab title="Project Document Vault" type="BIM / Storage" />; }
export function AnalyticsTab() { return <GenericMockTab title="Construction Intelligence" type="Analytics" />; }
