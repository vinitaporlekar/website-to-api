import { ExternalLink, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function APICard({ api, onDelete }: any) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
          <p className="text-sm text-gray-500 truncate">{api.url}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
          Active
        </span>
      </div>

      <div className="bg-gray-50 rounded p-3 mb-4">
        <p className="text-xs text-gray-600 mb-1">API Endpoint:</p>
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm text-gray-900 flex-1 overflow-x-auto">
            GET /api/{api.id}/data
          </code>
          <button
            onClick={() => copyToClipboard(`GET /api/${api.id}/data`)}
            className="text-gray-600 hover:text-gray-900 transition"
            title="Copy endpoint"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Detected Endpoints:</p>
        <div className="space-y-1">
          {api.endpoints && api.endpoints.length > 0 ? (
            api.endpoints.map((endpoint: string, idx: number) => (
              <p key={idx} className="text-sm font-mono text-indigo-600">
                {endpoint}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No endpoints detected</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center justify-center gap-2 py-2 hover:bg-indigo-50 rounded transition">
          <ExternalLink className="w-4 h-4" />
          Test API
        </button>
        <button
          onClick={() => onDelete(api.id)}
          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-2 py-2 hover:bg-red-50 rounded transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}