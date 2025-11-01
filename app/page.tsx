'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Post {
  id: string
  title: string
  content: string
  code: string
  author: string
  category: string
  likes: number
  views: number
}

interface Tutorial {
  id: string
  title: string
  description: string
  code: string
  difficulty: string
  topic: string
  estimatedTime: number
  aiGenerated: boolean
}

interface Analytics {
  totalPosts: number
  totalTutorials: number
  totalViews: number
  totalContributors: number
  topTopics: Record<string, number>
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [postsRes, tutorialsRes, analyticsRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/tutorials'),
        fetch('/api/analytics')
      ])
      
      const [postsData, tutorialsData, analyticsData] = await Promise.all([
        postsRes.json(),
        tutorialsRes.json(),
        analyticsRes.json()
      ])
      
      setPosts(postsData.posts || [])
      setTutorials(tutorialsData.tutorials || [])
      setAnalytics(analyticsData.analytics)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function generateTutorial() {
    try {
      const res = await fetch('/api/agent/generate', { method: 'POST' })
      const data = await res.json()
      setTutorials(prev => [data.tutorial, ...prev])
    } catch (error) {
      console.error('Failed to generate:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏭 Swift Community Platform
          </h1>
          <p className="text-xl text-gray-600">
            Self-evolving learning platform with AI-powered content generation
          </p>
        </motion.div>

        {/* Analytics */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-4 gap-6 mb-12"
          >
            <StatCard label="Posts" value={analytics.totalPosts} color="blue" />
            <StatCard label="Tutorials" value={analytics.totalTutorials} color="purple" />
            <StatCard label="Views" value={analytics.totalViews} color="green" />
            <StatCard label="Contributors" value={analytics.totalContributors} color="orange" />
          </motion.div>
        )}

        {/* Actions */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={generateTutorial}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            ✨ Generate Tutorial
          </button>
          <button
            onClick={loadData}
            className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:shadow-lg transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Tutorials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">📚 Latest Tutorials</h2>
          <div className="grid gap-6">
            {tutorials.slice(0, 5).map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </section>

        {/* Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-6">💬 Community Posts</h2>
          <div className="grid gap-6">
            {posts.slice(0, 5).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <div className={`bg-gradient-to-br ${colors[color as keyof typeof colors]} p-6 rounded-xl text-white`}>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  )
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {tutorial.topic}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {tutorial.difficulty}
            </span>
            {tutorial.aiGenerated && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                ✨ AI Generated
              </span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          ⏱️ {tutorial.estimatedTime} min
        </div>
      </div>
      <p className="text-gray-600 mb-4">{tutorial.description}</p>
      {tutorial.code && (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{tutorial.code}</code>
        </pre>
      )}
    </motion.div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <div className="flex gap-2 items-center text-sm text-gray-500">
            <span>👤 {post.author}</span>
            <span>•</span>
            <span>📁 {post.category}</span>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>❤️ {post.likes}</span>
          <span>👁️ {post.views}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{post.content}</p>
      {post.code && (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{post.code}</code>
        </pre>
      )}
    </motion.div>
  )
}
