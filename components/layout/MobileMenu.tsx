"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";

const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Approach to Learning", href: "/approach" },
  { name: "Courses & Training", href: "/courses" },
  { name: "Creation's Notebook", href: "/notebook" },
  { name: "Teaching Gallery", href: "/gallery" },
  { name: "Articles & Resources", href: "/resources" },
  { name: "Events", href: "/events" },
  { name: "Support the Ministry", href: "/support" },
  { name: "Contact Us", href: "/contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-green-900"
        aria-label="Toggle navigation menu"
      >
        {open ? (
          <FaXmark className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative border-b border-gray-100 px-6 py-3 text-sm ${
                    isActive
                      ? "bg-[#F5F0E4] font-semibold text-green-900"
                      : "text-gray-800"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-green-900" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}