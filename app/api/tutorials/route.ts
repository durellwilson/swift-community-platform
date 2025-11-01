import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const topic = searchParams.get('topic')
  
  try {
    const tutorials = topic 
      ? await db.getTutorialsByTopic(topic)
      : await db.getTutorials(50)
    return NextResponse.json({ tutorials })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tutorials' }, { status: 500 })
  }
}
