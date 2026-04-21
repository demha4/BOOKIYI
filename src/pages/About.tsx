import { motion } from "framer-motion";
import { Heart, Globe, Shield, Leaf } from "lucide-react";
import { whyChooseUs } from "../data/content";

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hostel-living.jpg"
            alt="Anza Surf House interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean-dark/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sand font-medium text-sm tracking-wider uppercase mb-3">About Us</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              From a simple idea to one of Morocco's most loved surf hostels. 
              This is how Anza Surf House came to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-stone leading-relaxed text-lg mb-6">
              It all started with two surfers who fell in love with the rugged beauty of Morocco's 
              Atlantic coast. Between the rolling hills of Anza and the legendary waves of Taghazout, 
              they found something special — a place where the surf culture runs deep, the people are 
              warm, and every sunset feels like a celebration.
            </p>
            <p className="text-stone leading-relaxed text-lg mb-6">
              Anza Surf House was born from a simple belief: that the best travel experiences come 
              from genuine connections. Not just with the ocean, but with the people you meet along 
              the way. We built this hostel to be more than a place to sleep — it's a community hub, 
              a launchpad for adventures, and a sanctuary after long days in the water.
            </p>
            <p className="text-stone leading-relaxed text-lg mb-6">
              Today, we're proud to welcome surfers, nomads, yogis, and wanderers from every corner 
              of the globe. Our team is a mix of local Moroccans who know these waves like the back 
              of their hands, and international surfers who traded their old lives for a simpler, 
              stoke-filled existence.
            </p>
            <p className="text-stone leading-relaxed text-lg">
              Whether you're here for a week or a season, you'll leave with sand in your shoes, 
              salt in your hair, and friends for life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Our Values</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart size={28} />,
                title: "Community First",
                description:
                  "We believe travel is about people. Our hostel is designed to foster connections, friendships, and shared experiences.",
              },
              {
                icon: <Globe size={28} />,
                title: "Local Respect",
                description:
                  "We work closely with the Anza and Taghazout communities, supporting local businesses and honoring Moroccan culture.",
              },
              {
                icon: <Shield size={28} />,
                title: "Safety & Trust",
                description:
                  "Your safety is our priority. All our instructors are ISA-certified, and our facilities meet the highest standards.",
              },
              {
                icon: <Leaf size={28} />,
                title: "Sustainability",
                description:
                  "We're committed to reducing our footprint. From plastic-free initiatives to supporting local conservation projects.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-serif font-bold text-sunset mb-2">{item.stat}</div>
                <p className="text-stone text-sm font-medium uppercase tracking-wider">
                  {item.statLabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Lifestyle */}
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
                src="/images/yoga-sunset.jpg"
                alt="Sunset yoga at Anza Surf House"
                className="w-full h-[450px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">The Lifestyle</p>
              <h2 className="font-serif text-3xl font-bold text-charcoal mb-6">
                A Day at Anza Surf House
              </h2>
              <div className="space-y-5">
                {[
                  {
                    time: "7:00 AM",
                    title: "Morning Swell Check",
                    desc: "Coffee in hand, we check the waves. If it's firing, we grab boards. If it's small, we ease into the day.",
                  },
                  {
                    time: "9:00 AM",
                    title: "Surf Session",
                    desc: "Guided lessons for beginners, free surfing for the experienced. Our guides take you to the best spot for the conditions.",
                  },
                  {
                    time: "1:00 PM",
                    title: "Lunch & Chill",
                    desc: "Fresh Moroccan tagine, salads, and smoothies. Post-surf recovery in the garden or rooftop.",
                  },
                  {
                    time: "4:00 PM",
                    title: "Second Session or Activities",
                    desc: "More waves, yoga on the roof, a skate session, or a trip to Paradise Valley.",
                  },
                  {
                    time: "7:30 PM",
                    title: "Family Dinner",
                    desc: "The whole house gathers for dinner. Stories are shared, plans are made, friendships are deepened.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-sunset font-semibold text-sm shrink-0 w-20 pt-0.5">
                      {item.time}
                    </span>
                    <div>
                      <h4 className="font-semibold text-charcoal text-sm">{item.title}</h4>
                      <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
