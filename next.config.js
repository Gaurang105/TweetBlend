/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SCRAPER_API_KEY: process.env.SCRAPER_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
  devIndicators: false
};

module.exports = nextConfig; 