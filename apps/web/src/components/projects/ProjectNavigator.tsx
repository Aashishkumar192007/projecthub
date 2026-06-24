'use client';

import { useProjectStore, ProjectStatus } from '@/store/projectStore';
import { useRouter, useParams } from 'next/navigation';
import { HardHat, AlertTriangle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export function ProjectNavigator() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  const { projects, setActiveProject } = useProjectStore();

  const handleSelect = (id: string) => {
    setActiveProject(id);
    router.push(`/projects/${id}`);
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'Active': return <PlayCircle size={14} className="text-brand-blue" />;
      case 'Delayed': return <Clock size={14} className="text-warning" />;
      case 'High Risk': return <AlertTriangle size={14} className="text-danger" />;
      case 'Completed': return <CheckCircle2 size={14} className="text-success" />;
      case 'Upcoming': return <HardHat size={14} className="text-[#A1A1AA]" />;
      default: return <HardHat size={14} />;
    }
  };

  const categories: { label: string; statuses: ProjectStatus[] }[] = [
    { label: 'Active Projects', statuses: ['Active'] },
    { label: 'High Risk Projects', statuses: ['High Risk', 'Delayed'] },
    { label: 'Completed Projects', statuses: ['Completed'] },
  ];

  return (
    <div className="w-72 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <HardHat size={16} className="text-brand-blue" /> Project Navigator
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((group) => {
          const groupProjects = projects.filter(p => group.statuses.includes(p.status));
          
          if (groupProjects.length === 0) return null;

          return (
            <div key={group.label}>
              <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 px-2">
                {group.label}
              </h3>
              <div className="space-y-1.5">
                {groupProjects.map((project) => {
                  const isActive = currentId === project.id;
                  
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleSelect(project.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        isActive 
                          ? 'bg-[#1A2533] border-brand-blue shadow-[0_0_15px_rgba(79,132,255,0.15)]' 
                          : 'bg-[#1A1A1A] border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1E1E22]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(project.status)}
                          <h4 className={`text-xs font-bold truncate max-w-[150px] ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                            {project.name}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#71717A] font-bold">Progress: {project.completionPercentage}%</span>
                        <div className="w-16 h-1.5 bg-[#111111] rounded-full overflow-hidden border border-[#2A2A30]">
                          <div 
                            className={`h-full rounded-full ${project.status === 'High Risk' ? 'bg-danger' : project.status === 'Delayed' ? 'bg-warning' : 'bg-brand-blue'}`}
                            style={{ width: `${project.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
