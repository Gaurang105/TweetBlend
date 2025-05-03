import axios from 'axios';

const API_KEY = process.env.SCRAPER_API_KEY;
const BASE_URL = process.env.BASE_URL;

// Cache to store previously fetched tweets to avoid duplicate API calls
const tweetCache = {};

/**
 * Fetches tweets for a given Twitter handle
 * @param {string} handle - Twitter handle without the @ symbol
 * @returns {Promise<Array>} - Array of tweets
 */
export async function getUserTweets(handle) {
  const cleanHandle = handle.replace('@', '').trim();
  
  if (tweetCache[cleanHandle]) {
    console.log(`Using cached tweets for ${cleanHandle}`);
    return tweetCache[cleanHandle];
  }
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        handle: cleanHandle
      },
      headers: {
        'x-api-key': API_KEY
      }
    });
    
    tweetCache[cleanHandle] = response.data.tweets;
    
    return response.data.tweets;
  } catch (error) {
    console.error(`Error fetching tweets for ${cleanHandle}:`, error);

    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new Error(`Twitter handle @${cleanHandle} not found`);
      } else if (status === 401 || status === 403) {
        throw new Error('API authentication failed. Please check your API key');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please try again later');
      } else {
        throw new Error(`API Error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      throw new Error('No response from Twitter API. Please check your internet connection');
    } else {
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
} 