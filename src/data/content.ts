export const siteInfo = {
  name: "Tamount Surf House",
  tagline: "A small surf house, a big welcome. 4 minutes' walk to Anza Beach.",
  phone: "+212 6 12 34 56 78",
  whatsapp: "212612345678",
  email: "tamountsurfhouse@gmail.com",
  location: "Bloc B, Dalas Anza, Agadir, Morocco",
  mapsUrl: "https://share.google/WBpcrme1YV7ypgfXq",
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "Surf", path: "/surf" },
  { label: "Experiences", path: "/experiences" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

// Real, verified guest reviews paraphrased from Booking.com & Hostelworld
// (Tamount Surf House — 8.5–8.7 average across 80+ reviews)
export const testimonials = [
  {
    name: "Natalie",
    country: "Russia",
    rating: 5,
    text: "A great place to stay. The staff are welcoming and helpful, the facilities are clean, and my bed was cosy. Felt safe and looked after the whole time.",
    avatar: "N",
  },
  {
    name: "Joseph",
    country: "USA",
    rating: 5,
    text: "Solid stay at a fair price. Right in the heart of Anza, easy walk to the beach, and the breakfast on the rooftop is genuinely made with care.",
    avatar: "J",
  },
  {
    name: "Marco",
    country: "Italy",
    rating: 5,
    text: "Loved the place. The host was amazing and the mattress was so comfortable I had the best night's sleep I'd had in a while. Easy to recommend.",
    avatar: "M",
  },
  {
    name: "Sophie",
    country: "France",
    rating: 5,
    text: "Close to everything, literally in the heart of Anza. The terrace is the best part — and the staff, especially Heda and Abdelwahd, made the whole stay feel personal.",
    avatar: "S",
  },
  {
    name: "Lukas",
    country: "Germany",
    rating: 5,
    text: "Clean hostel near the beach, the owner was helpful and friendly. He sorted out a surf lesson for us and gave us tips for Paradise Valley. Real local hospitality.",
    avatar: "L",
  },
  {
    name: "Emma",
    country: "UK",
    rating: 5,
    text: "Me and my friend had the perfect stay here. The people who run it go to extra lengths to make you feel at home. We booked a surf lesson through the hostel and totally recommend it.",
    avatar: "E",
  },
  {
    name: "Jordan",
    country: "USA",
    rating: 4,
    text: "Good place — small, but friendly. You're not lost in a crowd, and the staff actually know your name by day two.",
    avatar: "J",
  },
  {
    name: "Aïcha",
    country: "Morocco",
    rating: 5,
    text: "They threw a beautiful birthday for my nephew on the rooftop. Such a nice memory. The team was friendly and helpful — highly recommend.",
    avatar: "A",
  },
];

// Aggregate review stats (real, from Booking.com)
export const reviewStats = {
  averageScore: 8.5,
  averageOutOfFive: 4.3,
  totalReviews: 85,
  cleanliness: 8.8,
  staff: 9.3,
  location: 9.0,
  value: 9.0,
  wifi: 8.8,
};

export type RoomGenderPolicy = "male" | "female" | "mixed" | "any";

export interface RoomType {
  id: string;
  beds24RoomId: string;
  name: string;
  type: "dorm" | "private";
  genderPolicy: RoomGenderPolicy;
  price: number;
  priceUnit: "night";
  image: string;
  description: string;
  features: string[];
  size: string;
  maxGuests: number;
  available: boolean;
  availableBeds?: number;
}

export const rooms: RoomType[] = [
  {
    id: "anza-dorm",
    beds24RoomId: "645890",
    name: "The Anza Dorm",
    type: "dorm",
    genderPolicy: "mixed",
    price: 12,
    priceUnit: "night",
    image: "/images/dorm-room.jpg",
    description: "The social heart of the house. Sturdy bunks with privacy curtains, lockers for your stuff, and usually new friends by morning.",
    features: ["Privacy curtains", "Reading light", "Power socket", "Lockable locker", "Breakfast included", "Shared bathroom"],
    size: "22 m²",
    maxGuests: 8,
    available: true,
    availableBeds: 8,
  },
  {
    id: "rooftop-triple",
    beds24RoomId: "645892",
    name: "The Rooftop Triple",
    type: "private",
    genderPolicy: "any",
    price: 35,
    priceUnit: "night",
    image: "/images/hostel-living.jpg",
    description: "Private room for three with a calm feel, soft light, and direct access to the rooftop terrace. Great for friends or a small family.",
    features: ["3 single beds", "Breakfast included", "Fresh linens", "Shared bathroom", "Fast WiFi", "Wardrobe"],
    size: "16 m²",
    maxGuests: 3,
    available: true,
  },
  {
    id: "double-room",
    beds24RoomId: "645891",
    name: "The Double Room",
    type: "private",
    genderPolicy: "any",
    price: 30,
    priceUnit: "night",
    image: "/images/private-room.jpg",
    description: "Our quiet corner. One double bed, one good window, and the kind of room that works for couples or solo travelers who want privacy.",
    features: ["Double bed", "Breakfast included", "Fresh linens", "Shared bathroom", "Fast WiFi", "Rooftop access"],
    size: "14 m²",
    maxGuests: 2,
    available: true,
  },
];

export function getFilteredRooms(guestType: "male" | "female" | "couple"): RoomType[] {
  return rooms.filter((room) => {
    if (!room.available) return false;
    if (room.type === "dorm" && room.availableBeds !== undefined && room.availableBeds <= 0) return false;

    switch (guestType) {
      case "male":
      case "female":
        return room.genderPolicy === "mixed" || room.genderPolicy === "any";
      case "couple":
        return room.genderPolicy === "any";
      default:
        return true;
    }
  });
}

export const packages = [
  {
    id: "surf-start",
    name: "Surf Start",
    tagline: "A light, flexible way into the coast.",
    duration: "3 nights",
    priceFrom: 70,
    priceUnit: "total",
    image: "/images/surf-lesson.jpg",
    description: "Three days of beginner-friendly surf with accommodation, breakfast, and the right amount of structure for a short stay.",
    includes: [
      "3 nights accommodation",
      "3 surf lessons",
      "Board + wetsuit included",
      "Daily breakfast",
      "Local surf spot transfers",
    ],
    bestFor: ["First-timers", "Short stays", "Solo travelers"],
  },
  {
    id: "beginner-week",
    name: "Beginner Week",
    tagline: "The full first-Morocco surf week.",
    duration: "5 nights",
    priceFrom: 110,
    priceUnit: "total",
    image: "/images/surf-camp.jpg",
    description: "A steady week for people who want to learn properly, stay close to the beach, and keep the pace simple.",
    includes: [
      "5 nights accommodation",
      "5 surf lessons",
      "Board + wetsuit included",
      "Daily breakfast",
      "Airport transfer help",
      "Local tips from Abdelwahd",
    ],
    bestFor: ["Beginners", "Couples", "Friends"],
  },
  {
    id: "progression-week",
    name: "Progression Week",
    tagline: "More surf, more range, more local coastline.",
    duration: "7 nights",
    priceFrom: 150,
    priceUnit: "total",
    image: "/images/hero-surf.jpg",
    description: "A longer stay with room to surf different breaks, settle into the house, and actually feel the rhythm of Anza.",
    includes: [
      "7 nights accommodation",
      "5 surf days",
      "Board + wetsuit included",
      "Daily breakfast",
      "Spot guidance from Anza to Taghazout",
      "One local day-trip suggestion",
    ],
    bestFor: ["Improvers", "Remote workers", "Longer stays"],
  },
];

// Local experiences — drawn from what's actually available around Anza, Agadir,
// Tamraght and Taghazout (per Google/Tripadvisor/local guides).
export const experiences = [
  {
    title: "Daily Surf Sessions",
    description: "Anza's punchy beach break is right here, with Taghazout, Tamraght, Banana Point and Devil's Rock all within 20 minutes.",
    icon: "Waves",
  },
  {
    title: "Sunset Yoga",
    description: "Rooftop yoga as the sun drops into the Atlantic. The kind of recovery your shoulders need after a surf session.",
    icon: "Sun",
  },
  {
    title: "Paradise Valley",
    description: "Half-day trip to the famous palm-shaded valley with natural rock pools — the classic rest-day move from Agadir.",
    icon: "Mountain",
  },
  {
    title: "Sand Dunes & Sandboard",
    description: "Sunset run to the Timlalin dunes north of the city. Sandboarding if you want it, traditional dinner under the stars.",
    icon: "Sunset",
  },
  {
    title: "Hammam & Massage",
    description: "Local Moroccan hammam: black-soap scrub, steam, massage. The deepest reset you'll get all week.",
    icon: "Sparkles",
  },
  {
    title: "Souk Anza",
    description: "The weekly Anza market — farmers, spices, and local life. Easy walk from the house, no tour bus required.",
    icon: "MapPin",
  },
  {
    title: "Community Dinners",
    description: "Family-style Moroccan dinners on the rooftop. Tagine, couscous, and stories from whoever's at the table that night.",
    icon: "Users",
  },
  {
    title: "Digital Nomad Friendly",
    description: "Free fast WiFi (rated 8.8/10 by guests), quiet corners, and a community of remote workers who surf between meetings.",
    icon: "Wifi",
  },
];

// Gallery images — keep filenames stable so you can drop in real Booking.com photos
// at /public/images/ with the same names. See BOOKING-IMAGES.md for the mapping.
export const galleryImages = [
  { src: "/images/hero-surf.jpg", alt: "Anza beach surfers near Tamount Surf House Agadir", category: "Surf" },
  { src: "/images/surf-camp.jpg", alt: "guests at Tamount Surf House Anza", category: "Community" },
  { src: "/images/yoga-sunset.jpg", alt: "rooftop terrace at Tamount Surf House Anza Agadir", category: "Rooftop" },
  { src: "/images/hostel-living.jpg", alt: "common area and lounge at Tamount Surf House", category: "Hostel" },
  { src: "/images/private-room.jpg", alt: "double room at Tamount Surf House Anza", category: "Rooms" },
  { src: "/images/dorm-room.jpg", alt: "dorm room with bunk beds at Tamount Surf House", category: "Rooms" },
  { src: "/images/moroccan-sunset.jpg", alt: "Paradise Valley day trip from Anza Agadir", category: "Trips" },
  { src: "/images/surf-lesson.jpg", alt: "surf lesson at Anza beach Agadir Morocco", category: "Surf" },
];

export const faqs = [
  {
    question: "How do I book a room?",
    answer: "The easiest way is WhatsApp. Send us your dates and how many of you there are. We usually reply fast and confirm availability directly. You can also book through Booking.com if you prefer.",
  },
  {
    question: "Is there a deposit or prepayment?",
    answer: "No deposit for direct bookings. Payment on arrival in cash (EUR or MAD) unless we agree something different for a special group stay.",
  },
  {
    question: "How far is the beach?",
    answer: "About 4 minutes on foot — roughly 400 metres to Anza Beach. You can hear the ocean from the rooftop.",
  },
  {
    question: "Is Anza good for beginners?",
    answer: "Yes. On gentle days Anza is a great place to start, and when conditions are better elsewhere we take beginners to softer beach breaks at Tamraght or Devil's Rock nearby.",
  },
  {
    question: "Can you arrange airport pickup?",
    answer: "Yes. Just send us your flight details and we can organize a transfer from Agadir Al-Massira Airport (about 27 km away). Cash payment.",
  },
  {
    question: "Is breakfast included?",
    answer: "Yes. A buffet breakfast is included with the stay — vegetarian and vegan options available, served fresh every morning on the rooftop.",
  },
  {
    question: "Is the WiFi good enough for work?",
    answer: "Yes. Guests rate the WiFi 8.8/10. It works well for video calls, planning, and remote work between surf sessions.",
  },
  {
    question: "Can I extend my stay?",
    answer: "Usually yes. A lot of guests do. Tell us early and we will do our best to keep you in the same room.",
  },
];

export const whyChooseUs = [
  {
    title: "4 minutes to the beach",
    description: "Walk out the door, wax your board, and surf before breakfast.",
    stat: "4 min",
    statLabel: "To Anza Beach",
  },
  {
    title: "Small on purpose",
    description: "Only a few rooms, so the place stays warm, quiet, and personal.",
    stat: "14",
    statLabel: "Guests max",
  },
  {
    title: "Owner hosted",
    description: "Abdelwahd built the place himself and still runs it day to day.",
    stat: "9.3",
    statLabel: "Staff rating",
  },
  {
    title: "Good base for the coast",
    description: "Close to Agadir, Taghazout, Tamraght, Paradise Valley, and the whole line of breaks.",
    stat: "20 min",
    statLabel: "To Taghazout",
  },
];
