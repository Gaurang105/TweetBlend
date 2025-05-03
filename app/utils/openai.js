import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extract text content from tweet objects
 * @param {Array} tweets - Array of tweet objects
 * @returns {Array} - Array of tweet text contents
 */
function extractTweetContent(tweets) {
  return tweets.map(tweet => tweet?.legacy?.full_text || '').filter(text => text);
}

/**
 * Generate a blend analysis using OpenAI GPT-4
 * @param {Array} user1Tweets - Tweets from the first user
 * @param {Array} user2Tweets - Tweets from the second user
 * @param {string} user1Handle - Handle of the first user
 * @param {string} user2Handle - Handle of the second user
 * @returns {Promise<Object>} - Blend analysis results
 */
export async function generateBlend(user1Tweets, user2Tweets, user1Handle, user2Handle) {
  try {
    const user1TweetTexts = extractTweetContent(user1Tweets);
    const user2TweetTexts = extractTweetContent(user2Tweets);
    
    const prompt = `
You are analyzing tweets from two Twitter users: @${user1Handle} and @${user2Handle}.

User 1 (@${user1Handle}) tweets:
${user1TweetTexts.slice(0, 100).join('\n\n')}

User 2 (@${user2Handle}) tweets:
${user2TweetTexts.slice(0, 100).join('\n\n')}

Create a fun, insightful, and detailed "Twitter Blend" analysis comparing these two users. The analysis should include:

1. A catchy title for their blend
2. 4-6 common topics/themes they both tweet about
3. 3-4 major differences in their tweeting styles or interests
4. A humorous compatibility score (from 0-100%)
5. A funny fictional tweet that represents a perfect blend of both their styles
6. One thought-provoking question they might debate about based on their interests
7. A fictional conversation snippet between them (2-3 exchanges)
8. A blend persona description (what kind of Twitter user would emerge if they were combined)
9. "If you met IRL" potentials (dating, friendship, enemy, and "might just kill" potential on a scale of 0-100%)

Your analysis should be witty, entertaining, and insightful. Format the response as JSON with the following structure:
{
  "title": "Catchy blend title",
  "compatibilityScore": 75,
  "commonThemes": ["Theme 1", "Theme 2", "Theme 3", "Theme 4"],
  "differences": ["Difference 1", "Difference 2", "Difference 3"],
  "blendedTweet": "A sample tweet that combines both styles",
  "debateQuestion": "A thought-provoking question they might discuss",
  "conversation": ["User1: First exchange", "User2: Response", "User1: Reply"],
  "blendPersona": "A description of what kind of Twitter user would result from combining them",
  "irlPotentials": {
    "dating": 65,
    "friendship": 80,
    "enemy": 25,
    "mightJustKill": 10
  },
  "summary": "A brief, funny paragraph summarizing their Twitter relationship"
}
`;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Twitter analyst with a great sense of humor. You create entertaining and insightful analyses comparing two Twitter users' content and style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating blend with OpenAI:', error);
    throw new Error(`Failed to generate blend: ${error.message}`);
  }
} 