"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/utils/analytics";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    trackEvent({
      event_type: "page_view",
      page: pathname,
    });
  }, [pathname]);

  return null;
}