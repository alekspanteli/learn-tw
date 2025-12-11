import "dotenv/config"  // ✅ CRITICAL: Load environment variables
import prisma from "../lib/prisma"

async function testDatabase() {
  console.log("🔍 Testing Prisma Postgres connection...\n")

  try {
    // Test 1: Check connection
    console.log("✅ Connected to database!")

    // Test 2: Create a test post
    console.log("\n📝 Creating a test post...")
    const newPost = await prisma.post.create({
      data: {
        title: "Test Post",
        content: "This is a test post to verify the database connection is working correctly.",
        author: "Test Author",
      },
    })
    console.log("✅ Created post:", newPost)

    // Test 3: Fetch all posts
    console.log("\n📋 Fetching all posts...")
    const allPosts = await prisma.post.findMany()
    console.log(`✅ Found ${allPosts.length} post(s):`)
    allPosts.forEach((post) => {
      console.log(`   - "${post.title}" by ${post.author}`)
    })

    console.log("\n🎉 All tests passed! Your database is working perfectly.\n")
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()

