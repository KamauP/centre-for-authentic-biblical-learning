import Link from "next/link";
import Image from "next/image";
import FooterLinks from "./FooterLinks";
import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaRss,
  } from "react-icons/fa";
  import { SiSubstack } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#0c4b2d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">

              <Image
                src="/images/logo.png"
                alt="CABL Logo"
                width={52}
                height={52}
              />

              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-wider">
                  Centre for
                </p>

                <h2 className="text-xl font-bold">
                  AUTHENTIC
                </h2>

                <p className="text-[10px] uppercase tracking-wider text-yellow-300">
                  Biblical Learning
                </p>
              </div>

            </Link>

            <p className="text-sm text-gray-200 leading-6 mb-5">
              Igniting a Passion for the
              Authentic Knowledge of God's Word.
            </p>

            <div className="flex gap-4 text-lg mb-6">

              <a
                href="https://www.facebook.com/share/1DVwxkTtDy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-yellow-300 transition" />
              </a>

              {/*  <a
                href="#"
                aria-label="YouTube"
              >
                <FaYoutube className="hover:text-yellow-300 transition" />
              </a>*/}

              <a
                href="https://open.substack.com/pub/eshcol/p/adam-and-eve-and-the-human-instinct?utm_source=share&utm_medium=android&r=8f70gp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
              >
               <SiSubstack className="hover:text-yellow-400 transition" />
              </a>

              <a
                href="https://whatsapp.com/channel/0029Vb84hadKWEL046VazN3j"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-yellow-300 transition" />
              </a>

              <a
                href="/contact"
                aria-label="Contact Us"
              >
                <FaEnvelope className="hover:text-yellow-300 transition" />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-base font-semibold text-yellow-300 mb-4">
              Quick Links
            </h3>

            <li>
              <Link href="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-yellow-300">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/approach" className="hover:text-yellow-300">
                Our Approach to learning
              </Link>
            </li>

            <li>
              <Link href="/support" className="hover:text-yellow-300">
                Support the Ministry
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-yellow-300">
                Contact Us
              </Link>
            </li>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-base font-semibold text-yellow-300 mb-4">
              Resources
            </h3>

            <ul className="space-y-2 text-sm text-gray-200">

              <li>
                <Link href="/resources" className="hover:text-yellow-300">
                  Articles & Resources
                </Link>
              </li>

              <li>
                <Link href="/events" className="hover:text-yellow-300">
                  Events
                </Link>
              </li>

              <li>
                <Link href="/courses" className="hover:text-yellow-300">
                  Courses & Training
                </Link>
              </li>

              <li>
                <Link href="/notebook" className="hover:text-yellow-300">
                  Creation's Notebook
                </Link>
              </li>

              <li>
                <Link href="/gallery" className="hover:text-yellow-300">
                  Teaching Gallery
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="min-w-0">

            <h3 className="text-base font-semibold text-yellow-300 mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm text-gray-200">

              {/*  <div className="flex gap-3">

                <FaMapMarkerAlt className="text-yellow-300 mt-1 shrink-0" />

                <div>
                  <p>--</p>
                  <p>Nairobi, Kenya</p>
                </div>

              </div>*/}

              <div className="flex items-center gap-3">

                <FaPhoneAlt className="text-yellow-300 shrink-0" />

                <p>+254 792382202</p>

              </div>

              {/*  <div className="flex items-center gap-3">

                <FaEnvelope className="text-yellow-300 shrink-0" />

                <p>--</p>

              </div>*/}

              <div className="flex items-start gap-3 min-w-0">

                <FaGlobe className="text-yellow-300 shrink-0 mt-1" />

                <p className="min-w-0 break-words text-sm">
                  www.centerforauthenticbiblicallearning.org
                </p>

              </div>

            </div>

          </div>

          {/* Scripture */}

          <div className="min-w-0">

            <h3 className="text-base font-semibold text-yellow-300 mb-4">
              Scripture Foundation
            </h3>

            <p className="text-sm text-gray-200 leading-6">
              Study to shew thyself approved unto God,
              a workman that needeth not to be ashamed,
              rightly dividing the Word of Truth.
            </p>

            <p className="text-yellow-300 font-semibold mt-4">
              — 2 Timothy 2:15 (KJV)
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-sm bg-green-950 py-1">
        <p className="text-center md:text-left text-gray-300">
          © 2025 Centre for Authentic Biblical Learning. All Rights Reserved.
        </p>

        <p className="text-center md:text-right text-yellow-300 font-semibold">
          To God be the Glory!
        </p>
      </div>

    </footer>
  );
}