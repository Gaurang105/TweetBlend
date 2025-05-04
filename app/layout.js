import './globals.css';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'TweetBlend - Discover Your Twitter Compatibility',
  description: 'Compare Twitter profiles and discover how your Twitter vibe matches with friends',
  keywords: 'twitter, blend, compatibility, social media analysis',
  authors: [{ name: 'TweetBlend' }],
  icons: {
    icon: '/blend.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/blend.png" type="image/png" />
      </head>
      <body className="antialiased checkbox-bg">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 