'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { CreditCard, Download, ExternalLink } from 'lucide-react';

export default function ResidentDuesPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const { data } = await apiClient.get('/maintenance-billing');
      setBills(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Maintenance Dues</h1>
        <p className="text-gray-400 mt-1">View and pay your society maintenance and utility bills</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bills.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700">
            <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-20" />
            No pending bills
          </div>
        ) : (
          bills.map((bill: any) => (
            <div key={bill.id} className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-xl">
              <div className="p-5 border-b border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                    {bill.billingPeriod}
                  </span>
                  <span className="text-gray-400 text-sm">{bill.unit?.unitNumber}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">${bill.amount}</h3>
                <p className="text-sm text-gray-400">Due Date: 15th of month</p>
              </div>
              <div className="bg-gray-800/80 p-5 space-y-3">
                <div className="text-sm space-y-2">
                  {bill.lineItems?.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-gray-300">
                      <span>{item.description}</span>
                      <span>${item.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-700 flex gap-3">
                  <button className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors">
                    Pay Now
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
