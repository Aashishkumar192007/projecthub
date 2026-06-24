import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockUtilityData = [
  { month: 'Jan', electricity: 4000, water: 2400 },
  { month: 'Feb', electricity: 3000, water: 1398 },
  { month: 'Mar', electricity: 2000, water: 9800 },
  { month: 'Apr', electricity: 2780, water: 3908 },
  { month: 'May', electricity: 1890, water: 4800 },
  { month: 'Jun', electricity: 2390, water: 3800 },
];

const mockWorkOrders = [
  { id: 'WO-101', asset: 'HVAC Unit 3', status: 'Pending', priority: 'High' },
  { id: 'WO-102', asset: 'Elevator B', status: 'In Progress', priority: 'Critical' },
  { id: 'WO-103', asset: 'Generator 1', status: 'Completed', priority: 'Medium' },
];

export default function FacilityDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Facility & ESG Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Open Work Orders</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">24</p>
          <span className="text-red-500 text-sm mt-1">↑ 12% vs last week</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Space Utilization</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">82%</p>
          <span className="text-green-500 text-sm mt-1">Optimal</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Energy Consumption</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">14.2 MWh</p>
          <span className="text-red-500 text-sm mt-1">↑ 5% vs last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">ESG Green Score</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">A-</p>
          <span className="text-green-500 text-sm mt-1">Top 15% percentile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Utility Consumption Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockUtilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="electricity" fill="#8884d8" name="Electricity (kWh)" />
              <Bar dataKey="water" fill="#82ca9d" name="Water (Liters)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Work Orders</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-500">ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Asset</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Priority</th>
                </tr>
              </thead>
              <tbody>
                {mockWorkOrders.map((wo, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 text-sm font-medium text-gray-800">{wo.id}</td>
                    <td className="py-4 text-sm text-gray-600">{wo.asset}</td>
                    <td className="py-4">
                      <span className={\`px-3 py-1 rounded-full text-xs font-medium \${wo.status === 'Completed' ? 'bg-green-100 text-green-800' : wo.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}\`}>
                        {wo.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{wo.priority}</td>
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
