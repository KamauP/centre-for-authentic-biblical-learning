import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://centerforauthenticbiblicallearning.org"
  ),

  title: {
    default: "Center for Authentic Biblical Learning",
    template: "%s | Center for Authentic Biblical Learning",
  },

  description:
    "Center for Authentic Biblical Learning is a Christian ministry organization in Kenya focused on biblical learning, biblical teaching, Bible study, and Christian education.",

  applicationName: "Center for Authentic Biblical Learning",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Center for Authentic Biblical Learning",
    description:
      "A Christian ministry organization in Kenya focused on biblical learning, biblical teaching, Bible study, and Christian education.",
    url: "https://centerforauthenticbiblicallearning.org",
    siteName: "Center for Authentic Biblical Learning",
    locale: "en_KE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Center for Authentic Biblical Learning",
    description:
      "Biblical learning, biblical teaching, Bible study, and Christian education in Kenya.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-amber-50">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}