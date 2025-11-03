import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/lib/mock-data'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = mockPosts.find(p => p.id === params.id)
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  // Increment views
  post.views++
  
  return NextResponse.json({ post })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { action } = await req.json()
  const post = mockPosts.find(p => p.id === params.id)
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  if (action === 'like') {
    post.likes++
    return NextResponse.json({ post })
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
