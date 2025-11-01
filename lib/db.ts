import { kv } from '@vercel/kv'

export interface Post {
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

export interface Tutorial {
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

export interface Analytics {
  totalPosts: number
  totalTutorials: number
  totalViews: number
  totalContributors: number
  topTopics: Record<string, number>
  dailyActivity: Record<string, number>
}

export const db = {
  // Posts
  async createPost(post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'views'>) {
    const id = `post:${Date.now()}:${Math.random().toString(36).slice(2)}`
    const fullPost: Post = {
      ...post,
      id,
      likes: 0,
      views: 0,
      createdAt: Date.now()
    }
    await kv.set(id, fullPost)
    await kv.zadd('posts:recent', { score: fullPost.createdAt, member: id })
    await kv.sadd(`author:${post.author}:posts`, id)
    return fullPost
  },

  async getPost(id: string): Promise<Post | null> {
    const post = await kv.get<Post>(id)
    if (post) {
      await kv.hincrby('analytics', 'totalViews', 1)
      await kv.set(id, { ...post, views: post.views + 1 })
    }
    return post
  },

  async getPosts(limit = 20): Promise<Post[]> {
    const ids = await kv.zrange('posts:recent', 0, limit - 1, { rev: true })
    const posts = await Promise.all(ids.map(id => kv.get<Post>(id as string)))
    return posts.filter(Boolean) as Post[]
  },

  async likePost(id: string) {
    const post = await kv.get<Post>(id)
    if (post) {
      const updated = { ...post, likes: post.likes + 1 }
      await kv.set(id, updated)
      return updated
    }
    return null
  },

  // Tutorials
  async createTutorial(tutorial: Omit<Tutorial, 'id' | 'generatedAt'>) {
    const id = `tutorial:${Date.now()}:${Math.random().toString(36).slice(2)}`
    const fullTutorial: Tutorial = {
      ...tutorial,
      id,
      generatedAt: Date.now()
    }
    await kv.set(id, fullTutorial)
    await kv.zadd('tutorials:recent', { score: fullTutorial.generatedAt, member: id })
    await kv.hincrby(`topic:${tutorial.topic}`, 'count', 1)
    return fullTutorial
  },

  async getTutorials(limit = 20): Promise<Tutorial[]> {
    const ids = await kv.zrange('tutorials:recent', 0, limit - 1, { rev: true })
    const tutorials = await Promise.all(ids.map(id => kv.get<Tutorial>(id as string)))
    return tutorials.filter(Boolean) as Tutorial[]
  },

  async getTutorialsByTopic(topic: string): Promise<Tutorial[]> {
    const allIds = await kv.zrange('tutorials:recent', 0, -1, { rev: true })
    const tutorials = await Promise.all(allIds.map(id => kv.get<Tutorial>(id as string)))
    return tutorials.filter(t => t && t.topic === topic) as Tutorial[]
  },

  // Analytics
  async getAnalytics(): Promise<Analytics> {
    const [posts, tutorials, analytics, contributors] = await Promise.all([
      kv.zcard('posts:recent'),
      kv.zcard('tutorials:recent'),
      kv.hgetall('analytics'),
      kv.scard('contributors')
    ])

    const topTopics: Record<string, number> = {}
    const topics = ['SwiftUI', 'SwiftData', 'Concurrency', 'Testing']
    for (const topic of topics) {
      const count = await kv.hget(`topic:${topic}`, 'count') as number || 0
      topTopics[topic] = count
    }

    return {
      totalPosts: posts || 0,
      totalTutorials: tutorials || 0,
      totalViews: (analytics?.totalViews as number) || 0,
      totalContributors: contributors || 0,
      topTopics,
      dailyActivity: {}
    }
  },

  async recordContributor(author: string) {
    await kv.sadd('contributors', author)
  }
}
