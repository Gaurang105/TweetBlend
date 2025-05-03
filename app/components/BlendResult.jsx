'use client';

import { formatDistanceToNow } from 'date-fns';

export default function BlendResult({ result }) {
  if (!result) return null;

  const {
    title,
    compatibilityScore,
    commonThemes,
    differences,
    blendedTweet,
    summary,
    user1,
    user2,
    debateQuestion,
    conversation,
    blendPersona,
    irlPotentials,
    user1BestTweet,
    user2BestTweet
  } = result;

  // Helper function to format tweet date
  const formatTweetDate = (tweet) => {
    if (!tweet || !tweet.created_at) return '';
    try {
      return formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true });
    } catch (e) {
      return '';
    }
  };

  // Helper function to get tweet metrics
  const getTweetMetrics = (tweet) => {
    if (!tweet || !tweet.legacy) return { replies: 0, retweets: 0, likes: 0 };
    return {
      replies: tweet.legacy.reply_count || 0,
      retweets: tweet.legacy.retweet_count || 0,
      likes: tweet.legacy.favorite_count || 0
    };
  };

  // Format best tweets for display
  const bestTweet1 = user1BestTweet ? {
    text: user1BestTweet.legacy?.full_text || '',
    date: formatTweetDate(user1BestTweet),
    metrics: getTweetMetrics(user1BestTweet),
    profileImageUrl: user1BestTweet.core?.user_results?.result?.legacy?.profile_image_url_https || '/default-avatar.png'
  } : null;

  const bestTweet2 = user2BestTweet ? {
    text: user2BestTweet.legacy?.full_text || '',
    date: formatTweetDate(user2BestTweet),
    metrics: getTweetMetrics(user2BestTweet),
    profileImageUrl: user2BestTweet.core?.user_results?.result?.legacy?.profile_image_url_https || '/default-avatar.png'
  } : null;

  // Render a Twitter card component
  const TwitterCard = ({ username, tweet }) => {
    if (!tweet) return null;
    
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <img 
              src={tweet.profileImageUrl} 
              alt={`${username}'s profile`}
              className="h-10 w-10 rounded-full"
              onError={(e) => {e.target.src = '/default-avatar.png'}}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-gray-900 truncate">@{username}</p>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">{tweet.date}</span>
            </div>
            <p className="text-gray-800 mt-1 whitespace-pre-line break-words text-sm">{tweet.text}</p>
            <div className="flex justify-between mt-4 text-gray-500 text-sm max-w-md">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span>{tweet.metrics.replies}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{tweet.metrics.retweets}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>{tweet.metrics.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200 noise-bg">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
        </div>
        <h1 className="text-4xl font-bold text-black mb-6 relative inline-block">
          {title}
          <span className="absolute -bottom-1 left-0 w-full bg-black"></span>
        </h1>
        <div className="mt-4">
          <div className="inline-flex items-center justify-center space-x-3 font-mono">
            <span className="text-xl text-black font-medium">@{user1}</span>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <span className="text-xl text-black font-medium">@{user2}</span>
          </div>
        </div>
      </div>

      <div className="mb-10 transform hover:scale-102 transition-transform duration-300">
        <div className="h-10 w-full bg-gray-100 rounded-full mb-2 overflow-hidden shadow-inner">
          <div 
            className="h-10 bg-black rounded-full flex items-center justify-end pr-4 text-white font-medium transition-all duration-1000 ease-out"
            style={{ width: `${compatibilityScore}%` }}
          >
            {compatibilityScore}%
          </div>
        </div>
        <p className="text-center text-gray-600 font-medium font-mono tracking-tight">Compatibility Score</p>
      </div>

      {(bestTweet1 || bestTweet2) && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
            </svg>
            Best Tweets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-mono mb-2 text-gray-600">@{user1}'s Top Tweet</h3>
              <TwitterCard username={user1} tweet={bestTweet1} />
            </div>
            <div>
              <h3 className="text-md font-mono mb-2 text-gray-600">@{user2}'s Top Tweet</h3>
              <TwitterCard username={user2} tweet={bestTweet2} />
            </div>
          </div>
        </div>
      )}

      {irlPotentials && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            If You Met IRL
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 font-mono">Dating Potential</span>
                <span className="font-medium text-gray-700 font-mono">{irlPotentials.dating}%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-pink-400 rounded-full"
                  style={{ width: `${irlPotentials.dating}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 font-mono">Friendship Potential</span>
                <span className="font-medium text-gray-700 font-mono">{irlPotentials.friendship}%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-blue-400 rounded-full"
                  style={{ width: `${irlPotentials.friendship}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 font-mono">Enemy Potential</span>
                <span className="font-medium text-gray-700 font-mono">{irlPotentials.enemy}%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-orange-400 rounded-full"
                  style={{ width: `${irlPotentials.enemy}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 font-mono">Might Just Kill</span>
                <span className="font-medium text-gray-700 font-mono">{irlPotentials.mightJustKill}%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-4 bg-red-500 rounded-full"
                  style={{ width: `${irlPotentials.mightJustKill}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.502 7.598a.813.813 0 11-1.626 0 .813.813 0 011.626 0zM7.889 9.08c-.376.023-.448.06-.536.21-.088.148-.11.387-.11.953v.126c0 .305.035.348.75.435.715.086 2.39.086 3.104 0 .715-.087.75-.13.75-.435v-.126c0-.566-.022-.805-.11-.954-.088-.149-.16-.186-.536-.209-.605-.036-1.607-.036-2.212 0zM13.937 7.598a.813.813 0 10-1.626 0 .813.813 0 001.626 0z" clipRule="evenodd" />
            </svg>
            Common Themes
          </h2>
          <ul className="space-y-3">
            {commonThemes.map((theme, index) => (
              <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-black mr-2 mt-0.5">•</span>
                <span className="text-gray-800 font-mono">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Key Differences
          </h2>
          <ul className="space-y-3">
            {differences.map((difference, index) => (
              <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-black mr-2 mt-0.5">•</span>
                <span className="text-gray-800 font-mono">{difference}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
          Blended Tweet
        </h2>
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
          <p className="text-gray-800 italic font-mono">{blendedTweet}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          Debate Question
        </h2>
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
          <p className="text-gray-800 font-mono">{debateQuestion}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          Conversation
        </h2>
        <div className="space-y-4">
          {conversation && conversation.map((message, index) => {
            const isUser1 = message.startsWith(`${user1}:`) || message.toLowerCase().startsWith('user1:');
            return (
              <div 
                key={index} 
                className={`flex ${isUser1 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-3/4 p-4 rounded-lg ${isUser1 ? 'bg-gray-100 text-gray-800' : 'bg-black text-white'}`}>
                  <p className="font-mono">{message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Blend Persona
        </h2>
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
          <p className="text-gray-800 font-mono">{blendPersona}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 mt-4">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center font-mono tracking-tight">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          Summary
        </h2>
        <p className="text-gray-800 italic bg-gray-50 p-5 rounded-lg border border-gray-100 font-mono">{summary}</p>
      </div>
    </div>
  );
} 