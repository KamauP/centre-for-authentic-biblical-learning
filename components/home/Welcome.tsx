import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <section className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Image */}
          <div className="relative h-[320px] rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/home/welcome.jpg"
              alt="Bible Study"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl font-bold text-green-900 leading-tight mb-4">
              Welcome to the Center for
              <br />
              Authentic Biblical Learning
            </h2>

            <p className="text-gray-700 leading-7 mb-4">
              We are a Christ-centered ministry committed to making the
              timeless truth of God's Word simple to understand,
              relevant to daily life and powerful for transformation.
            </p>

            <p className="text-gray-700 leading-7 mb-6">
              Through sound teaching, practical application and lessons
              drawn from creation and everyday life, we help believers
              of all ages grow in faith, wisdom and purpose.
            </p>

            <Link
              href="/approach"
              className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              OUR APPROACH TO LEARNING →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}