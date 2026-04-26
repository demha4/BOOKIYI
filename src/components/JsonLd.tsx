export default function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Tamount Surf House",
    "description": "Small, family-run surf hostel in Anza Beach, Agadir. Dorm beds and private rooms with rooftop terrace, surf lessons, and local trips.",
    "url": "https://tamountsurfhouse.com",
    "telephone": "+212612345678",
    "email": "tamountsurfhouse@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Anza Beach",
      "addressLocality": "Agadir",
      "postalCode": "80000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.51,
      "longitude": -9.68
    },
    "priceRange": "€20 - €150",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4.9"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Rooftop Terrace", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Surf Lessons", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Breakfast Included", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Shared Kitchen", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Surfboard Storage", "value": true }
    ],
    "image": [
      "https://tamountsurfhouse.com/images/hero-surf.jpg",
      "https://tamountsurfhouse.com/images/dorm-room.jpg",
      "https://tamountsurfhouse.com/images/private-room.jpg",
      "https://tamountsurfhouse.com/images/hostel-living.jpg"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a room?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The easiest way is WhatsApp. Send us your dates and how many of you there are. We usually reply fast and confirm availability directly. No deposit required if you book direct."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a deposit or prepayment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No deposit for direct bookings. You pay on arrival unless we agree something different for a special group stay."
        }
      },
      {
        "@type": "Question",
        "name": "How far is the beach?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Three minutes on foot. You can hear the ocean from the rooftop."
        }
      },
      {
        "@type": "Question",
        "name": "Is Anza good for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. On gentle days Anza is a great place to start, and when conditions are better elsewhere we take beginners to softer beach breaks nearby."
        }
      },
      {
        "@type": "Question",
        "name": "Can you arrange airport pickup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Just send us your flight details and we can organize a transfer from Agadir airport."
        }
      },
      {
        "@type": "Question",
        "name": "Is breakfast included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Moroccan breakfast is included with the stay and served fresh every morning."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dorm Bed at Tamount Surf House",
    "description": "8-bed mixed dormitory with lockers, reading lights, power sockets, and shared bathroom. Breakfast included.",
    "brand": {
      "@type": "Brand",
      "name": "Tamount Surf House"
    },
    "offers": {
      "@type": "Offer",
      "price": "12",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://tamountsurfhouse.com/rooms"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  );
}
