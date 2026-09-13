import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-green-900 p-6 text-white">
        <h1 className="text-2xl font-bold">
          CABL Admin
        </h1>

        <nav className="mt-8 space-y-2">
          <Link
            href="/dashboard"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Overview
          </Link>

          <Link
            href="/dashboard/courses"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Courses
          </Link>

          <Link
            href="/dashboard/events"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Events
          </Link>

          <Link
            href="/dashboard/resources"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Resources
          </Link>

          <Link
            href="/dashboard/gallery"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Gallery
          </Link>

          <Link
            href="/dashboard/homepage"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Homepage
          </Link>

          <div className="my-4 border-t border-green-700" />

          <Link
            href="/dashboard/prayer-requests"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Prayer Requests
          </Link>

          <Link
            href="/dashboard/messages"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Messages
          </Link>

          <Link
            href="/dashboard/analytics"
            className="block rounded px-4 py-3 hover:bg-green-800"
          >
            Analytics
          </Link>
        </nav>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}