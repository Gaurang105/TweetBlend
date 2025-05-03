'use client';

import { useState } from 'react';
import BlendForm from './components/BlendForm';
import BlendResult from './components/BlendResult';
import LoadingSpinner from './components/LoadingSpinner';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [blendResult, setBlendResult] = useState(null);

  const handleSubmit = async ({ user1, user2 }) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/blend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1, user2 }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create blend');
      }
      
      setBlendResult(data);
    } catch (err) {
      setError(err.message);
      setBlendResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-5 -z-10">
            <svg className="w-96 h-96" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-black rounded-lg shadow-lg">
              <Image src="/blend.png" alt="TweetBlend Logo" width={60} height={60} className="filter invert" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-black mb-3 tracking-tight">
            <span className="relative">
              TweetBlend
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-mono tracking-tight">
            Discover how your Twitter vibe matches with your friends
          </p>
        </div>
        
        {!blendResult && !isLoading && (
          <BlendForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
        
        {isLoading && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100 noise-bg">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 bg-white text-red-700 border border-red-300 shadow-sm rounded-lg">
            <p className="font-medium">Error: {error}</p>
            {error.includes('API key') && (
              <p className="mt-2 text-sm">
                Please check your API configuration in the .env file.
              </p>
            )}
            {error.includes('Twitter handle') && (
              <p className="mt-2 text-sm">
                This Twitter handle doesn't exist or is not public. Please check the spelling and try again.
              </p>
            )}
            <button
              onClick={() => setError('')}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
            >
              Try Again
            </button>
          </div>
        )}
        
        {blendResult && (
          <div>
            <BlendResult result={blendResult} />
            <div className="text-center mt-8">
              <button
                onClick={() => setBlendResult(null)}
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 shadow-lg"
              >
                Create Another Blend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 