import { useState, useEffect } from 'react';
import { URLInput } from './URLInput';
import { APICard } from './APICard';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export function Dashboard() {
  const [apis, setApis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAPIs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/list`);
      setApis(response.data.apis || []);
    } catch (err) {
      console.error('Failed to fetch APIs:', err);
    }
  };

  const handleGenerateAPI = async (url: string) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate`, {
        url,
      });

      if (response.data.success) {
        setApis([...apis, response.data.api]);
        setSuccessMessage('✅ API generated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(response.data.error || 'Failed to generate API');
      }
    } catch (err: any) {
      setError(
        err?.message ||
          'Error connecting to backend. Make sure it\'s running on port 5000.'
      );
    }

    setLoading(false);
  };

  const handleDeleteAPI = (id: string) => {
    setApis(apis.filter((api) => api.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Website → API
          </h1>
          <p className="text-xl text-gray-600">
            Paste any website. Get instant REST API endpoints.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by AI • Built for developers
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <URLInput onSubmit={handleGenerateAPI} isLoading={loading} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{successMessage}</p>
            </div>
          )}
        </div>

        {/* APIs List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your APIs ({apis.length})
          </h2>

          {apis.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow">
              <p className="text-gray-500 text-lg">No APIs created yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Paste a website URL above to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apis.map((api) => (
                <APICard
                  key={api.id}
                  api={api}
                  onDelete={handleDeleteAPI}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Made with ❤️ for developers</p>
        </div>
      </div>
    </div>
  );
}