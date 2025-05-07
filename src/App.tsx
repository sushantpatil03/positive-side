import React, { useState } from 'react';
import axios from 'axios';

// Get the API URL from environment variable or use localhost as fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface PositivePerspective {
  positive_angle: string;
  growth_opportunities: string[];
  actionable_steps: string[];
}

function App() {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [perspective, setPerspective] = useState<PositivePerspective | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        situation: situation,
        current_perspective: null
      });
      setPerspective(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze situation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-100/50 to-primary-100/50 blur-3xl -z-10"></div>
          <h1 className="text-6xl font-bold text-primary-800 mb-4 tracking-tight">PositiveSide</h1>
          <p className="text-primary-600 text-lg max-w-md mx-auto">Your friendly perspective buddy - let's tackle this together! 💪</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-8 mb-8 border border-primary-100">
            <div className="mb-6">
              <label htmlFor="situation" className="block text-primary-700 text-sm font-medium mb-3">
                Hey! What's on your mind? 🤔
              </label>
              <textarea
                id="situation"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white/50 text-primary-800 placeholder-primary-400 transition-all duration-200 shadow-sm"
                rows={4}
                placeholder="Tell me what's going on, and let's figure this out together..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !situation.trim()}
              className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-black py-3.5 px-6 rounded-xl hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking about it...
                </span>
              ) : (
                "Let's Find the Silver Lining ✨"
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 shadow-sm">
              Oops! {error} Let's try that again?
            </div>
          )}

          {perspective && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-8 space-y-8 animate-fade-in border border-primary-100">
              <div>
                <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Here's the Bright Side 🌟
                </h2>
                <p className="text-primary-600 leading-relaxed pl-11 italic">"{perspective.positive_angle}"</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  Growth Opportunities 🚀
                </h2>
                <ul className="space-y-3 pl-11">
                  {perspective.growth_opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span className="text-primary-600 group-hover:text-primary-800 transition-colors duration-200">
                        {opportunity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  Let's Take Action! 💪
                </h2>
                <ul className="space-y-3 pl-11">
                  {perspective.actionable_steps.map((step, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span className="text-primary-600 group-hover:text-primary-800 transition-colors duration-200">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-primary-100">
                <p className="text-primary-600 text-center italic">
                  Remember, every challenge is just a stepping stone to something better. You've got this! 🌈
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 