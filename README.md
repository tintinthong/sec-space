# SecSpace

Local setup and run instructions.

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (recommended)

## Setup

1. Create env file:

```bash
cp .env.example .env
```

2. Add your Gemini API key in `.env`:

```bash
VITE_API_KEY=your_real_api_key_here
```

3. Install dependencies:

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```
