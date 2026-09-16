import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={clsx("mb-12", centered ? "text-center" : "text-left", className)}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d3748] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[#718096] font-medium max-w-2xl text-lg" style={{ marginLeft: centered ? 'auto' : '0', marginRight: centered ? 'auto' : '0' }}>
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mx-auto mt-6 rounded-full"></div>
      )}
      {!centered && (
        <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mt-6 rounded-full"></div>
      )}
    </div>
  );
}
