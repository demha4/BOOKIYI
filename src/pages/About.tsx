import { motion } from "framer-motion";
import { Heart, Globe, Shield, Leaf } from "lucide-react";

const values = [
  {
    icon: <Heart size={26} />,
    title: "Keeping it small",
    description: "We could add more beds. We do not. The house works because it stays human-sized.",
  },
  {
    icon: <Globe size={26} />,
    title: "Hiring locally",
    description: "The team lives in Anza or nearby. The bread is baked across the street. The place stays rooted here.",
  },
  {
    icon: <Shield size={26} />,
    title: "Being fair",
    description: "Prices stay honest. Guests get treated like guests, not transaction numbers.",
  },
  {
    icon: <Leaf size={26} />,
    title: "Respecting the coast",
    description: "We pass on lineup etiquette, local knowledge, and the idea that beaches stay clean because locals keep them that way.",
  },
];

export default function About() {
  return (
    <div className="pt-20 bg-cream">
      <section className="relative py-24 sm:py-28 overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src="/images/hostel-living.jpg" alt="interior at tamount surf house" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-blue-300 mb-5">
            Our story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white mb-6">
            A small surf house, built by someone who grew up on this coast.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-white/75 max-w-3xl mx-auto">
            Tamount means home. That is the whole point of the place.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
            <p className="section-copy text-stone">
              Abdelwahd grew up in Anza, when there was no real surf scene here yet — just fishermen, the Friday market, and a few wandering travelers making their way north from Agadir.
            </p>
            <p className="section-copy text-stone">
              He learned to surf on borrowed boards, worked for years in Agadir hotels, and saw up close how too many places were built for margins instead of people. So he opened Tamount his own way.
            </p>
            <p className="section-copy text-stone">
              In 2022, he took over a small three-room house a few streets from the beach. He painted it himself. Built the rooftop slowly. Chose the mattresses carefully. Opened the door. That became Tamount Surf House.
            </p>
            <p className="section-copy text-stone">
              It is not fancy. It is not trying to be. It is a clean bed, a hot shower, a real breakfast, a rooftop, and a host who actually cares whether you had a good day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-charcoal mb-5">What we care about.</h2>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl bg-cream border border-stone-200 p-7 shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center mx-auto mb-5">{value.icon}</div>
                <h3 className="card-title font-semibold text-charcoal mb-3">{value.title}</h3>
                <p className="card-copy text-stone">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="image-hover-zoom rounded-[2rem] overflow-hidden bg-slate-100">
            <img src="/images/yoga-sunset.jpg" alt="rooftop evening at tamount surf house" className="w-full h-[420px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="kicker text-ocean mb-4">Who you will meet</p>
            <h2 className="section-title text-charcoal mb-6">Abdelwahd, the morning crew, and probably the rooftop cat.</h2>
            <div className="space-y-5 text-stone text-base sm:text-lg leading-8">
              <p><strong className="text-charcoal">Abdelwahd</strong> — owner, surfer, occasional cook, and the person most likely to tell you which break is working before breakfast.</p>
              <p><strong className="text-charcoal">The morning crew</strong> — local friends and family who help with breakfast, cleaning, and getting the house ready before everyone comes back from the beach.</p>
              <p><strong className="text-charcoal">Mira the cat</strong> — supervisor, observer, and selective friend.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
