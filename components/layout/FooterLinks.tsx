import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function FooterLinks() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/approach", label: "Our Approach to Learning" },
    { href: "/courses", label: "Courses & Training" },
    { href: "/notebook", label: "Creation's Notebook" },
    { href: "/gallery", label: "Teaching Gallery" },
    { href: "/resources", label: "Articles & Resources" },
    { href: "/events", label: "Events" },
    { href: "/support", label: "Support the Ministry" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <FaChevronRight className="text-yellow-400 text-xs" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}