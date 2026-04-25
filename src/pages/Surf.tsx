import { motion } from "framer-motion";
import { Waves, Shield, Bus, Thermometer, Clock3 } from "lucide-react";
import SEO from "../components/SEO";

const lessons = [
  {
    title: "Beginner lesson",
    price: "€25 / person / session",
    text: "2 hours in the water. Soft-top board, wetsuit, and a patient instructor. We pick the friendliest break that day.",
  },
  {
    title: "Intermediate lesson",
    price: "€35 / person / session",
    text: "For guests already popping up and turning. Smaller groups, better spot choice, more feedback.",
  },
  {
    title: "Advanced coaching",
    price: "€50 / person / session",
    text: "Private guidance, video review on request, and sessions at the right point break when conditions line up.",
  },
];

const spots = [
  ["Anza Beach", "Beginner → Intermediate", "3 min walk", "Beach break with easy access for dawn patrol or first lessons."],
  ["Devil's Rock", "Beginner → All levels", "15 min drive", "A softer beach option when you want room to learn."],
  ["Hash Point", "Intermediate", "20 min drive", "Short fun right in Taghazout village."],
  ["Banana Point", "Intermediate", "18 min drive", "Playful right for cruisy sessions and longer rides."],
  ["Anchor Point", "Advanced", "25 min drive", "The famous right. Powerful, classic, and worth respecting."],
  ["Imsouane", "All levels", "1h 15 min drive", "The long right everybody wants to surf at least once."],
];

const rentals = [
  ["Soft-top board", "€7 / day · €35 / week"],
  ["Performance board", "€10 / day · €50 / week"],
  ["Longboard / fish", "€12 / day · €55 / week"],
  ["Wetsuit", "€5 / day · €25 / week"],
  ["Board + wetsuit combo", "€12 / day · €60 / week"],
];

export default function Surf() {
  return (
    <div className="bg-cream">
      <SEO
        title="Surf Lessons & Spots"
        description="Surf lessons from €30, board rental from €7/day, and local spot guidance. Beginner to advanced coaching at Anza, Taghazout, and Tamraght breaks."
        ogImage="/images/surf-lesson.jpg"
      />
      <section className="relative pt-28 pb-24 sm:pt-32 sm:pb-28 overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <img src="/images/hero-surf.jpg" alt="surfing near anza and taghazout" className="w-full h-full object-cover opacity-35" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-blue-300 mb-5">
            Surf in Anza & Taghazout
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white mb-6">
            Surfing from Tamount — lessons, spots, and the real coast
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-white/75 max-w-3xl mx-auto">
            Morocco's central coast gives you mellow beginner days, famous point breaks, and enough range to keep the whole week interesting. We are three minutes from Anza Beach and close to the full line of breaks up the coast.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-pill tag-pill-blue mb-5 inline-block">Surf Lessons</span>
            <h2 className="section-title text-charcoal mb-5">Lessons for every level.</h2>
            <p className="section-copy text-stone max-w-3xl mx-auto">No shouting, no overcomplicated packages. Just the right session for your level, with the right spot for the day.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lessons.map((lesson, i) => (
              <motion.div key={lesson.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-soft">
                <div className="w-14 h-14 rounded-2xl bg-[#E8F4F8] text-ocean flex items-center justify-center mb-5"><Waves size={24} /></div>
                <h3 className="card-title font-semibold text-charcoal mb-2">{lesson.title}</h3>
                <p className="text-ocean font-semibold text-sm sm:text-base mb-4">{lesson.price}</p>
                <p className="card-copy text-stone">{lesson.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-charcoal mb-5">The breaks, ranked by how far they are from your bed.</h2>
            <p className="section-copy text-stone max-w-3xl mx-auto">An honest read on the main spots we surf from the house.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {spots.map(([name, level, distance, desc], i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-cream rounded-3xl border border-stone-200 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-lg sm:text-xl font-semibold text-charcoal">{name}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone">{level}</span>
                  <span className="rounded-full bg-ocean/10 text-ocean px-3 py-1 text-xs font-medium">{distance}</span>
                </div>
                <p className="card-copy text-stone">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-pill tag-pill-cream mb-5 inline-block">Info</span>
            <h2 className="section-title text-charcoal mb-5">Everything you need to know.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card-soft">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4F8] text-ocean flex items-center justify-center mb-5"><Bus size={24} /></div>
              <h3 className="card-title font-semibold text-charcoal mb-3">Spot transfers included</h3>
              <p className="card-copy text-stone">If you book surf with us, we sort the transport to wherever is working — Anza, Tamraght, Taghazout, or farther when the day calls for it.</p>
            </div>
            <div className="card-soft">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4F8] text-ocean flex items-center justify-center mb-5"><Thermometer size={24} /></div>
              <h3 className="card-title font-semibold text-charcoal mb-3">When to come</h3>
              <p className="card-copy text-stone">October to April is peak swell. Summer stays smaller and friendlier for first-timers. Either way, there is usually something rideable nearby.</p>
            </div>
            <div className="card-soft">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4F8] text-ocean flex items-center justify-center mb-5"><Shield size={24} /></div>
              <h3 className="card-title font-semibold text-charcoal mb-3">Equipment rental</h3>
              <div className="space-y-2 text-sm sm:text-base text-stone leading-7">
                {rentals.map(([name, price]) => (
                  <div key={name} className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2">
                    <span>{name}</span>
                    <span className="text-right font-medium text-charcoal">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal text-white rounded-[2rem] p-8 sm:p-10 text-center shadow-[0_18px_60px_rgba(20,28,43,0.18)]">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center mx-auto mb-5"><Clock3 size={24} /></div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Want us to tell you where the waves are best for your dates?</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">Send your dates and your surf level. We will tell you honestly if it is the right week for Anza, Taghazout, or an Imsouane day trip.</p>
            <a href="https://wa.me/212612345678?text=Hi!%20I%20want%20to%20ask%20about%20surf%20conditions%20and%20lessons." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors">
              Ask about surf on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
