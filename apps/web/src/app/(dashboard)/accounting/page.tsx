'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Plus } from 'lucide-react';

export default function AccountingDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [activeTab, setActiveTab] = useState('invoices');

  useEffect(() => {
    async function fetchLedger() {
      const token = localStorage.getItem('access_token');
      try {
        const res = await fetch('http://localhost:3001/accounting/ledger', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setInvoices(data.invoices || []);
          setReceipts(data.receipts || []);
        }
      } catch (error) {
        console.error("Failed to fetch ledger:", error);
      }
    }
    fetchLedger();
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Accounting & Finance</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track issued invoices, record incoming payment receipts, and view the General Ledger.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex space-x-3">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Plus className="h-4 w-4 mr-2" /> Log Payment
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Plus className="h-4 w-4 mr-2" /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`${activeTab === 'invoices' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`${activeTab === 'receipts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Payment Receipts
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
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{activeTab === 'invoices' ? 'Due Date' : 'Payment Date'}</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{activeTab === 'invoices' ? 'Type' : 'Method'}</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {activeTab === 'invoices' && invoices.length === 0 && (
                    <tr><td colSpan={5} className="py-4 text-center text-sm text-gray-500">No Invoices found.</td></tr>
                  )}
                  {activeTab === 'receipts' && receipts.length === 0 && (
                    <tr><td colSpan={5} className="py-4 text-center text-sm text-gray-500">No Payment Receipts found.</td></tr>
                  )}
                  
                  {activeTab === 'invoices' && invoices.map((inv: any) => (
                    <tr key={inv.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"><DollarSign className="h-4 w-4 inline mr-1 text-red-500" /> {inv.id.slice(0, 8).toUpperCase()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${inv.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(inv.dueDate).toLocaleDateString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{inv.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${inv.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{inv.status}</span>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'receipts' && receipts.map((rec: any) => (
                    <tr key={rec.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"><DollarSign className="h-4 w-4 inline mr-1 text-green-500" /> {rec.id.slice(0, 8).toUpperCase()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${rec.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(rec.paymentDate).toLocaleDateString()}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rec.paymentMethod}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">CLEARED</span>
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
