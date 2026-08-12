import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinkss";
import MobileMenu from "./MobileMenu";
import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-950 text-white text-[12px]">
        <div className="max-w-7xl mx-auto px-8 h-8 flex items-center justify-between">

          <p className="hidden md:block text-yellow-400">
            "Rightly Dividing the Word of Truth" (2 Timothy 2:15)
          </p>

          <div className="flex items-center gap-4 ml-auto">

            <a href="Follow the Center for Authentic Biblical Learning channel on WhatsApp: https://whatsapp.com/channel/0029Vb84hadKWEL046VazN3j">
              <FaFacebookF className="hover:text-yellow-400 transition" />
            </a>

            <a href="#">
              <FaYoutube className="hover:text-yellow-400 transition" />
            </a>

            <a href="#">
              <FaWhatsapp className="hover:text-yellow-400 transition" />
            </a>

            <a href="#">
              <FaEnvelope className="hover:text-yellow-400 transition" />
            </a>

          </div>

        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm">

        <div className="relative max-w-[1220px] mx-auto px-6 h-[74px] flex items-center">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-4 w-[260px] shrink-0">

            <Image
              src="/images/logo.png"
              alt="CABL Logo"
              width={48}
              height={48}
            />

            <div className="leading-tight">
 <p className="text-[11px] uppercase tracking-wide text-gray-700">
  CENTRE FOR
</p>

<h2 className="text-[17px] font-bold text-green-900 leading-none">
  AUTHENTIC
</h2>

<p className="text-[11px] uppercase tracking-wide text-gray-700">
  BIBLICAL LEARNING
</p>
</div>

          </Link>

          {/* Navigation */}

      <nav
  className="
    hidden
    lg:flex
    flex-1
    justify-between
    items-center
    text-[13px]
    font-normal
    text-gray-800
    ml-6
  "
>
  <NavLinks />
  <MobileMenu />
</nav>

        </div>

      </header>
    </>
  );
}