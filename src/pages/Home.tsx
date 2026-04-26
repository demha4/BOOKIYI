import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Wifi,
  Waves,
  ArrowRight,
  Sun,
  Sparkles,
  Mountain,
  Users,
  Star,
  MessageCircle,
  Plane,
} from "lucide-react";
import { rooms, galleryImages, testimonials, siteInfo } from "../data/content";
import SEO from "../components/SEO";

export default function Home() {
  const easyItems = [
    {
      icon: <Waves size={28} className="text-ocean" />,
      title: "Daily Surf Sessions",
      text: "Anza's beach break is a 4-minute walk away. Taghazout, Tamraght, Banana Point, and Devil's Rock are all within 20 minutes.",
    },
    {
      icon: <Sun size={28} className="text-ocean" />,
      title: "Sunset Yoga",
      text: "Rooftop yoga as the sun drops into the Atlantic. Opens shoulders and hips after a long session in the water.",
    },
    {
      icon: <Mountain size={28} className="text-ocean" />,
      title: "Paradise Valley & Dunes",
      text: "Half-day to the palm valley with rock pools, or a sunset run to the Timlalin sand dunes north of Agadir.",
    },
    {
      icon: <Sparkles size={28} className="text-ocean" />,
      title: "Hammam & Reset",
      text: "Local Moroccan hammam — black soap, steam, scrub, and massage. The deepest reset you'll get all week.",
    },
    {
      icon: <Users size={28} className="text-ocean" />,
      title: "Community Dinners",
      text: "Family-style Moroccan dinners on the rooftop. Tagine, couscous, and stories from whoever's at the table.",
    },
    {
      icon: <Wifi size={28} className="text-ocean" />,
      title: "Digital Nomad Friendly",
      text: "Free fast WiFi (rated 8.8/10 by guests), quiet corners, and a community of remote workers between sessions.",
    },
  ];

  const activityCards = [
    {
      id: "surf-lesson",
      img: "/images/surf-lesson.jpg",
      location: "Best Spots in Agadir",
      title: "2-Hour Surf Lesson",
      benefit: "Coach-led session with free evening surfing included.",
      priceLogic: "From €30 / person",
    },
    {
      id: "sand-dunes",
      img: "/images/moroccan-sunset.jpg",
      location: "Timlalin",
      title: "Sand Dunes",
      benefit: "Dunes trip with dinner included.",
      priceLogic: "€30 / person",
    },
    {
      id: "paradise-day-trip",
      img: "/images/moroccan-sunset.jpg",
      location: "Paradise Valley",
      title: "Paradise Valley Day Trip",
      benefit: "Valley trip with lunch included.",
      priceLogic: "€30 / person",
    },
  ];

  return (
    <div className="bg-cream">
      <SEO
        title="Surf Hostel in Anza, Agadir"
        description="Small, family-run surf hostel in Anza Beach, Agadir. Dorm beds from €20/night, private rooms, rooftop terrace, surf lessons, and local trips. Book direct & save."
        ogImage="/images/hero-surf.jpg"
      />
      {/* Hero Section */}
      <section className="relative min-h-[88vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-surf.jpg"
            alt="Surfing in Taghazout Morocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24 pb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block border border-white/40 rounded-full px-4 sm:px-5 py-1.5 mb-6 sm:mb-8 text-xs sm:text-sm text-white/90"
          >
            Anza, Agadir · Morocco
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="display-title mb-2"
          >
            Stay Where The <br className="hidden sm:block" />
            Surf Trip Feels
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="script-accent text-blue-accent -mt-1 sm:-mt-2 mb-8 sm:mb-10 -rotate-2"
          >
            Easy, warm And Real
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 w-full sm:w-auto"
          >
            <Link
              to="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-charcoal px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-white/90 active:scale-95"
            >
              Book Your Stay <ArrowRight size={16} />
            </Link>
            <Link
              to="/packages"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border border-white/50 px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-white/10 active:scale-95"
            >
              Explore Packages <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="section-copy text-white/80 max-w-2xl mx-auto"
          >
            TAMOUNT Surf House brings together beach-close stays, friendly hospitality, surf lessons, slower terrace moments, and activity add-ons designed for travelers who want a real Morocco surf experience without the usual confusion.
          </motion.p>
        </div>
      </section>

      {/* Why It Feels Easier - Features */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
              Why It Feels Easier
            </div>
            <h2 className="section-title text-charcoal mb-5 sm:mb-6">
              Curated Experiences To Shape<br className="hidden sm:block" />
              <span className="script-accent text-blue-accent font-normal relative top-1 sm:top-2"> The Stay </span>
              Around Your Pace.
            </h2>
            <p className="section-copy text-stone max-w-3xl mx-auto px-2">
              Everything is structured to make the stay simple to understand at a glance: where you sleep, what you can add, and how to move from browsing to booking without confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {easyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-cream rounded-3xl p-7 sm:p-10 border border-stone-100 shadow-sm"
              >
                <div className="rounded-[1.35rem] bg-slate-100 flex items-center justify-center mb-6 sm:mb-8 w-[70px] h-[70px] sm:w-[76px] sm:h-[76px]">
                  {item.icon}
                </div>
                <h3 className="card-title font-semibold text-charcoal mb-3 sm:mb-4">{item.title}</h3>
                <p className="card-copy text-stone">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="py-18 sm:py-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
              Testimonials
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
              ))}
              <span className="ml-2 sm:ml-3 text-stone font-semibold text-base sm:text-lg">8.5 / 10</span>
            </div>
            <p className="text-stone text-base sm:text-xl leading-relaxed">
              Based on 85+ verified reviews on Booking.com & Hostelworld
            </p>
          </div>
        </div>

        <div className="reviews-track-wrapper">
          <div className="reviews-track px-4 sm:px-6 lg:px-8">
            {[...testimonials, ...testimonials].map((item, i) => (
              <motion.div
                key={`${item.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % testimonials.length) * 0.06 }}
                className="review-card card-shell bg-white p-6 sm:p-7 h-full flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  ))}
                </div>
                <p className="text-charcoal text-[15px] sm:text-base leading-8 mb-7 flex-1">“{item.text}”</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean text-white flex items-center justify-center font-semibold shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal text-lg leading-tight">{item.name}</div>
                    <div className="text-stone text-base">{item.country}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms / Accommodations */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
              Accommodations
            </div>
            <h2 className="section-title text-charcoal mb-5 sm:mb-6">
              Choose The Stay<br className="hidden sm:block" />
              <span className="script-accent text-blue-accent font-normal relative top-1 sm:top-2"> Style </span>
              That Fits Your Trip.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.slice(0, 3).map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-3xl overflow-hidden h-[420px] sm:h-[470px] md:h-[540px] group flex flex-col justify-end"
              >
                <div className="absolute inset-0">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                </div>
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="inline-block border border-white/60 bg-black/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 text-sm font-medium text-white">
                    From €{room.price} / Night
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl leading-tight text-white mb-2">
                    {room.name}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-7 mb-6">
                    {room.type === "dorm" ? "For solo trips and practical budgets." : "For couples, friends, and slower stays."}
                  </p>
                  <Link
                    to={`/rooms#${room.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-white text-charcoal py-3.5 rounded-full font-medium text-sm transition-all hover:bg-white/90 active:scale-95"
                  >
                    Check Availability <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-18 sm:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
              Activities
            </div>
            <h2 className="section-title text-charcoal mb-5 sm:mb-6">
              Experiences That Support<br className="hidden sm:block" />
              <span className="script-accent text-blue-accent font-normal relative top-1 sm:top-2"> The Stay, </span>
              Not Distract From It.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {activityCards.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <div className="h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <img src={act.img} alt={act.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-4">
                    <MapPin size={14} /> <span>{act.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-charcoal leading-tight mb-2">{act.title}</h3>
                  <div className="text-ocean text-sm sm:text-base font-semibold mb-4">{act.priceLogic}</div>
                  <p className="text-stone-600 text-[15px] sm:text-base leading-7 mb-5 flex-1">
                    {act.benefit}
                  </p>
                  <div className="space-y-2">
                    <Link to={`/book?activity=${act.id}`} className="block w-full text-center rounded-full bg-charcoal text-white px-4 py-3 text-sm font-medium hover:bg-charcoal/90 transition-colors">
                      Add To Stay
                    </Link>
                    <Link to="/contact" className="block w-full text-center rounded-full border border-stone-300 text-charcoal px-4 py-3 text-sm font-medium hover:bg-stone-50 transition-colors">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
            Packages
          </div>
          <h2 className="section-title text-charcoal mb-5 sm:mb-6">
            Two ways to stay with us.
          </h2>
          <p className="section-copy text-stone max-w-3xl mx-auto mb-10 sm:mb-12">
            Come for a night, a week, or just three days that somehow turns into two weeks. Whether you want to figure out your own days or have the surf, transport, meals, and coaching sorted for you, we have a pack for that.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="inline-flex w-fit rounded-full bg-ocean/10 text-ocean px-3 py-1 text-xs font-medium mb-4">Flexible stay</div>
              <p className="text-xs font-medium text-stone-500 mb-2">Minimum stay: 1 night</p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-2">Bed &amp; Breakfast</h3>
              <p className="text-ocean font-semibold text-lg mb-4">From €20 / night</p>
              <p className="card-copy text-stone mb-4">
                The flexible option. Pick your room, stay as long as you want, and start every morning with a proper Moroccan breakfast on the rooftop.
              </p>
              <p className="card-copy text-stone mb-6 flex-1">
                You handle your own days. We are here when you need local tips, transport, or a lesson booked on the fly.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                <Link to="/packages/bed-and-breakfast" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 text-charcoal px-5 py-3.5 text-sm font-medium hover:bg-stone-50 transition-colors">
                  See full details
                </Link>
                <Link to="/book/bed-and-breakfast" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-5 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors">
                  Book B&amp;B
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="inline-flex w-fit rounded-full bg-sunset/10 text-sunset px-3 py-1 text-xs font-medium mb-4">All-inclusive</div>
              <p className="text-xs font-medium text-stone-500 mb-2">Minimum stay: 3 nights</p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-2">Surf Camp Pack</h3>
              <p className="text-ocean font-semibold text-lg mb-4">From €45 / day</p>
              <p className="card-copy text-stone mb-4">
                Everything sorted. Accommodation, breakfast and dinner, daily surf lessons, board and wetsuit, transport to the best spots, and video analysis afterwards.
              </p>
              <p className="card-copy text-stone mb-6 flex-1">
                Just show up with your swimsuit and a sense of humor.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                <Link to="/packages/surf-camp" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 text-charcoal px-5 py-3.5 text-sm font-medium hover:bg-stone-50 transition-colors">
                  See full details
                </Link>
                <Link to="/book/package/surf-camp-pack" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-5 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors">
                  Book Surf Camp
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CTA Help Card */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal text-white rounded-[2rem] p-8 sm:p-12 text-center shadow-[0_18px_60px_rgba(20,28,43,0.18)]">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Not sure which one fits?</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-8">Message Abdelwahd on WhatsApp. He will help you figure it out in two minutes without trying to upsell you into something you do not need.</p>
            <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-charcoal px-8 py-4 font-semibold text-base hover:bg-white/90 transition-colors">
              <MessageCircle size={18} /> WhatsApp {siteInfo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 sm:py-24 bg-cream overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 mb-6 sm:mb-8 text-sm text-stone-500">
              Gallery
            </div>
            <h2 className="section-title text-charcoal mb-5 sm:mb-6">
              See The Atmosphere<br className="hidden sm:block" />
              <span className="script-accent text-blue-accent font-normal relative top-1 sm:top-2"> Before </span>
              You Arrive.
            </h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="gallery-item group bg-slate-100"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors" />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-charcoal/90 active:scale-95"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & Help */}
      <section className="py-18 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-block border border-stone-200 rounded-full px-5 py-1.5 text-sm text-stone-500">
              Contact & Help
            </div>
          </div>
          <div className="rounded-[2rem] sm:rounded-[2.4rem] bg-[#182136] text-white shadow-[0_18px_60px_rgba(20,28,43,0.18)] p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-stretch">
              <div className="py-2 sm:py-4">
                <div className="kicker text-blue-300 mb-5 sm:mb-6">Direct Booking</div>
                <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3.3rem] font-semibold leading-[1.05] tracking-[-0.03em] max-w-2xl mb-5 sm:mb-6 text-balance">
                  Need help choosing between private and shared stay options?
                </h2>
                <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mb-7 sm:mb-8">
                  Let guests ask before they commit. The best stay pages reduce uncertainty early and make it easy to switch from browsing to booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-charcoal px-6 py-3.5 text-sm sm:text-base font-semibold hover:bg-white/90 transition-colors"
                  >
                    Check availability <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.7rem] bg-white/8 border border-white/8 p-6 sm:p-7">
                <p className="text-white/60 text-sm sm:text-base mb-3">Direct contact</p>
                <a href="tel:+212612345678" className="block text-white text-2xl sm:text-[2rem] font-semibold leading-tight mb-1 hover:text-blue-200 transition-colors">
                  +212 6 12 34 56 78
                </a>
                <a href="mailto:tamountsurfhouse@gmail.com" className="block text-white/65 text-sm sm:text-base mb-6 hover:text-white transition-colors">
                  tamountsurfhouse@gmail.com
                </a>

                <div className="space-y-3.5 text-white/75 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-blue-300 mt-0.5 shrink-0" />
                    <span>Anza, Agadir, Morocco</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Waves size={18} className="text-blue-300 mt-0.5 shrink-0" />
                    <span>Stay + surf + local experiences</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane size={18} className="text-blue-300 mt-0.5 shrink-0" />
                    <span>Airport support available on request</span>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href="https://wa.me/212612345678?text=Hi!%20I%20need%20help%20choosing%20the%20best%20stay%20option."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3.5 text-sm sm:text-base font-semibold hover:bg-[#1fb458] transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle size={18} /> Message on WhatsApp
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    href="https://maps.google.com/?q=Anza,Agadir,Morocco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/6 border border-white/12 text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
                  >
                    <MapPin size={16} /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
