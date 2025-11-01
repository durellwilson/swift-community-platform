import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const tutorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  code: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedTime: z.number()
})

export async function generateTutorial(topic: string) {
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: tutorialSchema,
    prompt: `Generate a Swift/SwiftUI tutorial about ${topic}. Include:
    - Clear title
    - Detailed description
    - Working code example
    - Appropriate difficulty level
    - Estimated completion time in minutes`
  })

  return object
}

const insightSchema = z.object({
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
  trends: z.array(z.string())
})

export async function analyzeContent(posts: any[], tutorials: any[]) {
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: insightSchema,
    prompt: `Analyze this Swift community data:
    Posts: ${posts.length}
    Tutorials: ${tutorials.length}
    
    Provide:
    - Key insights about community activity
    - Recommendations for improvement
    - Emerging trends`
  })

  return object
}
