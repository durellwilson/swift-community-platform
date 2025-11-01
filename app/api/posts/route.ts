import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  code: z.string().optional().default(''),
  author: z.string().min(1),
  category: z.string(),
  tags: z.array(z.string())
})

export async function GET() {
  try {
    const posts = await db.getPosts(50)
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = postSchema.parse(body)
    
    const post = await db.createPost(data)
    await db.recordContributor(data.author)
    
    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
