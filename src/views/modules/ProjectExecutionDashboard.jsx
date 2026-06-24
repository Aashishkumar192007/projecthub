import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockProgressData = [
  { week: 'Week 1', planned: 10, actual: 10 },
  { week: 'Week 2', planned: 25, actual: 22 },
  { week: 'Week 3', planned: 45, actual: 40 },
  { week: 'Week 4', planned: 60, actual: 58 },
  { week: 'Week 5', planned: 80, actual: 75 },
];

const mockDprLogs = [
  { id: 'DPR-042', date: '2026-06-19', vendor: 'BuildRight Corp', skilled: 45, unskilled: 120, status: 'Approved' },
  { id: 'DPR-043', date: '2026-06-20', vendor: 'SteelTech', skilled: 20, unskilled: 50, status: 'Pending Review' },
];

export default function ProjectExecutionDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Execution Command Center</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          + Log Daily Progress
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Overall Completion</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">75%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Schedule Variance</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">-5 Days</p>
          <span className="text-red-500 text-sm mt-1">Behind Schedule</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Vendors On-Site</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
          <span className="text-green-500 text-sm mt-1">↑ 2 from yesterday</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Labor Force</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">485</p>
          <span className="text-gray-500 text-sm mt-1">120 Skilled / 365 Unskilled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Planned vs Actual Progress</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="planned" stroke="#94a3b8" fill="#cbd5e1" name="Planned %" />
              <Area type="monotone" dataKey="actual" stroke="#2563eb" fill="#60a5fa" name="Actual %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent DPRs (Daily Progress Reports)</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-500">Report ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Contractor</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDprLogs.map((log, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 text-sm font-medium text-gray-800">{log.id}</td>
                    <td className="py-4 text-sm text-gray-600">{log.date}</td>
                    <td className="py-4 text-sm text-gray-600">{log.vendor}</td>
                    <td className="py-4">
                      <span className={\`px-3 py-1 rounded-full text-xs font-medium \${log.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}\`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
