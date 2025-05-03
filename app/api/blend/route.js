import { NextResponse } from 'next/server';
import { getUserTweets } from '../../utils/api';
import { generateBlend } from '../../utils/openai';

function findBestTweet(tweets) {
  if (!tweets || tweets.length === 0) return null;

  return tweets.reduce((best, current) => {
    const currentEngagement = (current.legacy?.retweet_count || 0) + (current.legacy?.favorite_count || 0);
    const bestEngagement = (best.legacy?.retweet_count || 0) + (best.legacy?.favorite_count || 0);
    
    return currentEngagement > bestEngagement ? current : best;
  }, tweets[0]);
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
        { error: 'Unable to retrieve enough tweets for one or both users' }, 
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
    return NextResponse.json(
      { error: error.message || 'Failed to generate blend' }, 
      { status: 500 }
    );
  }
} 