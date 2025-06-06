import { NextResponse } from 'next/server';
import { getUserTweets } from '../../utils/api';
import { generateBlend } from '../../utils/openai';

function findBestTweet(tweets) {
  if (!tweets || tweets.length === 0) return null;

  // Filter out any tweets that don't have the legacy property
  const validTweets = tweets.filter(tweet => tweet && tweet.legacy);
  
  // If no valid tweets after filtering, return the first tweet or null
  if (validTweets.length === 0) return tweets[0];

  return validTweets.reduce((best, current) => {
    const currentEngagement = (current.legacy?.retweet_count || 0) + (current.legacy?.favorite_count || 0);
    const bestEngagement = (best.legacy?.retweet_count || 0) + (best.legacy?.favorite_count || 0);
    
    return currentEngagement > bestEngagement ? current : best;
  }, validTweets[0]);
}

export async function POST(request) {
  try {
    const { user1, user2 } = await request.json();
    if (!user1 || !user2) {
      return NextResponse.json(
        { error: 'Both Twitter handles are required' }, 
        { status: 400 }
      );
    }
    
    const user1Clean = user1.replace('@', '').trim();
    const user2Clean = user2.replace('@', '').trim();

    const [user1Tweets, user2Tweets] = await Promise.all([
      getUserTweets(user1Clean),
      getUserTweets(user2Clean)
    ]);
    
    if (!user1Tweets?.length || !user2Tweets?.length) {
      return NextResponse.json(
        { error: `One or both Twitter handles are invalid` },
        { status: 400 }
      );
    }

    const user1BestTweet = findBestTweet(user1Tweets);
    const user2BestTweet = findBestTweet(user2Tweets);

    const blendResult = await generateBlend(
      user1Tweets, 
      user2Tweets, 
      user1Clean, 
      user2Clean
    );

    const result = {
      ...blendResult,
      user1: user1Clean,
      user2: user2Clean,
      user1BestTweet,
      user2BestTweet
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating blend:', error);
    
    // Determine the appropriate status code based on the error
    let statusCode = 500;
    if (error.message.includes('API key') || error.message.includes('authentication failed')) {
      statusCode = 401;
    } else if (error.message.includes('Rate limit')) {
      statusCode = 429;
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate blend' }, 
      { status: statusCode }
    );
  }
} 