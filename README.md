# 🏭 Swift Community Platform

Full-stack self-evolving learning platform with AI-powered content generation and data persistence.

## Features

### Data Persistence (Vercel KV)
- Posts stored with metadata
- Tutorials with AI generation tracking
- Analytics aggregation
- Real-time updates

### AI Agent Operations
- **Auto-generate tutorials** - Creates content for 6 topics
- **Content analysis** - Analyzes community trends
- **Smart recommendations** - Suggests improvements

### Full Functionality
- Create/read posts
- Like posts
- View analytics
- Generate tutorials
- Filter by topic
- Track contributors

## API Endpoints

### Posts
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get post
- `PATCH /api/posts/[id]` - Like post

### Tutorials
- `GET /api/tutorials` - List tutorials
- `GET /api/tutorials?topic=SwiftUI` - Filter by topic

### Analytics
- `GET /api/analytics` - Get platform metrics

### Agent
- `POST /api/agent/generate` - Generate tutorial
- `POST /api/agent/analyze` - Analyze content

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your API keys
npm run dev
```

## Deploy

```bash
vercel
```

## Architecture

```
┌─────────────────────────────────────┐
│         Next.js Frontend            │
│  (React + Framer Motion + Tailwind) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          API Routes                 │
│  /api/posts, /tutorials, /agent     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Business Logic               │
│  lib/db.ts, lib/ai.ts               │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Data Layer (Vercel KV)         │
│  Posts, Tutorials, Analytics        │
└─────────────────────────────────────┘
```

## Data Models

### Post
```typescript
{
  id: string
  title: string
  content: string
  code: string
  author: string
  category: string
  tags: string[]
  likes: number
  views: number
  createdAt: number
}
```

### Tutorial
```typescript
{
  id: string
  title: string
  description: string
  code: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topic: string
  estimatedTime: number
  generatedAt: number
  aiGenerated: boolean
}
```

## Agentic Operations

### Auto-Generation
Runs on-demand or scheduled:
```bash
curl -X POST https://your-app.vercel.app/api/agent/generate
```

### Content Analysis
```bash
curl -X POST https://your-app.vercel.app/api/agent/analyze
```

## Production Ready

✅ Full data persistence  
✅ Type-safe APIs  
✅ Error handling  
✅ Analytics tracking  
✅ AI integration  
✅ Responsive UI  
✅ Real-time updates  
