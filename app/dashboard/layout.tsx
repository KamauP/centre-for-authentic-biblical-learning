"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartPie,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaImages,
  FaPrayingHands,
  FaEnvelope,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: FaChartPie,
  },
  {
    name: "Homepage",
    href: "/dashboard/homepage",
    icon: FaHome,
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: FaBook,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: FaCalendarAlt,
  },
  {
    name: "Resources",
    href: "/dashboard/resources",
    icon: FaFileAlt,
  },
  {
    name: "Gallery",
    href: "/dashboard/gallery",
    icon: FaImages,
  },
];

const communication = [
  {
    name: "Prayer Requests",
    href: "/dashboard/prayer-requests",
    icon: FaPrayingHands,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: FaEnvelope,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const supabase = createClient();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div className="flex items-center justify-between border-b border-green-800 px-5 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-yellow-400">
            CABL
          </p>

          <h1 className="mt-1 text-xl font-bold text-white">
            Admin Profile
          </h1>
        </div>

        {/* Close button - mobile only */}
        <button
          onClick={closeMobileMenu}
          className="rounded-lg p-2 text-white hover:bg-green-800 lg:hidden"
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-green-300">
          Main
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-green-900 shadow-sm"
                    : "text-green-50 hover:bg-green-800"
                }`}
              >
                <Icon
                  className={
                    active ? "text-green-800" : "text-green-300"
                  }
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="my-6 border-t border-green-800" />

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-green-300">
          Communication
        </p>

        <div className="space-y-1">
          {communication.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-green-900 shadow-sm"
                    : "text-green-50 hover:bg-green-800"
                }`}
              >
                <Icon
                  className={
                    active ? "text-green-800" : "text-green-300"
                  }
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-green-800 p-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-green-50 transition hover:bg-green-800"
        >
          <FaGlobe className="text-green-300" />
          <span>View Website</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-green-50 transition hover:bg-green-800"
        >
          <FaSignOutAlt className="text-green-300" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 bg-green-950 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[280px] bg-green-950 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main Area */}
      <div className="min-h-screen lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 text-green-900 hover:bg-green-50"
            aria-label="Open menu"
          >
            <FaBars size={20} />
          </button>

          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
              Center for
            </p>

            <p className="text-sm font-bold text-green-900">
              CABL Admin
            </p>
          </div>

          <div className="w-9" />
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:min-h-screen lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

