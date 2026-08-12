"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative h-[74px] flex items-center text-center transition-colors duration-200 ${
              isActive
                ? "text-green-900"
                : "text-gray-800 hover:text-green-900"
            }`}
          >
            <span className="leading-tight">
              {link.name}
            </span>

            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] bg-green-900" />
            )}
          </Link>
        );
      })}
    </>
  );
}