# Match-A-Cat 🐱

A fun card-based app where users can discover and match with adorable cats. Each cat comes with unique traits, rarities, and personalities to discover!

## Features

- **Daily Cat Discovery**: Get new cats to discover every day
- **Swipe Interface**: Use intuitive left/right swipes to interact with cat cards
- **Rarities System**: Find common, rare, epic, and legendary cats
- **Unique Cat Personalities**: Each cat has specific traits and characteristics
- **User Authentication**: Secure login and registration system
- **Mobile Responsive**: Works great on both desktop and mobile devices

## Tech Stack

### Frontend

- React with TypeScript
- Vite for fast development and building
- Zustand for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose for data persistence
- JWT for authentication
- Integration with The Cat API for cat images and data

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB instance
- [The Cat API](https://thecatapi.com/) key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/match-a-cat.git
cd match-a-cat
```

2. Set up the backend:

```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with:

```
PORT=<3000>
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
CAT_API_KEY=<your_cat_api_key>
```

4. Set up the frontend:

```bash
cd ../client
npm install
```

5. Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:3000/api
```

### Running the App

1. Start the server:

```bash
cd server
npm run dev
```

2. In a new terminal, start the client:

```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Create an account** or log in if you already have one
2. **Discover cats** by swiping through the card stack
3. **Swipe right** to like a cat, **swipe left** to pass
4. Come back **daily** for new cats to discover!

## Project Structure

### Frontend

```
client/
├── public/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layouts and structural components
│   ├── services/         # API services
│   ├── stores/           # Zustand state stores
│   ├── utils/            # Utility functions and constants
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
```

### Backend

```
server/
├── src/
│   ├── api/              # External API integrations
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions and types
│   └── index.ts          # Entry point
```

## Cat Rarity System

Cats come in different rarities:

- **Common**: Ordinary house cats (most common)
- **Rare**: Special breeds like Maine Coon and Siamese
- **Epic**: Distinctive breeds like Bengal and Scottish Fold
- **Legendary**: The rarest of the rare - Sphynx cats

## Acknowledgments

- [The Cat API](https://thecatapi.com/) for providing cat images and data

---

Made with ❤️ and 🐱
