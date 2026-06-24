'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { FileText, UploadCloud, MoreVertical } from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await apiClient.get('/documents');
      setDocuments(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Document Control</h1>
          <p className="text-gray-400 mt-1">Manage KYC, registry, and property documents</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/80 text-xs uppercase text-gray-400 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  No documents found
                </td>
              </tr>
            ) : (
              documents.map((doc: any) => (
                <tr key={doc.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    {doc.title}
                  </td>
                  <td className="px-6 py-4">{doc.documentType}</td>
                  <td className="px-6 py-4">v{doc.version}.0</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full text-xs border border-green-500/30">
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-600 rounded">
                      <MoreVertical className="w-4 h-4" />
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
