'use client';

import { useState } from 'react';

export default function BlendForm({ onSubmit, isLoading }) {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!user1.trim() || !user2.trim()) {
      setError('Both Twitter handles are required');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Call the parent component's onSubmit handler
    onSubmit({ user1: user1.trim(), user2: user2.trim() });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200 noise-bg">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-2xl font-bold text-black relative inline-block">
          Create Your Blend
          <span className="absolute -bottom-1 left-0 w-full bg-black"></span>
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-1">
          <label 
            htmlFor="user1" 
            className="block text-sm font-medium text-gray-700 mb-1 font-mono tracking-tight"
          >
            Your Twitter Handle
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
              @
            </span>
            <input
              id="user1"
              type="text"
              value={user1}
              onChange={(e) => setUser1(e.target.value)}
              className="pl-7 w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-gray-50 focus:bg-white font-mono"
              placeholder="YourHandle"
            />
          </div>
        </div>
        
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="relative bg-white px-4 text-sm text-gray-500 uppercase tracking-widest font-mono">with</div>
        </div>
        
        <div className="mb-1">
          <label 
            htmlFor="user2" 
            className="block text-sm font-medium text-gray-700 mb-1 font-mono tracking-tight"
          >
            Friend's Twitter Handle
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
              @
            </span>
            <input
              id="user2"
              type="text"
              value={user2}
              onChange={(e) => setUser2(e.target.value)}
              className="pl-7 w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-gray-50 focus:bg-white font-mono"
              placeholder="FriendHandle"
            />
          </div>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-white border border-red-300 rounded-lg">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-all duration-200 font-mono ${
            isLoading 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-black hover:bg-gray-800 text-white hover:shadow-lg active:scale-98'
          }`}
        >
          {isLoading ? 'Creating Blend...' : 'Create Blend'}
        </button>
      </form>
    </div>
  );
} 