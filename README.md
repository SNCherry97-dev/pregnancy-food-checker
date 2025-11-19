# 🤰 Pregnancy Food Checker

A friendly, mobile-first web application to help expecting mothers check if foods are safe during pregnancy.

## Features

- 🔍 **Real-time Search**: Type any food name and get instant results
- 🎨 **Beautiful UI**: Pastel color palette with dark mode support
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🩺 **Medical Guidelines**: Classifications based on established health sources
- 🤰 **Trimester Tips**: Specific advice for different pregnancy stages
- 💡 **Suggest Foods**: Request new foods to be added to the database

## Food Categories

- **Bad** ⛔: Foods to avoid (e.g., raw fish, unpasteurized dairy, high mercury fish)
- **Not Recommended** ⚠️: Foods to limit or prepare carefully (e.g., deli meat, caffeine)
- **Recommended** ✅: Safe and nutritious foods (e.g., cooked salmon, eggs, vegetables)

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Data**: JSON file (easily editable)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pregnancy-food-checker
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

### Running the App

You need to run both the server and client:

**Terminal 1 - Start the backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:3001`

**Terminal 2 - Start the frontend:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173` (or similar)

Open your browser and navigate to the client URL.

## Editing Food Data

Food data is stored in `data/foods.json`. To add or modify foods:

1. Open `data/foods.json`
2. Add a new entry following this format:
```json
{
  "id": "unique-id",
  "name": "Food Name",
  "category": "Bad | Not Recommended | Recommended",
  "explanation": "Brief explanation of why...",
  "trimester_advice": "Optional trimester-specific advice",
  "keywords": ["keyword1", "keyword2"]
}
```
3. Restart the server to load new data

## User Suggestions

When users search for foods not in the database, they can submit suggestions. These are saved to `data/suggestions.json` for review.

## Deployment

### Backend (Server)

Deploy to any Node.js hosting service (Heroku, Railway, Render, etc.):
- Set environment variable `PORT` if needed
- Run `npm start`

### Frontend (Client)

Build the production bundle:
```bash
cd client
npm run build
```

Deploy the `dist` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

**Important**: Update the `API_URL` in `client/src/App.jsx` to point to your deployed backend.

## Disclaimer

⚠️ This application provides general information based on medical guidelines. It is **not** a substitute for professional medical advice. Always consult your healthcare provider for personalized guidance.

## Data Sources

Food safety classifications are based on guidelines from:
- American College of Obstetricians and Gynecologists (ACOG)
- NHS (UK National Health Service)
- FDA (Food and Drug Administration)

## License

MIT

## Contributing

Contributions are welcome! Please ensure all food data is backed by reputable medical sources.
