import { NextResponse } from 'next/server'

const topics = ['SwiftUI', 'SwiftData', 'Concurrency', 'Testing', 'Performance', 'Security']
const difficulties = ['beginner', 'intermediate', 'advanced'] as const

const templates = {
  SwiftUI: {
    titles: ['Master SwiftUI Layouts', 'SwiftUI State Management', 'Custom SwiftUI Components'],
    descriptions: ['Learn advanced layout techniques', 'Understand state flow', 'Build reusable components'],
    codes: ['VStack { Text("Hello") }', '@State private var count = 0', 'struct CustomButton: View { }']
  },
  SwiftData: {
    titles: ['SwiftData Relationships', 'Query Optimization', 'CloudKit Integration'],
    descriptions: ['Master model relationships', 'Optimize queries', 'Sync with CloudKit'],
    codes: ['@Model class Item { }', '@Query var items: [Item]', 'ModelContainer(for: Item.self)']
  },
  Concurrency: {
    titles: ['Swift Actors', 'Async/Await Patterns', 'Task Groups'],
    descriptions: ['Thread-safe code', 'Clean async code', 'Parallel operations'],
    codes: ['actor DataService { }', 'async throws -> Data', 'await withTaskGroup { }']
  }
}

export async function POST() {
  const topic = topics[Math.floor(Math.random() * topics.length)]
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
  const template = templates[topic as keyof typeof templates] || templates.SwiftUI
  
  const tutorial = {
    id: `tutorial:${Date.now()}`,
    title: template.titles[Math.floor(Math.random() * template.titles.length)],
    description: template.descriptions[Math.floor(Math.random() * template.descriptions.length)],
    code: template.codes[Math.floor(Math.random() * template.codes.length)],
    difficulty,
    topic,
    estimatedTime: 20 + Math.floor(Math.random() * 40),
    generatedAt: Date.now(),
    aiGenerated: true
  }
  
  return NextResponse.json({ tutorial })
}
