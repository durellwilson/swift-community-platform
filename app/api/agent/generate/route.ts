import { NextResponse } from 'next/server'
import { generateTutorial } from '@/lib/ai'
import { db } from '@/lib/db'

const topics = ['SwiftUI', 'SwiftData', 'Concurrency', 'Testing', 'Performance', 'Security']

export async function POST() {
  try {
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const tutorial = await generateTutorial(topic)
    
    const saved = await db.createTutorial({
      ...tutorial,
      topic,
      aiGenerated: true
    })
    
    return NextResponse.json({ tutorial: saved })
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
