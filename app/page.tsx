import prisma from "../lib/prisma"

export default async function Home() {
  let users: Array<{
    id: number
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
  }> = []
  let error = null

  try {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  } catch (e) {
    console.error("Error fetching users:", e)
    error = "Failed to load users. Make sure your DATABASE_URL is configured."
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Users from Database
          </h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              No users yet. Create one using the API at /api/users or run{" "}
              <code className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                npm run db:test
              </code>
            </p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  <p className="text-lg font-semibold text-black dark:text-zinc-50">
                    {user.name || "No name"}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {user.email}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                    Created: {new Date(user.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
