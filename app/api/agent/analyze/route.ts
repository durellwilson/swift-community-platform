import { NextResponse } from 'next/server'
import { analyzeContent } from '@/lib/ai'
import { db } from '@/lib/db'

export async function POST() {
  try {
    const [posts, tutorials] = await Promise.all([
      db.getPosts(100),
      db.getTutorials(100)
    ])
    
    const analysis = await analyzeContent(posts, tutorials)
    
    return NextResponse.json({ analysis })
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
