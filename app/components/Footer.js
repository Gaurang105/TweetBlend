'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(null);
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-center text-gray-500 text-sm py-8">
      <p>© {year} TweetBlend. All rights reserved.</p>
    </footer>
  );
} 