import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Maximize, Check, ArrowRight, Wifi, Coffee, Waves, KeyRound } from "lucide-react";
import { rooms } from "../data/content";

const sharedSpaces = [
  {
    icon: <Coffee size={22} className="text-ocean" />,
    title: "The Rooftop Terrace",
    text: "Covered shade, open sky, low seating, and the place where the whole house ends up once the sunset starts.",
  },
  {
    icon: <Wifi size={22} className="text-ocean" />,
    title: "The Shared Kitchen",
    text: "Stove, fridge, kettle, pans, plates, and enough space to make tea at odd hours or dinner with new friends.",
  },
  {
    icon: <Waves size={22} className="text-ocean" />,
    title: "Surfboard Storage",
    text: "Covered storage downstairs, locked overnight, with space for the boards and wetsuits that keep the week moving.",
  },
];

const houseRules = [
  "Check-in from 2pm. Late arrival is fine if you message us.",
  "Check-out by 11am. We can hold bags after.",
  "Quiet hours from 11pm onward. Rooftop stays open, just softer.",
  "Shoes off in the bedrooms.",
  "Kitchen stays open — just clean up after yourself.",
  "Visitors during the day are okay. Overnight guests, ask first.",
];

export default function Rooms() {
  return (
    <div className="pt-20 bg-cream">
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Rooms at Tamount Surf House
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Three rooms. That's the whole house.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            We kept the house small so we could keep it good. One dorm, one triple, one double. Fresh linen, hot showers, breakfast every morning, and the rooftop included in all of it.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              id={room.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-sm"
            >
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="image-hover-zoom h-72 lg:h-full bg-slate-100">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-7 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${room.type === "dorm" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                        {room.type === "dorm" ? "Shared Dorm" : "Private Room"}
                      </span>
                      <span className="rounded-full bg-stone-100 text-stone px-3 py-1 text-xs font-medium flex items-center gap-1"><Maximize size={12} /> {room.size}</span>
                    </div>
                    <h2 className="text-3xl sm:text-[2.2rem] font-semibold tracking-tight text-charcoal leading-tight mb-4">{room.name}</h2>
                    <p className="card-copy text-stone mb-5">{room.description}</p>
                    <div className="flex items-center gap-2 mb-5 text-sm sm:text-base text-stone">
                      <Users size={16} />
                      <span>Up to {room.maxGuests} guests</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
                      {room.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm sm:text-base text-stone leading-7">
                          <Check size={16} className="text-ocean mt-1 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="text-ocean font-bold text-3xl">€{room.price}</div>
                      <div className="text-stone text-sm sm:text-base">/{room.type === "dorm" ? "bed / night" : "room / night"} · breakfast included</div>
                    </div>
                    <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-7 py-3.5 font-semibold text-sm hover:bg-charcoal/90 transition-colors">
                      Book this room <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-charcoal mb-5">The parts of the house everyone uses.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sharedSpaces.map((space, i) => (
              <motion.div key={space.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-cream rounded-3xl border border-stone-200 p-7 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5">{space.icon}</div>
                <h3 className="card-title font-semibold text-charcoal mb-3">{space.title}</h3>
                <p className="card-copy text-stone">{space.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-8 sm:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center"><KeyRound size={24} /></div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal">A few small rules so everyone has a good stay.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {houseRules.map((rule) => (
                <div key={rule} className="flex items-start gap-2 text-sm sm:text-base text-stone leading-7">
                  <Check size={16} className="text-ocean mt-1 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
