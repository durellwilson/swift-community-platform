import { NextRequest, NextResponse } from 'next/server'
import { mockTutorials } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const topic = searchParams.get('topic')
  
  const tutorials = topic 
    ? mockTutorials.filter(t => t.topic === topic)
    : mockTutorials
    
  return NextResponse.json({ tutorials })
}
