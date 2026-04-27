import { motion } from "framer-motion";
import { Heart, Globe, Shield, Leaf, Paintbrush, Home, Waves, Coffee } from "lucide-react";
import SEO from "../components/SEO";

const storySteps = [
  {
    year: "Before the surf scene",
    icon: <Waves size={22} />,
    title: "Anza was just home.",
    text: "Abdelwahd grew up here when the neighborhood was mostly fishermen, the Friday market, and a few wandering travelers making their way north from Agadir.",
  },
  {
    year: "Learning the hard way",
    icon: <Coffee size={22} />,
    title: "Borrowed boards. Hotel shifts. Real lessons.",
    text: "He learned to surf on borrowed boards, worked for years in Agadir hotels, and saw how too many places were built for margins instead of people.",
  },
  {
    year: "2022",
    icon: <Paintbrush size={22} />,
    title: "He opened Tamount his own way.",
    text: "He took over a small three-room house a few streets from the beach. He painted it himself, built the rooftop slowly, chose the mattresses carefully, and opened the door.",
  },
  {
    year: "Today",
    icon: <Home size={22} />,
    title: "Not fancy. Not trying to be.",
    text: "A clean bed, a hot shower, a real breakfast, a rooftop, and a host who actually cares whether you had a good day. That is the whole idea.",
  },
];

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
    <div className="bg-cream">
      <SEO
        title="Our Story"
        description="Tamount means home. Built by Abdelwahd, a local surfer who grew up in Anza. A small surf house with a big welcome, rooftop sunsets, and honest hospitality."
        ogImage="/images/hostel-living.jpg"
      />
      <section className="relative pt-28 pb-24 sm:pt-32 sm:pb-28 overflow-hidden text-white">
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
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-pill tag-pill-blue mb-5 inline-block">How it started</span>
            <h2 className="section-title text-charcoal mb-5">Built slowly. Kept personal.</h2>
            <p className="section-copy text-stone max-w-3xl mx-auto">
              The story is simple because the house is simple. It was not designed as a concept. It grew out of Anza, a few surfboards, and one person wanting to host travelers properly.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-border -translate-x-1/2" />
            <div className="space-y-6 lg:space-y-0">
              {storySteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative grid lg:grid-cols-2 gap-6 lg:gap-14 items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:col-start-2" : ""}`}
                >
                  <div className={`card-soft ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary-100 text-ocean flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <span className="tag-pill tag-pill-cream mb-3 inline-flex">{step.year}</span>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-charcoal leading-tight mb-3">{step.title}</h3>
                        <p className="card-copy text-stone">{step.text}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`hidden lg:flex ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1 justify-end" : "justify-start"}`}>
                    <div className="w-4 h-4 rounded-full bg-ocean ring-8 ring-cream relative z-10" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="tag-pill tag-pill-blue mb-5 inline-block">Our Values</span>
            <h2 className="section-title text-charcoal mb-5">What we care about.</h2>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-soft text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-100 text-ocean flex items-center justify-center mx-auto mb-5">{value.icon}</div>
                <h3 className="card-title font-semibold text-charcoal mb-3">{value.title}</h3>
                <p className="card-copy text-stone">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="image-hover-zoom rounded-xl overflow-hidden bg-slate-100">
            <img src="/images/yoga-sunset.jpg" alt="rooftop evening at tamount surf house" className="w-full h-[420px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="tag-pill tag-pill-blue mb-5 inline-block">Who you will meet</span>
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
