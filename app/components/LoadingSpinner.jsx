'use client';

import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-gray-100"></div>
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-t-gray-800 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-1 bg-black rounded-full">
            <Image src="/blend.png" alt="TweetBlend Logo" width={20} height={20} className="filter invert opacity-90" />
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg text-black font-medium font-mono">Creating your blend...</p>
      <p className="mt-2 text-sm text-gray-500 font-mono">This may take a moment while we analyze the tweets.</p>
    </div>
  );
} 