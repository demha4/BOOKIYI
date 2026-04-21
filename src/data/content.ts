export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "Surf Packages", path: "/packages" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export const testimonials = [
  {
    name: "Sarah L.",
    country: "UK",
    rating: 5,
    text: "Hands down the best surf hostel I've ever stayed at. The vibes are unmatched, the staff feels like family, and I left a way better surfer than I arrived. Already planning my return trip!",
    avatar: "S",
  },
  {
    name: "Marco R.",
    country: "Italy",
    rating: 5,
    text: "Perfect balance of surf, chill, and community. The location in Anza is ideal - close to Taghazout but quieter. The rooms are clean, the food is amazing, and the surf guides know every spot.",
    avatar: "M",
  },
  {
    name: "Emma & Jake",
    country: "Australia",
    rating: 5,
    text: "We came for a week and stayed for three. The sunset yoga sessions on the roof, the post-surf smoothies, and the evening family dinners - this place is pure magic.",
    avatar: "E",
  },
  {
    name: "Lucas B.",
    country: "France",
    rating: 5,
    text: "As a digital nomad, I need good WiFi and a quiet workspace. Anza Surf House delivered both, plus incredible surf breaks right outside. Best coworkation ever.",
    avatar: "L",
  },
];

/* ═══════════════════════════════════════════════════════════════
   ROOM TYPES — Synced with Beds24 property 309994
   
   genderPolicy: who can stay in this room
     - "male"    → only male guests
     - "female"  → only female guests
     - "mixed"   → male or female (not couples in dorms)
     - "any"     → anyone (private rooms)
   
   beds24RoomId: The actual room ID from Beds24 dashboard
     → Find at: (SETTINGS) > Properties > Rooms
     → Replace these placeholder values with real IDs!
   ═══════════════════════════════════════════════════════════════ */

export type RoomGenderPolicy = "male" | "female" | "mixed" | "any";

export interface RoomType {
  id: string;
  beds24RoomId: string;       // Real Beds24 room ID — MUST UPDATE
  name: string;
  type: "dorm" | "private";
  genderPolicy: RoomGenderPolicy;
  price: number;              // per bed/night (dorms) or per room/night (private)
  priceUnit: "night";
  image: string;
  description: string;
  features: string[];
  size: string;
  maxGuests: number;          // max capacity (beds for dorm, people for private)
  available: boolean;         // will be overridden by Beds24 API
  availableBeds?: number;     // for dorms: how many beds still available
}

