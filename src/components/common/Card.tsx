import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface CardProps {
  image: string;
  title: string;
  description?: string;
  link?: string;
  badge?: string;
  className?: string;
}

export function Card({ image, title, description, link, badge, className }: CardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf2f7] flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-accent text-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#2d3748] mb-2 group-hover:text-[#3f51b5] transition">{title}</h3>
        {description && <p className="text-[#718096] font-medium text-sm mb-4 line-clamp-3">{description}</p>}
        {link && (
          <span className="inline-flex items-center text-[#3f51b5] font-bold text-sm transition mt-auto">
            View Details <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        )}
      </div>
    </>
  );

  const wrapperClass = clsx(
    "group flex flex-col rounded-3xl overflow-hidden h-full neo-button border-[6px] border-[#e0e5ec]",
    className
  );

  if (link) {
    return (
      <Link href={link} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
