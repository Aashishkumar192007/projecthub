'use client';

import { useEffect, useState } from 'react';
import { FileText, Plus } from 'lucide-react';

export default function ContractsDashboard() {
  const [sales, setSales] = useState([]);
  const [leases, setLeases] = useState([]);
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
    async function fetchContracts() {
      const token = localStorage.getItem('access_token');
      try {
        const [salesRes, leasesRes] = await Promise.all([
          fetch('http://localhost:3001/sales', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:3001/leasing', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        
        if (salesRes.ok) setSales(await salesRes.json());
        if (leasesRes.ok) setLeases(await leasesRes.json());
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    }
    fetchContracts();
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Contracts & ERP</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage formal Sales Agreements, Lease Contracts, and Payment Plans.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex space-x-3">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Plus className="h-4 w-4 mr-2" /> New Lease
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Plus className="h-4 w-4 mr-2" /> Convert Sale
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('sales')}
            className={`${activeTab === 'sales' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Sales Agreements
          </button>
          <button
            onClick={() => setActiveTab('leases')}
            className={`${activeTab === 'leases' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Lease Contracts
          </button>
        </nav>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Contract ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Financials</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {activeTab === 'sales' && sales.length === 0 && (
                    <tr><td colSpan={5} className="py-4 text-center text-sm text-gray-500">No Sales Agreements found.</td></tr>
                  )}
                  {activeTab === 'leases' && leases.length === 0 && (
                    <tr><td colSpan={5} className="py-4 text-center text-sm text-gray-500">No Lease Contracts found.</td></tr>
                  )}
                  
                  {activeTab === 'sales' && sales.map((sale: any) => (
                    <tr key={sale.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"><FileText className="h-4 w-4 inline mr-1 text-indigo-500" /> {sale.id.slice(0, 8).toUpperCase()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.lead?.firstName} {sale.lead?.lastName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.unit?.unitNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${sale.saleAmount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">{sale.status}</span>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'leases' && leases.map((lease: any) => (
                    <tr key={lease.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"><FileText className="h-4 w-4 inline mr-1 text-green-500" /> {lease.id.slice(0, 8).toUpperCase()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lease.lead?.firstName} {lease.lead?.lastName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lease.unit?.unitNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${lease.rentAmount} / mo</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{lease.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
