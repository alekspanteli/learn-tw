import prisma from "../lib/prisma"

export default async function Home() {
  let posts: Array<{
    id: number
    title: string
    content: string
    author: string
    createdAt: Date
    updatedAt: Date
  }> = []
  let error = null

  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  } catch (e) {
    console.error("Error fetching posts:", e)
    error = "Failed to load posts. Make sure your DATABASE_URL is configured."
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            My Blog Posts!!!!!!!
          </h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              No posts yet. Run{" "}
              <code className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                pnpm run db:seed
              </code>{" "}
              to add sample posts.
            </p>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-zinc-500 dark:text-zinc-500">
                      By {post.author}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-500">
                      {post.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
