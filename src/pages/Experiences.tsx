import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Waves, Sunset, Sparkles } from "lucide-react";

const groups = [
  {
    title: "Water & surf trips",
    icon: <Waves size={22} />,
    items: [
      ["Imsouane day trip", "€50 / person", "The long right, fishing-port lunch, and a full day on the coast."],
      ["Imsouane + sandboarding", "€60 / person", "Surf in the morning, dunes in the afternoon."],
      ["Secret spot trip", "€40 / person", "A quieter surf day for intermediate surfers who want less crowd."],
    ],
  },
  {
    title: "Land adventures",
    icon: <Mountain size={22} />,
    items: [
      ["Paradise Valley", "€25 / person", "Palm canyons, natural pools, and an easy half-day reset."],
      ["Timlalin sandboarding", "€25 / person", "Golden dunes, boards provided, and a very good sunset."],
      ["Quad biking", "€35 / person", "Dusty hills, off-road tracks, and two loud fun hours."],
      ["Sunset camel ride", "€30 / person", "Slow, simple, and much better than it sounds."],
    ],
  },
  {
    title: "Wellness & chill",
    icon: <Sparkles size={22} />,
    items: [
      ["Rooftop yoga", "€12 / person", "Morning or sunset sessions with tea after."],
      ["Traditional hammam + massage", "€40 / person", "The local version, not a resort-spa version."],
      ["Cooking class", "€30 / person", "Shop local, cook together, eat on the rooftop."],
    ],
  },
];

export default function Experiences() {
  return (
    <div className="pt-20 bg-cream">
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Things to do in Agadir, Anza, Taghazout — and beyond
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Surf in the morning. Fill the rest of the day with whatever sounds good.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            These are the trips we actually organize. Small groups, fair prices, local guides we know, and enough flexibility that you can decide once you arrive.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {groups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.06 }} className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">{group.icon}</div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal">{group.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {group.items.map(([name, price, desc]) => (
                  <div key={name} className="rounded-3xl bg-cream border border-stone-200 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-charcoal leading-tight">{name}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ocean whitespace-nowrap">{price}</span>
                    </div>
                    <p className="card-copy text-stone">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center mx-auto mb-5"><Sunset size={24} /></div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Not sure what fits your stay?</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">Tell us how long you are here and whether you want more surf, more rest, or a mix. We will suggest the right add-ons without overloading your week.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/212612345678?text=Hi!%20I%20want%20help%20choosing%20activities%20for%20my%20stay." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors">
                Ask on WhatsApp
              </a>
              <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-white px-7 py-3.5 font-medium text-sm sm:text-base hover:bg-white/10 transition-colors">
                Book your stay <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
