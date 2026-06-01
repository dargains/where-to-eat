# Where to Eat - Lunch Suggestion App

A simple Next.js web app that suggests random lunch places from a MongoDB database. Users can get random suggestions or add their own places to the collection.

## Features

- 🎲 Get random lunch place suggestions
- 🎉 Dynamic greeting messages with random Portuguese phrases
- 📍 View restaurant details: name, address, price level, and distance
- ➕ Add new lunch places via a form
- 💾 Persistent storage with MongoDB Atlas
- ⚡ Built with Next.js 14, React, and Mongoose
- 🎨 Clean and responsive UI
- 🍴 Favicon and comprehensive metadata for SEO

## Database Structure

Each lunch place document has:
- **name**: Restaurant name
- **address**: Physical address
- **price**: Price level (1-3: 1=budget, 2=moderate, 3=expensive)
- **distance**: Distance from workplace in kilometers
- **createdAt**: Timestamp when the place was added

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

### Installation

1. Set up MongoDB Atlas:
   - Create a free cluster at https://www.mongodb.com/cloud/atlas
   - Create a database user with read/write permissions
   - Get your connection string from the cluster connection dialog
   - Copy `.env.local.example` to `.env.local`
   - Replace `username:password@cluster-name` in the `MONGODB_URI` with your actual credentials

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
where-to-eat/
├── app/
│   ├── api/
│   │   ├── random-place/
│   │   │   └── route.ts          # Get random place endpoint
│   │   └── add-place/
│   │       └── route.ts          # Add new place endpoint
│   ├── add-place/
│   │   └── page.tsx              # Add place form page
│   ├── globals.css               # Global styles with CSS variables
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Home page
├── components/
│   ├── LunchSuggester.tsx        # Main suggestion component with random phrases
│   ├── LunchSuggester.module.css # Suggestion component styles
│   ├── AddPlace.tsx              # Add place form component
│   └── AddPlace.module.css       # Form component styles
├── lib/
│   ├── database.ts               # Database functions and types
│   ├── mongodb.ts                # MongoDB connection setup
│   └── models/
│       └── LunchPlace.ts         # Mongoose schema and model
├── public/
│   └── favicon.svg               # App favicon (fork and knife emoji)
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## MongoDB Atlas Setup

### Local Development

1. Create a `.env.local` file in the root directory (copy from `.env.local.example`)
2. Add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/where-to-eat?retryWrites=true&w=majority
   ```

### Production Deployment (Vercel)

1. Deploy your app to Vercel
2. In the Vercel dashboard, go to Settings → Environment Variables
3. Add your `MONGODB_URI` environment variable
4. Redeploy your app

## Customization

- To edit the default lunch places, modify the `defaultPlaces` array in `lib/database.ts`
- To change styling, update the CSS modules in the `components/` folder
- To modify the data schema, update `lib/models/LunchPlace.ts`

## Future Features

With MongoDB, you can easily add:
- Search and filter by price or distance
- User ratings and reviews
- User authentication and favorites
- Place update and delete functionality
- Statistics and analytics

## License

MIT
