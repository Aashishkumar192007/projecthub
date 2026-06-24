'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { Wrench, Plus, CircleCheck } from 'lucide-react';

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const { data } = await apiClient.get('/work-orders');
      setWorkOrders(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Work Orders</h1>
          <p className="text-gray-400 mt-1">Manage service requests and vendor ticketing</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
          <Plus className="w-4 h-4" />
          New Work Order
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/80 text-xs uppercase text-gray-400 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Cost</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {workOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <Wrench className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  No open work orders
                </td>
              </tr>
            ) : (
              workOrders.map((wo: any) => (
                <tr key={wo.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{wo.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${wo.priority === 'HIGH' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
                      {wo.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">${wo.estimatedCost}</td>
                  <td className="px-6 py-4">{wo.status}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                      <CircleCheck className="w-4 h-4" /> Resolve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
