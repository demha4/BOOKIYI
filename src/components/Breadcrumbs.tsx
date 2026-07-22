import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Visual breadcrumbs + inline JSON-LD following Google Search Central guidelines.
 * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 *
 * Usage: <Breadcrumbs items={[{ label: "Rooms", href: "/rooms" }]} />
 * The "Home" crumb is always prepended automatically.
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const SITE_URL = "https://www.tamountsurfhouse.com";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const location = useLocation();

  // Build the full chain: Home → ...items → current (last item, no link)
  const chain: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  // JSON-LD BreadcrumbList per Google's spec
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-2"
      >
        <ol className="flex items-center gap-1.5 text-xs text-stone-400 flex-wrap">
          {chain.map((item, i) => {
            const isLast = i === chain.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight size={12} className="text-stone-300 shrink-0" />
                )}
                {isLast ? (
                  <span className="text-stone-600 font-medium truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    to={item.href}
                    className="hover:text-ocean transition-colors flex items-center gap-1"
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
