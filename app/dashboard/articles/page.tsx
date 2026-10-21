
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ArticleManager from "@/components/articles/ArticleManager";

export default async function DashboardArticlesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return (
      <div className="rounded-xl border border-[#E8E1D3] bg-[#FDFCF8] p-8">
        <h1 className="text-xl font-bold text-[#294638]">
          Access Denied
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          You do not have permission to manage CABL articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#B8860B]">
          CENTER FOR AUTHENTIC BIBLICAL LEARNING
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#294638]">
          Articles
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Publish and manage biblical teachings and learning articles.
        </p>
      </div>

      <ArticleManager userId={user.id} />
    </div>
  );
}
