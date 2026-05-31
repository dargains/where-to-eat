# Where to Eat - Lunch Suggestion App

A simple Next.js web app that suggests random lunch places from a database. Users can get random suggestions or add their own places to the collection.

## Features

- 🎲 Get random lunch place suggestions
- 📍 View restaurant details: name, address, price level, and distance
- ➕ Add new lunch places via a form
- 💾 Persistent storage with Vercel KV
- ⚡ Built with Next.js 14 and React
- 🎨 Clean and responsive UI

## Database Structure

Each lunch place has:
- **name**: Restaurant name
- **address**: Physical address
- **price**: Price level (1-3: 1=budget, 2=moderate, 3=expensive)
- **distance**: Distance from workplace in kilometers

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (for Vercel KV):
   - Copy `.env.local.example` to `.env.local`
   - For local development, you can skip this—the app will use default data
   - For production, add your Vercel KV connection details

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
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── LunchSuggester.tsx        # Main suggestion component
│   ├── LunchSuggester.module.css # Suggestion component styles
│   ├── AddPlace.tsx              # Add place form component
│   └── AddPlace.module.css       # Form component styles
├── lib/
│   └── database.ts               # Database functions and types
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Vercel KV Setup

For production deployment on Vercel:

1. Create a Vercel account at https://vercel.com
2. Create a new project
3. Add a KV database from the Vercel marketplace
4. Deploy your app
5. The environment variables will be automatically injected by Vercel

See `.env.local.example` for more details.

## Customization

- To edit the default lunch places, modify the `defaultPlaces` array in `lib/database.ts`
- To change styling, update the CSS modules in the `components/` folder

## License

MIT
