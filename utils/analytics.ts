import { createClient } from "@/utils/supabase/client";

type AnalyticsEvent = {
  event_type: string;
  page?: string;
  content_type?: string;
  content_id?: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent({
  event_type,
  page,
  content_type,
  content_id,
  metadata,
}: AnalyticsEvent) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("analytics_events")
      .insert({
        event_type,
        page,
        content_type,
        content_id,
        metadata,
      });

    if (error) {
      console.error("Analytics error:", error);
    }
  } catch (error) {
    console.error("Analytics tracking failed:", error);
  }
}