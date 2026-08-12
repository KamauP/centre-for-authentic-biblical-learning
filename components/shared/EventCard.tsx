type EventCardProps = {
  month: string;
  day: string;
  title: string;
  location: string;
};

export default function EventCard({
  month,
  day,
  title,
  location,
}: EventCardProps) {
  return (
    <div className="flex gap-4">
      <div className="bg-green-800 text-white rounded-lg w-16 h-16 flex flex-col items-center justify-center">
        <span className="text-xs">{month}</span>
        <span className="font-bold text-lg">{day}</span>
      </div>

      <div>
        <h4 className="font-semibold text-green-900">
          {title}
        </h4>

        <p className="text-sm text-gray-600">
          {location}
        </p>
      </div>
    </div>
  );
}