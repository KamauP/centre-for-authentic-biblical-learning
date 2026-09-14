"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-amber-50 px-4 py-8 sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* Logo / Branding */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="Center for Authentic Biblical Learning"
                width={76}
                height={76}
                priority
              />
            </Link>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-green-800">
              Center for Authentic Biblical Learning
            </p>

            <h1 className="mt-2 text-2xl font-bold text-green-950 sm:text-3xl">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage the CABL website.
            </p>
          </div>

          {/* Login Card */}
          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-green-900/10 bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-900">
                <FaLock size={15} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Welcome back
                </h2>

                <p className="text-xs text-gray-500">
                  Enter your admin credentials
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:text-green-900"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    title={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-green-900 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Back to Website */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-900 transition hover:text-yellow-600"
            >
              <FaArrowLeft size={12} />
              Back to website
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Center for Authentic Biblical Learning
          </p>
        </div>
      </div>
    </main>
  );
}

