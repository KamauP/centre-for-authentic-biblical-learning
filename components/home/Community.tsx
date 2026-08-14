import TeachingCard from "@/components/shared/TeachingCard";
import EventCard from "@/components/shared/EventCard";

export default function Community() {
  return (
    <section className="bg-[#faf8f2] py-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Latest Teachings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-900">
              Latest Teachings
            </h2>

            <a
              href="/gallery"
              className="text-sm text-green-700 hover:underline"
            >
              View All 
            </a>
          </div>

          <div className="space-y-3">
            <TeachingCard
              image="/images/home/teaching1.jpg"
              title="The Sower and the Seed"
              date=""
              href="/gallery"
            />

            <TeachingCard
              image="/images/home/teaching2.jpg"
              title="Balaam and the Donkey"
              date=""
              href="/gallery"
            />

            <TeachingCard
              image="/images/home/teaching3.jpg"
              title="Elijah Taken Up"
              date=""
              href="/gallery"
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-900">
              Upcoming Events
            </h2>

            <a
              href="/events"
              className="text-sm text-green-700 hover:underline"
            >
              View All 
            </a>
          </div>

          <div className="space-y-3">
            <EventCard
              month="--"
              day="--"
              title="Bible Teaching Seminar"
              location="Nairobi, Kenya"
            />

            <EventCard
              month="--"
              day="--"
              title="Discipleship Retreat"
              location="Naivasha"
            />

            <EventCard
              month="--"
              day="--"
              title="Bible Study Workshop"
              location="Kisumu"
            />
          </div>
        </div>

        {/* Join Community */}
        <div className="bg-[#f3ead7] border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold text-green-900 mb-3">
            Join Our Community
          </h2>

          <p className="text-sm text-gray-600 leading-6 mb-4">
            Receive Bible teachings, ministry updates and upcoming
            event notifications directly in your inbox.
          </p>

          <input
  type="email"
  placeholder="Enter your email"
  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 mb-4"
/>
<button className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition">
  SUBSCRIBE
</button>

          <div className="mt-5 border-t pt-4">
            <p className="italic text-sm text-gray-600">
              "How beautiful are the feet of them that preach the gospel of peace..."
            </p>

            <p className="mt-2 font-semibold text-green-900">
              Romans 10:15
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}