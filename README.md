# Where to Eat - Lunch Suggestion App

A simple Next.js web app that suggests random lunch places from a database.

## Features

- 🎲 Get random lunch place suggestions
- 📍 View restaurant details: name, address, price level, and distance
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

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
where-to-eat/
├── app/
│   ├── api/
│   │   └── random-place/
│   │       └── route.ts          # API endpoint to get random place
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── LunchSuggester.tsx        # Main component
├── lib/
│   └── database.ts               # Mock database and types
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

To add more lunch places, edit the `lunchPlaces` array in `lib/database.ts`.

## License

MIT
