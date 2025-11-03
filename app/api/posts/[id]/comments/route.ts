import { NextRequest, NextResponse } from 'next/server'
import { mockComments } from '@/lib/mock-data'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const comments = mockComments.filter(c => c.postId === params.id)
  return NextResponse.json({ comments })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { author, content } = await req.json()
  
  const comment = {
    id: `comment:${Date.now()}`,
    postId: params.id,
    author,
    content,
    createdAt: Date.now()
  }
  
  return NextResponse.json({ comment }, { status: 201 })
}
