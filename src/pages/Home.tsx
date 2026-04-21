import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Waves,
  Sun,
  Zap,
  MapPin,
  Users,
  Wifi,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";
import { testimonials, rooms, packages, experiences, whyChooseUs } from "../data/content";
import StarRating from "../components/StarRating";

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={28} />,
  Sun: <Sun size={28} />,
  Zap: <Zap size={28} />,
  MapPin: <MapPin size={28} />,
  Users: <Users size={28} />,
  Wifi: <Wifi size={28} />,
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-surf.jpg"
            alt="Surfing in Taghazout Morocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-4 text-sand"
          >
            Anza, Agadir — Morocco
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Where Waves Meet
            <br />
            <span className="text-sunset-light">Community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            The best surf hostel in Agadir near Taghazout & Tamraght. 
            Surf lessons, yoga, skate, and unforgettable sunsets — all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/book"
              className="bg-sunset hover:bg-sunset-light text-white px-8 py-4 rounded-full font-semibold text-base transition-all hover:shadow-xl active:scale-95"
            >
              Book Your Stay
            </Link>
            <Link
              to="/packages"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-base transition-all active:scale-95"
            >
              View Surf Packages
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <StarRating rating={5} />
              <span className="text-stone text-sm font-medium ml-2">4.9 / 5</span>
            </div>
            <p className="text-stone text-sm">Based on 200+ reviews from Google & Booking.com</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sand-dark/30"
              >
                <StarRating rating={t.rating} />
                <p className="text-charcoal text-sm leading-relaxed mt-3 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean text-white flex items-center justify-center font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-stone text-xs">{t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="image-hover-zoom rounded-3xl overflow-hidden"
            >
              <img
                src="/images/surf-camp.jpg"
                alt="Surf community at Anza Surf House"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                More Than a Hostel — A Lifestyle
              </h2>
              <p className="text-stone leading-relaxed mb-4">
                Born from a shared love for waves and community, Anza Surf House sits perfectly between 
                the legendary breaks of Taghazout and the quiet charm of Tamraght. We didn't just build 
                a place to sleep — we created a home for surfers, nomads, and dreamers.
              </p>
              <p className="text-stone leading-relaxed mb-6">
                Here, mornings start with coffee and swell checks. Afternoons are for surfing, yoga, 
                or exploring hidden beaches. Evenings bring family dinners on the rooftop, swapping 
                stories under a sky full of stars.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-ocean font-semibold hover:text-ocean-dark transition-colors"
              >
                Read Our Story <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Stay With Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Rooms & Accommodation
            </h2>
            <p className="text-stone mt-3 max-w-xl mx-auto">
              From private ocean-view retreats to social dorms, find your perfect space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.slice(0, 4).map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-dark/20 group"
              >
                <div className="image-hover-zoom h-48 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-charcoal">{room.name}</h3>
                    <span className="text-xs font-medium bg-sand px-2 py-1 rounded-full capitalize">
                      {room.type}
                    </span>
                  </div>
                  <p className="text-stone text-sm mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sunset font-bold text-lg">€{room.price}</span>
                      <span className="text-stone text-xs">/{room.type === "dorm" ? "bed/night" : "room/night"}</span>
                    </div>
                    <Link
                      to={`/rooms#${room.id}`}
                      className="text-ocean text-sm font-medium hover:text-ocean-dark transition-colors flex items-center gap-1"
                    >
                      Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-stone text-white px-8 py-3 rounded-full font-semibold transition-all active:scale-95"
            >
              View All Rooms <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Surf Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Adventures</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Surf Packages & Experiences
            </h2>
            <p className="text-stone mt-3 max-w-xl mx-auto">
              Everything you need for an unforgettable surf trip in Morocco.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${
                  i === 1 ? "border-sunset md:-mt-4 md:mb-4 shadow-lg" : "border-sand-dark/20"
                }`}
              >
                {i === 1 && (
                  <div className="bg-sunset text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="image-hover-zoom h-52 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-1">{pkg.name}</h3>
                  <p className="text-stone text-sm mb-4">{pkg.tagline}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sunset font-bold text-2xl">€{pkg.priceFrom}</span>
                    <span className="text-stone text-sm">/{pkg.priceUnit}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.slice(0, 4).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-stone">
                        <Star size={14} className="text-sunset mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {pkg.includes.length > 4 && (
                      <li className="text-sm text-ocean font-medium">+ {pkg.includes.length - 4} more</li>
                    )}
                  </ul>
                  <Link
                    to={`/packages#${pkg.id}`}
                    className={`block text-center py-3 rounded-full font-semibold transition-all active:scale-95 ${
                      i === 1
                        ? "bg-sunset hover:bg-sunset-light text-white"
                        : "bg-charcoal hover:bg-stone text-white"
                    }`}
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Life at Anza</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              The Full Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sand-dark/20 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center mb-4">
                  {iconMap[exp.icon]}
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{exp.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Why Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Why Choose Anza Surf House
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-serif font-bold text-sunset mb-3">{item.stat}</div>
                <p className="text-stone text-sm font-medium uppercase tracking-wider mb-3">
                  {item.statLabel}
                </p>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Location</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                The Heart of Morocco's Surf Coast
              </h2>
              <p className="text-stone leading-relaxed mb-6">
                Nestled in the peaceful village of Anza, we're perfectly positioned between 
                Morocco's most famous surf towns. Taghazout's legendary breaks are a 5-minute 
                drive. Tamraght's consistent waves are even closer.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { name: "Anza Beach", dist: "300m walk" },
                  { name: "Taghazout", dist: "5 min drive" },
                  { name: "Tamraght", dist: "3 min drive" },
                  { name: "Agadir Airport", dist: "45 min drive" },
                ].map((loc) => (
                  <div key={loc.name} className="bg-white rounded-xl p-4 border border-sand-dark/20">
                    <MapPin size={16} className="text-sunset mb-1" />
                    <p className="font-semibold text-charcoal text-sm">{loc.name}</p>
                    <p className="text-stone text-xs">{loc.dist}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-stone text-white px-8 py-3 rounded-full font-semibold transition-all active:scale-95"
              >
                Get Directions <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-lg h-[400px] bg-sand"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.6!2d-9.68!3d30.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMwJzM2LjAiTiA5wrA0MCc0OC4wIlc!5e0!3m2!1sen!2sma!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Anza Surf House Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/moroccan-sunset.jpg"
            alt="Sunset in Morocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean-dark/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Your Wave is Waiting
          </h2>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed">
            Whether it's your first time on a board or your hundredth barrel, 
            Anza Surf House is where your next adventure begins. Book now and 
            feel the stoke of Morocco's best surf coast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-sunset hover:bg-sunset-light text-white px-10 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl active:scale-95"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-full font-semibold text-lg transition-all active:scale-95"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
