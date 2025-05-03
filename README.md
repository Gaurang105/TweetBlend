# TweetBlend

A fun application that creates a "blend" of two Twitter profiles, similar to Spotify Blend. Users can enter their Twitter handle and a friend's handle to get an entertaining analysis of their Twitter compatibility.

## Features

- Compare tweets from two Twitter users
- Generate a fun, humorous blend analysis using GPT-4o
- See common themes, differences, compatibility score, and more
- Caching system to avoid duplicate API calls for the same handles
- Responsive design that works on all devices

## Getting Started

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Development mode:
```
npm run dev
```

Build for production:
```
npm run build
```

Start the production server:
```
npm start
```

## How It Works

1. Users input their Twitter handle and a friend's handle
2. The application fetches the last 100 tweets from both users
3. OpenAI's GPT-4o processes the tweets and creates a blend analysis
4. Results are displayed in a visually appealing format
5. Users can create multiple blends with different friends

## Technology Stack

- Next.js for the frontend and API routes
- React for the UI components
- TailwindCSS for styling
- Axios for API calls
- OpenAI API for generating the blend analysis

## License

This project is licensed under the ISC License.

## Acknowledgments

- Inspired by Spotify's Blend feature