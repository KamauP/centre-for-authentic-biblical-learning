type SectionTitleProps = {
  subtitle: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  subtitle,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <p className="text-yellow-500 font-semibold uppercase tracking-widest mb-2">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold text-green-900 mb-5">
        {title}
      </h2>

      {description && (
        <p className="text-gray-600 leading-8">
          {description}
        </p>
      )}
    </div>
  );
}