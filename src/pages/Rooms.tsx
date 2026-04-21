import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Maximize, Check, ArrowRight } from "lucide-react";
import { rooms } from "../data/content";

export default function Rooms() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Accommodation</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
              Rooms & Dorms
            </h1>
            <p className="text-stone max-w-2xl mx-auto text-lg">
              Clean, comfortable, and designed for surfers. From private ocean-view rooms 
              to social dorms, find your perfect home base.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, i) => (
              <motion.div
                key={room.id}
                id={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sand-dark/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="image-hover-zoom h-64 lg:h-auto overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider ${
                          room.type === "dorm" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {room.type === "dorm" ? "Shared Dorm" : "Private"}
                        </span>
                        {room.genderPolicy !== "any" && (
                          <span className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider ${
                            room.genderPolicy === "male" ? "bg-blue-50 text-blue-600" :
                            room.genderPolicy === "female" ? "bg-pink-50 text-pink-600" :
                            "bg-purple-50 text-purple-600"
                          }`}>
                            {room.genderPolicy === "male" ? "♂ Male Only" : room.genderPolicy === "female" ? "♀ Female Only" : "Mixed"}
                          </span>
                        )}
                        <span className="text-xs text-stone flex items-center gap-1">
                          <Maximize size={12} /> {room.size}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-charcoal mb-3">{room.name}</h2>
                      <p className="text-stone text-sm leading-relaxed mb-4">{room.description}</p>

                      <div className="flex items-center gap-2 mb-4 text-sm text-stone">
                        <Users size={16} />
                        <span>Up to {room.maxGuests} guests</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.features.map((feature) => (
                          <span
                            key={feature}
                            className="flex items-center gap-1 text-xs bg-soft-gray px-3 py-1.5 rounded-full text-stone"
                          >
                            <Check size={12} className="text-ocean" /> {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-sand-dark/20">
                      <div>
                        <span className="text-sunset font-bold text-2xl">€{room.price}</span>
                        <span className="text-stone text-sm">/{room.type === "dorm" ? "bed/night" : "room/night"}</span>
                      </div>
                      <Link
                        to="/book"
                        className="bg-sunset hover:bg-sunset-light text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
                      >
                        Book <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-charcoal">All Rooms Include</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Free WiFi", "Hot Showers", "Daily Cleaning", "Secure Lockers",
              "Linen Included", "Beach Towels",
            ].map((amenity) => (
              <div
                key={amenity}
                className="flex items-center justify-center gap-2 bg-cream rounded-xl py-4 px-3 text-sm font-medium text-charcoal"
              >
                <Check size={16} className="text-ocean" />
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
