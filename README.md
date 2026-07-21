# React Onboarding

A React + Vite + TypeScript project with Storybook.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Other Commands

| Command | Description |
|
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run check` | Type-check + lint |
| `npm run storybook` | Start Storybook on port 6006 |

## Environment Setup

This app fetches data from [The Movie Database (TMDB) API](https://api.themoviedb.org/3) — used for search, popular movies, movie details, and genres.

1. Register a free account at [themoviedb.org](https://www.themoviedb.org/) and generate a v3 API key from your account settings.
2. Copy the example env file and paste your key in:

```bash
cp .env.example .env
```

3. Open `.env` and set `VITE_TMDB_API_KEY` to your real key.

Note: Storybook stories mock these API calls with MSW, so a real key isn't required to run `npm run storybook` — only `npm run dev` needs a valid key to fetch live data.
