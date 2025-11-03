export interface Comment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: number
}

export const mockComments: Comment[] = [
  {
    id: 'comment:1',
    postId: 'post:1',
    author: 'Alex Rivera',
    content: 'Great tutorial! This helped me understand SwiftUI much better.',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'comment:2',
    postId: 'post:1',
    author: 'Jamie Lee',
    content: 'Can you add more examples about state management?',
    createdAt: Date.now() - 7200000
  },
  {
    id: 'comment:3',
    postId: 'post:2',
    author: 'Taylor Swift',
    content: 'SwiftData is amazing! Thanks for sharing.',
    createdAt: Date.now() - 10800000
  }
]

export const mockPosts = [
  {
    id: 'post:1',
    title: 'Getting Started with SwiftUI',
    content: 'SwiftUI is Apple\'s modern framework for building user interfaces. Here\'s how to get started...',
    code: 'struct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n    }\n}',
    author: 'Sarah Chen',
    category: 'Tutorial',
    tags: ['SwiftUI', 'Beginner'],
    likes: 42,
    views: 156,
    createdAt: Date.now() - 86400000,
    commentCount: 2
  },
  {
    id: 'post:2',
    title: 'SwiftData Best Practices',
    content: 'Learn how to effectively use SwiftData for persistent storage in your iOS apps.',
    code: '@Model\nclass Item {\n    var name: String\n    var timestamp: Date\n}',
    author: 'Marcus Johnson',
    category: 'Tutorial',
    tags: ['SwiftData', 'Persistence'],
    likes: 38,
    views: 124,
    createdAt: Date.now() - 172800000,
    commentCount: 1
  },
  {
    id: 'post:3',
    title: 'Actor Concurrency in Swift 6',
    content: 'Swift 6 brings powerful actor-based concurrency. Here\'s what you need to know.',
    code: 'actor DataManager {\n    private var cache: [String: Data] = [:]\n    \n    func getData(_ key: String) -> Data? {\n        cache[key]\n    }\n}',
    author: 'Alex Rivera',
    category: 'Advanced',
    tags: ['Concurrency', 'Swift6'],
    likes: 67,
    views: 203,
    createdAt: Date.now() - 259200000,
    commentCount: 0
  }
]

export const mockTutorials = [
  {
    id: 'tutorial:1',
    title: 'Master SwiftUI Animations',
    description: 'Learn to create smooth, performant animations using SwiftUI\'s animation system. Master timing curves, spring animations, and transitions.',
    code: 'withAnimation(.spring(response: 0.6, dampingFraction: 0.8)) {\n    scale = 2.0\n    rotation = 360\n}',
    difficulty: 'intermediate' as const,
    topic: 'SwiftUI',
    estimatedTime: 30,
    generatedAt: Date.now() - 3600000,
    aiGenerated: true
  },
  {
    id: 'tutorial:2',
    title: 'SwiftData Query Patterns',
    description: 'Master SwiftData queries with predicates, sorting, and filtering. Build efficient data layers for your apps.',
    code: '@Query(\n    filter: #Predicate<Item> { $0.isActive },\n    sort: \\.timestamp,\n    order: .reverse\n)\nvar items: [Item]',
    difficulty: 'advanced' as const,
    topic: 'SwiftData',
    estimatedTime: 45,
    generatedAt: Date.now() - 7200000,
    aiGenerated: true
  },
  {
    id: 'tutorial:3',
    title: 'Test-Driven Development in Swift',
    description: 'Write tests first, then implement. Build reliable, maintainable code with TDD practices.',
    code: 'func testViewModel() async throws {\n    let vm = ViewModel()\n    await vm.load()\n    XCTAssertEqual(vm.items.count, 3)\n}',
    difficulty: 'intermediate' as const,
    topic: 'Testing',
    estimatedTime: 40,
    generatedAt: Date.now() - 10800000,
    aiGenerated: true
  }
]

export const mockAnalytics = {
  totalPosts: 127,
  totalTutorials: 89,
  totalViews: 5432,
  totalContributors: 34,
  topTopics: {
    'SwiftUI': 45,
    'SwiftData': 23,
    'Concurrency': 18,
    'Testing': 15,
    'Performance': 12,
    'Security': 8
  },
  dailyActivity: {}
}
