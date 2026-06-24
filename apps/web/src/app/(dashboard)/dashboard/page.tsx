import { Building2, Home, Map, DollarSign } from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    { name: 'Total Properties', stat: '14', icon: Building2 },
    { name: 'Total Units', stat: '342', icon: Home },
    { name: 'Active Projects', stat: '3', icon: Map },
    { name: 'Monthly Revenue', stat: '$1.2M', icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow rounded-lg overflow-hidden p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Dashboard analytical charts will be rendered here via Recharts/Tremor.</p>
        </div>
      </div>
    </div>
  );
}
