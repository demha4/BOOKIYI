import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
}

const SITE_URL = "https://tamountsurfhouse.com";
const DEFAULT_OG_IMAGE = "/images/hero-surf.jpg";

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = `${title} | Tamount Surf House`;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOGTag("og:title", `${title} | Tamount Surf House`);
    updateOGTag("og:description", description);
    updateOGTag("og:image", ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`);
    updateOGTag("og:type", ogType);
    updateOGTag("og:url", canonical || SITE_URL);
    updateOGTag("twitter:card", "summary_large_image", false);
    updateOGTag("twitter:title", `${title} | Tamount Surf House`, false);
    updateOGTag("twitter:description", description, false);
    updateOGTag("twitter:image", ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`, false);

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Cleanup on unmount (restore defaults)
    return () => {
      document.title = "Tamount Surf House | Surf Hostel in Anza, Agadir";
      const defaultDesc = document.querySelector('meta[name="description"]');
      if (defaultDesc) {
        defaultDesc.setAttribute(
          "content",
          "Tamount Surf House is a small, family-run surf hostel in Anza Beach, Agadir. Dorm beds and private rooms from €12/night, rooftop terrace, surf lessons, and local trips."
        );
      }
    };
  }, [title, description, canonical, ogImage, ogType]);

  return null;
}
