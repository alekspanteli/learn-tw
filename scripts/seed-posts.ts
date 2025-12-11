import "dotenv/config"
import prisma from "../lib/prisma"

const dummyPosts = [
  {
    title: "Getting Started with Next.js 16",
    content: "Next.js 16 introduces exciting new features including improved server components, better caching strategies, and enhanced developer experience. In this post, we'll explore the key improvements and how to leverage them in your projects.",
    author: "Jane Doe",
  },
  {
    title: "Mastering Tailwind CSS 4",
    content: "Tailwind CSS 4 brings powerful new utilities and improved performance. Learn how to use the latest features like container queries, improved color system, and better dark mode support to build beautiful, responsive interfaces.",
    author: "John Smith",
  },
  {
    title: "TypeScript Best Practices for React",
    content: "TypeScript and React work beautifully together when you follow best practices. This guide covers type-safe component props, proper use of generics, and patterns for managing complex state with TypeScript.",
    author: "Sarah Johnson",
  },
]

async function seedPosts() {
  console.log("🌱 Seeding posts...\n")

  try {
    // Clear existing posts
    await prisma.post.deleteMany()
    console.log("✅ Cleared existing posts")

    // Create new posts
    for (const post of dummyPosts) {
      const created = await prisma.post.create({
        data: post,
      })
      console.log(`✅ Created post: "${created.title}" by ${created.author}`)
    }

    console.log("\n🎉 Successfully seeded 3 posts!\n")
  } catch (error) {
    console.error("❌ Error seeding posts:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedPosts()

