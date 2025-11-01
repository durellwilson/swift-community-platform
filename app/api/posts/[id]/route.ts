import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.getPost(params.id)
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  return NextResponse.json({ post })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { action } = await req.json()
  
  if (action === 'like') {
    const post = await db.likePost(params.id)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json({ post })
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
