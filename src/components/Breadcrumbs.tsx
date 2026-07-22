import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const SITE_URL = "https://www.tamountsurfhouse.com";

export default function Breadcrumbs({ items, variant = "default" }: { items: BreadcrumbItem[]; variant?: "default" | "hero" }) {
  const location = useLocation();

  const chain: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: chain.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : `${SITE_URL}${location.pathname}`,
    })),
  };

  const isHero = variant === "hero";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={isHero
          ? "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
          : "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-2"
        }
      >
        <ol className={`flex items-center justify-${isHero ? "center" : "start"} gap-1.5 text-xs flex-wrap ${
          isHero ? "text-white/50" : "text-stone-400"
        }`}>
          {chain.map((item, i) => {
            const isLast = i === chain.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight size={12} className={isHero ? "text-white/30 shrink-0" : "text-stone-300 shrink-0"} />
                )}
                {isLast ? (
                  <span className={`font-medium truncate max-w-[200px] ${
                    isHero ? "text-white/80" : "text-stone-600"
                  }`}>
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    to={item.href}
                    className={`transition-colors flex items-center gap-1 ${
                      isHero ? "hover:text-white/80" : "hover:text-ocean"
                    }`}
                  >
                    {i === 0 && <Home size={12} />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
