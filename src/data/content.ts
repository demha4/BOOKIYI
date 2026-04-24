export const siteInfo = {
  name: "Tamount Surf House",
  tagline: "A small surf house, a big welcome. Right by Anza Beach.",
  phone: "+212 6 12 34 56 78",
  whatsapp: "212612345678",
  email: "tamountsurfhouse@gmail.com",
  location: "Anza Beach, Agadir, Morocco",
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

export const testimonials = [
  {
    name: "Léa",
    country: "France",
    rating: 5,
    text: "Felt like home within an hour. Abdelwahd picked us up from the airport, showed us the beach, made us tea, and by the end of the week we were helping cook dinner. Best hostel vibe I've found in Morocco.",
    avatar: "L",
  },
  {
    name: "Daniel",
    country: "Germany",
    rating: 5,
    text: "Three minutes to the beach is not a lie. I surfed every morning, came back for breakfast, and spent every evening on the rooftop. The dorm is clean, showers are hot, and the price is very fair.",
    avatar: "D",
  },
  {
    name: "Sofia",
    country: "Italy",
    rating: 5,
    text: "Traveling solo and was nervous about Morocco. Abdelwahd and the whole house made it easy. Small place, good energy, no pretentious surf-camp stuff. Already planning a return trip.",
    avatar: "S",
  },
  {
    name: "James",
    country: "UK",
    rating: 5,
    text: "If you want a giant surf resort, go to Taghazout. If you want a real Moroccan surf house with a host who actually knows you by name, this is the one.",
    avatar: "J",
  },
  {
    name: "Anna",
    country: "Poland",
    rating: 5,
    text: "The rooftop sunsets. The breakfast. The double room was quiet and spotless. I extended twice.",
    avatar: "A",
  },
];

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
    description: "The social heart of the house. Four sturdy bunks, shared bathroom right outside, lockers for your stuff, and usually new friends by morning.",
    features: ["8 beds", "Reading light", "Power socket", "Lockable drawer", "Breakfast included", "Shared bathroom"],
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
    description: "Private room for three with a calm feel, soft light, and easy access to the rooftop breeze. Great for friends or a small family.",
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
    description: "Our in-house skate ramp and proximity to Taghazout skate park mean the fun does not stop when the surf goes flat.",
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
  { src: "/images/hero-surf.jpg", alt: "surfers near Anza beach at golden hour", category: "Surf" },
  { src: "/images/surf-camp.jpg", alt: "guest group at tamount surf house in agadir", category: "Community" },
  { src: "/images/yoga-sunset.jpg", alt: "rooftop yoga at tamount surf house anza", category: "Yoga" },
  { src: "/images/hostel-living.jpg", alt: "common area at tamount surf house", category: "Hostel" },
  { src: "/images/private-room.jpg", alt: "double room at tamount surf house anza", category: "Rooms" },
  { src: "/images/dorm-room.jpg", alt: "dorm room at tamount surf house anza beach", category: "Rooms" },
  { src: "/images/moroccan-sunset.jpg", alt: "paradise valley day trip from agadir morocco", category: "Scenery" },
  { src: "/images/surf-lesson.jpg", alt: "surf lesson near agadir morocco", category: "Surf" },
];

export const faqs = [
  {
    question: "How do I book a room?",
    answer: "The easiest way is WhatsApp. Send us your dates and how many of you there are. We usually reply fast and confirm availability directly.",
  },
  {
    question: "Is there a deposit or prepayment?",
    answer: "No deposit for direct bookings. You pay on arrival unless we agree something different for a special group stay.",
  },
  {
    question: "How far is the beach?",
    answer: "Three minutes on foot. You can hear the ocean from the rooftop.",
  },
  {
    question: "Is Anza good for beginners?",
    answer: "Yes. On gentle days Anza is a great place to start, and when conditions are better elsewhere we take beginners to softer beach breaks nearby.",
  },
  {
    question: "Can you arrange airport pickup?",
    answer: "Yes. Just send us your flight details and we can organize a transfer from Agadir airport.",
  },
  {
    question: "Is breakfast included?",
    answer: "Yes. Moroccan breakfast is included with the stay and served fresh every morning.",
  },
  {
    question: "Is the WiFi good enough for work?",
    answer: "Yes. The house has fast WiFi and works well for video calls, planning, and remote work between surf sessions.",
  },
  {
    question: "Can I extend my stay?",
    answer: "Usually yes. A lot of guests do. Tell us early and we will do our best to keep you in the same room.",
  },
];

export const whyChooseUs = [
  {
    title: "3 minutes to the beach",
    description: "Walk out the door, wax your board, and surf before breakfast.",
    stat: "3 min",
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
    stat: "100%",
    statLabel: "Local hosted",
  },
  {
    title: "Good base for the coast",
    description: "Close to Agadir, Taghazout, Tamraght, Paradise Valley, and the whole line of breaks.",
    stat: "20 min",
    statLabel: "To Taghazout",
  },
];
