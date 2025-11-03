import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json({ posts: mockPosts })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const newPost = {
      id: `post:${Date.now()}`,
      ...body,
      likes: 0,
      views: 0,
      createdAt: Date.now()
    }
    
    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
