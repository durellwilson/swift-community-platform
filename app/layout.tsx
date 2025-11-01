export const metadata = {
  title: 'Swift Community Platform',
  description: 'Self-evolving learning platform with AI-powered content'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
