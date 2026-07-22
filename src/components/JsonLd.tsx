import { siteInfo } from "../data/content";

export default function JsonLd() {
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "name": "Tamount Surf House",
    "alternateName": "TAMOUNT Surf House",
    "description": "Small, family-run surf hostel in Anza Beach, Agadir, Morocco. Dorm beds and private rooms with breakfast included, rooftop terrace, surf lessons, and local experiences like Paradise Valley and sand dunes trips.",
    "url": "https://www.tamountsurfhouse.com",
    "telephone": `+${siteInfo.whatsapp}`,
    "email": siteInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bloc B N1 Anza",
      "addressLocality": "Agadir",
      "addressRegion": "Souss-Massa",
      "postalCode": "80000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.4365,
      "longitude": -9.6575
    },
    "priceRange": "€15 - €55",
    "checkinTime": "14:00",
    "checkoutTime": "11:00",
    "currenciesAccepted": "EUR, MAD",
    "paymentAccepted": "Cash",
    "numberOfRooms": 3,
    "petsAllowed": false,
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "16",
      "bestRating": "5"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Rooftop Terrace", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Surf Lessons", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Breakfast Included", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Surfboard Storage", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Airport Transfer", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Laundry Service", "value": true }
    ],
    "image": [
      "https://www.tamountsurfhouse.com/images/hero-surf.jpg",
      "https://www.tamountsurfhouse.com/images/rooftop-view.jpg",
      "https://www.tamountsurfhouse.com/images/dorm-room.jpg",
      "https://www.tamountsurfhouse.com/images/private-room.jpg",
      "https://www.tamountsurfhouse.com/images/hostel-living.jpg",
      "https://www.tamountsurfhouse.com/images/breakfast.jpg"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rooms & Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Bed in 8-Bed Mixed Dormitory",
          "description": "Shared dorm with bunk beds, privacy curtains, lockers, reading lights, and power sockets. Breakfast included.",
          "price": "15",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.tamountsurfhouse.com/rooms"
        },
        {
          "@type": "Offer",
          "name": "Economy Double Room",
          "description": "Private room with queen bed, shared bathroom, fast WiFi, and rooftop access. Breakfast included.",
          "price": "45",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.tamountsurfhouse.com/rooms"
        },
        {
          "@type": "Offer",
          "name": "Triple Room",
          "description": "Private room with twin and queen bed, rooftop terrace access, shared bathroom. Sleeps up to 3. Breakfast included.",
          "price": "50",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.tamountsurfhouse.com/rooms"
        },
        {
          "@type": "Offer",
          "name": "Surf Camp Pack",
          "description": "Daily surf lessons, board and wetsuit, breakfast and dinner, transport to surf spots, and video analysis. Billed per person per day on top of room.",
          "price": "45",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.tamountsurfhouse.com/packages/surf-camp"
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/tamountsurfhouse/",
      "https://www.booking.com/hotel/ma/tamount-surf-house.html",
      "https://www.tripadvisor.com/Hotel_Review-g293731-d33105185-Reviews-Tamount_Surf_House-Agadir_Souss_Massa.html"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a room at Tamount Surf House?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Book directly on our website at tamountsurfhouse.com/book. Pick your dates, choose a room, and confirm. You can pay a 30% deposit by bank transfer for instant confirmation, or book now and pay on arrival. We also accept bookings via WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "Is breakfast included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A fresh homemade Moroccan breakfast is included every morning with your stay — served on the rooftop terrace when the weather is good."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Anza Beach from the hostel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "About a 3-4 minute walk. You can hear the waves from the rooftop terrace."
        }
      },
      {
        "@type": "Question",
        "name": "Is Anza Beach good for beginner surfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. On gentle days Anza is great for beginners. When conditions suit more advanced surfers, we take beginners to softer beach breaks nearby like Tamraght or Taghazout."
        }
      },
      {
        "@type": "Question",
        "name": "What is the cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For deposit bookings: free cancellation up to 48 hours before check-in. For pay-on-arrival bookings: free cancellation up to 7 days before check-in. No questions asked."
        }
      },
      {
        "@type": "Question",
        "name": "Can you arrange airport pickup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Send us your flight details via WhatsApp and we can arrange a taxi from Agadir Al Massira Airport for €25."
        }
      },
      {
        "@type": "Question",
        "name": "What activities are available besides surfing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Paradise Valley day trips, sand dunes excursions, skate park sessions, yoga, hammam visits, and more. All bookable as add-ons when you reserve your stay."
        }
      }
    ]
  };


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
