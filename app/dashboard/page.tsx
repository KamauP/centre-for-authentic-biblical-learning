import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  // Total page views
  const { count: totalViews } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "page_view");

  // Page views today
  const { count: todayViews } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "page_view")
    .gte("created_at", startOfToday.toISOString());

  // Page views this month
  const { count: monthViews } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "page_view")
    .gte("created_at", startOfMonth.toISOString());

  // Prayer requests
  const { count: prayerRequests } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "prayer_request");

  // Messages
  const { count: messages } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "message_sent");

  // Most visited pages
  const { data: pageViews } = await supabase
    .from("analytics_events")
    .select("page")
    .eq("event_type", "page_view")
    .not("page", "is", null);

  const pageCounts: Record<string, number> = {};

  pageViews?.forEach((event) => {
    if (!event.page) return;

    pageCounts[event.page] = (pageCounts[event.page] || 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
    
const { data: profile } = await supabase
  .from("profiles")
  .select("full_name")
  .eq("id", user?.id)
  .single();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#B8860B]">
          CENTER FOR AUTHENTIC BIBLICAL LEARNING
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#294638]">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Welcome back, {profile?.full_name || "Admin"}
        </p>
      </div>

      {/* Main stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Page Views"
          value={totalViews ?? 0}
          subtitle="All time"
        />

        <DashboardCard
          title="This Month"
          value={monthViews ?? 0}
          subtitle="Page views"
        />

        <DashboardCard
          title="Prayer Requests"
          value={prayerRequests ?? 0}
          subtitle="Total submitted"
        />

        <DashboardCard
          title="Messages"
          value={messages ?? 0}
          subtitle="Total received"
        />
      </div>

      {/* Today */}
      <div className="rounded-xl bg-[#00552F] p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-green-100">
          TODAY
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold">
              {todayViews ?? 0}
            </p>

            <p className="mt-1 text-sm text-green-100">
              Page views today
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm text-green-100">
              Website activity
            </p>
            <p className="text-lg font-semibold">
              Live
            </p>
          </div>
        </div>
      </div>

      {/* Most visited pages */}
      <div className="rounded-xl border border-[#E8E1D3] bg-[#FDFCF8] p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#294638]">
            Most Visited Pages
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Pages receiving the most views on the website.
          </p>
        </div>

        {topPages.length > 0 ? (
          <div className="space-y-3">
            {topPages.map(([page, count], index) => (
              <div
                key={page}
                className="flex items-center justify-between rounded-lg bg-[#F5F0E4] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00552F] text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {page}
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#00552F]">
                  {count} views
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No page-view data yet.
          </p>
        )}
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-[#E8E1D3] bg-[#FDFCF8] p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-[#00552F]">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}