export const rooms: RoomType[] = [
  {
    id: "mixed-dorm-6",
    beds24RoomId: "645890",
    name: "Bed in 6-Bed Mixed Dormitory",
    type: "dorm",
    genderPolicy: "mixed",
    price: 14,
    priceUnit: "night",
    image: "/images/dorm-room.jpg",
    description: "Our most social room — a 6-bed mixed dorm open to all travelers. The best way to meet surfers and digital nomads from around the world.",
    features: ["Bunk beds", "Personal locker", "Shared bathroom", "AC", "WiFi", "Reading light"],
    size: "26 m²",
    maxGuests: 6,
    available: true,
    availableBeds: 6,
  },
  {
    id: "economy-double",
    beds24RoomId: "645891",
    name: "Economy Double Room",
    type: "private",
    genderPolicy: "any",
    price: 38,
    priceUnit: "night",
    image: "/images/private-room.jpg",
    description: "A cozy private double room — perfect for couples or solo travelers who want their own space at a great price.",
    features: ["Double bed", "Private space", "Shared bathroom", "AC", "WiFi", "Desk"],
    size: "14 m²",
    maxGuests: 2,
    available: true,
  },
  {
    id: "triple-room",
    beds24RoomId: "645892",
    name: "Triple Room",
    type: "private",
    genderPolicy: "any",
    price: 55,
    priceUnit: "night",
    image: "/images/hostel-living.jpg",
    description: "Spacious private room for 3 — ideal for friends traveling together or small families. Comfortable, bright, and quiet.",
    features: ["3 single beds", "Private space", "Shared bathroom", "AC", "WiFi", "Wardrobe"],
    size: "20 m²",
    maxGuests: 3,
    available: true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   SMART ROOM FILTERING
   Returns rooms available for a given guest type
   ═══════════════════════════════════════════════════════════════ */
export function getFilteredRooms(guestType: "male" | "female" | "couple"): RoomType[] {
  return rooms.filter((room) => {
    if (!room.available) return false;
    if (room.type === "dorm" && room.availableBeds !== undefined && room.availableBeds <= 0) return false;

    switch (guestType) {
      case "male":
      case "female":
        // Solo travelers → mixed dorms or private rooms
        return room.genderPolicy === "mixed" || room.genderPolicy === "any" ||
               (guestType === "male" && room.genderPolicy === "male") ||
               (guestType === "female" && room.genderPolicy === "female");
      case "couple":
        // Couples → private rooms only (no dorm bunks for couples)
        return room.genderPolicy === "any";
      default:
        return true;
    }
  });
}

export const packages = [
  {
    id: "surf-stay",
    name: "Surf & Stay",
    tagline: "The perfect intro to Moroccan surf",
    duration: "3-7 nights",
    priceFrom: 55,
    priceUnit: "night",
    image: "/images/surf-lesson.jpg",
    description: "Our most popular package combining comfortable accommodation with daily surf sessions. Ideal for those who want flexibility.",
    includes: [
      "Accommodation in shared dorm or private room",
      "Daily surfboard & wetsuit rental",
      "Beach transport to best spots",
      "Breakfast & dinner",
      "Sunset yoga session (1x)",
      "Free WiFi & coworking space",
    ],
    bestFor: ["Solo travelers", "Couples", "Short stays"],
  },
  {
    id: "beginner-camp",
    name: "Beginner Surf Camp",
    tagline: "From zero to standing up",
    duration: "7 nights",
    priceFrom: 420,
    priceUnit: "total",
    image: "/images/surf-camp.jpg",
    description: "A complete week-long experience designed for first-time surfers. You'll be riding white water by day 3 and green waves by the end of the week.",
    includes: [
      "7 nights accommodation",
      "5 days of surf lessons (2hrs/day)",
      "All equipment provided",
      "Professional ISA-certified instructors",
      "Daily breakfast, lunch & dinner",
      "Video analysis session",
      "3 sunset yoga classes",
      "Airport pickup from Agadir",
    ],
    bestFor: ["Complete beginners", "Solo travelers", "Groups of friends"],
  },
  {
    id: "weekly-experience",
    name: "Weekly Surf Experience",
    tagline: "For intermediate surfers ready to progress",
    duration: "7 nights",
    priceFrom: 380,
    priceUnit: "total",
    image: "/images/hero-surf.jpg",
    description: "Already know the basics? This package focuses on progression, guiding you to the best breaks around Taghazout, Tamraght, and Anza.",
    includes: [
      "7 nights accommodation",
      "5 guided surf sessions",
      "Equipment rental",
      "Local surf guide & spot knowledge",
      "Daily breakfast & dinner",
      "Skate park access",
      "2 yoga sessions",
      "Day trip to Paradise Valley",
    ],
    bestFor: ["Intermediate surfers", "Digital nomads", "Adventure seekers"],
  },
];

export const experiences = [
  {
    title: "Daily Surf Sessions",
    description: "World-class breaks at Anza, Taghazout, and Tamraght with local guides who know every swell.",
    icon: "Waves",
  },
  {
    title: "Sunset Yoga",
    description: "Rooftop yoga sessions as the sun dips into the Atlantic. Reset your body after a day in the water.",
    icon: "Sun",
  },
  {
    title: "Skate & Chill",
    description: "Our in-house skate ramp and proximity to Taghazout skate park mean the fun doesn't stop when the surf goes flat.",
    icon: "Zap",
  },
  {
    title: "Local Adventures",
    description: "Explore Paradise Valley, Agadir souks, and hidden beaches with our organized trips.",
    icon: "MapPin",
  },
  {
    title: "Community Dinners",
    description: "Family-style dinners every evening. Share stories, make friends, and taste authentic Moroccan cuisine.",
    icon: "Users",
  },
  {
    title: "Digital Nomad Friendly",
    description: "High-speed WiFi, quiet workspaces, and a community of remote workers who surf between meetings.",
    icon: "Wifi",
  },
];

export const galleryImages = [
  { src: "/images/hero-surf.jpg", alt: "Surfing in Taghazout Morocco", category: "Surf" },
  { src: "/images/surf-camp.jpg", alt: "Surf camp group in Agadir", category: "Community" },
  { src: "/images/yoga-sunset.jpg", alt: "Sunset yoga in Morocco", category: "Yoga" },
  { src: "/images/hostel-living.jpg", alt: "Surf hostel common area", category: "Hostel" },
  { src: "/images/private-room.jpg", alt: "Private room Anza surf hostel", category: "Rooms" },
  { src: "/images/dorm-room.jpg", alt: "Shared dorm room surf hostel", category: "Rooms" },
  { src: "/images/moroccan-sunset.jpg", alt: "Sunset over Atlantic Morocco", category: "Scenery" },
  { src: "/images/surf-lesson.jpg", alt: "Surf lesson in Morocco", category: "Surf" },
];

export const faqs = [
  {
    question: "What's the best time to surf in Taghazout?",
    answer: "Morocco offers year-round surfing! Winter (Oct-Mar) brings bigger swells for intermediates, while summer (Apr-Sep) is perfect for beginners with smaller, gentler waves.",
  },
  {
    question: "Do I need to bring my own surfboard?",
    answer: "Not at all! We have a full quiver of boards available for all levels - from soft tops for beginners to performance shortboards. Wetsuits are also provided.",
  },
  {
    question: "How do I get to Anza from Agadir airport?",
    answer: "It's a 45-minute drive from Agadir Al Massira Airport (AGA). We offer airport pickups for all package bookings, or you can grab a taxi for around 300-400 MAD.",
  },
  {
    question: "Is WiFi good enough for remote work?",
    answer: "Absolutely! We have high-speed fiber internet throughout the hostel with dedicated coworking spaces. Many digital nomads call Anza Surf House home for months.",
  },
  {
    question: "Can I book single nights or do I need a package?",
    answer: "You can book individual nights! Use our booking system to select your dates. Packages are great value if you're staying a week or more.",
  },
  {
    question: "What should I pack?",
    answer: "Sunscreen, a reusable water bottle, comfortable clothes for surf/yoga, and a light jacket for evenings. Everything else you need, we've got you covered!",
  },
];

export const whyChooseUs = [
  {
    title: "Prime Location",
    description: "Walking distance to Anza beach and a short drive to Taghazout, Tamraght, and 10+ surf breaks.",
    stat: "10+",
    statLabel: "Nearby breaks",
  },
  {
    title: "Expert Guides",
    description: "Our ISA-certified instructors have decades of combined experience in Moroccan waters.",
    stat: "15+",
    statLabel: "Years experience",
  },
  {
    title: "Community Vibes",
    description: "Join a global family of surfers, nomads, and adventurers. Many guests return year after year.",
    stat: "500+",
    statLabel: "Happy guests/year",
  },
  {
    title: "All-Inclusive Comfort",
    description: "From airport pickup to daily meals, we handle the details so you can focus on the waves.",
    stat: "100%",
    statLabel: "Guest satisfaction",
  },
];
