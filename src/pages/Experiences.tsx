import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Waves, Sunset, Sparkles, X } from "lucide-react";
import SEO from "../components/SEO";
import { siteInfo } from "../data/content";

// Experiences sourced from real local options in Anza, Agadir, Tamraght and Taghazout —
// the same activities you'll find on Google, Tripadvisor, and GetYourGuide for the area.
const experiences = [
  {
    id: "surf-lesson",
    name: "Surf Lesson at Anza",
    price: "€30 / person",
    shortDesc: "Coached 2-hour session at Anza beach. Free evening surfing after.",
    fullDesc: "Two-hour coached surf session at Anza beach with a local instructor. Includes board, wetsuit, and all equipment. After the lesson you're welcome to keep surfing for free in the evening when conditions allow. Perfect for beginners and improvers — Anza has soft beach-break waves on gentle days and punchier ones for those ready to step up.",
    image: "/images/surf-lesson.jpg",
    category: "surf",
    includes: ["2 hours with a local coach", "Board + wetsuit included", "All equipment provided", "Free evening surfing"],
  },
  {
    id: "paradise-valley",
    name: "Paradise Valley",
    price: "€30 / person",
    shortDesc: "Half-day trip to the palm valley with natural rock pools.",
    fullDesc: "The classic Agadir rest-day trip. Paradise Valley is a hidden palm-shaded canyon with natural pools carved into the rock — about an hour inland from Anza. We arrange the transfer, a local guide who knows the trail down to the pools, and a Berber lunch on the way back. Works beautifully as a break between surf days.",
    image: "/images/argan-goats.jpg",
    category: "trip",
    includes: ["Round-trip transport from Anza", "Local guide", "Lunch at a Berber restaurant", "Swimming time at the pools"],
  },
  {
    id: "sand-dunes",
    name: "Timlalin Sand Dunes",
    price: "€30 / person",
    shortDesc: "Sunset dune trip with sandboarding and dinner under the stars.",
    fullDesc: "An evening run to the Timlalin dunes north of Agadir. Watch the sun set over the desert, try sandboarding if you want, and stay for a traditional Moroccan dinner cooked at a small camp. A completely different side of Morocco that most surfers never see.",
    image: "/images/sand-dunes.jpg",
    category: "trip",
    includes: ["Transport from Anza", "Sandboard rental if you want to try", "Traditional dinner included", "Sunset viewing"],
  },
  {
    id: "hammam",
    name: "Hammam & Massage",
    price: "€25 / person",
    shortDesc: "Local Moroccan hammam — black soap, steam, scrub, and massage.",
    fullDesc: "The best way to recover after a hard surf week. We arrange a session at a trusted local hammam in Aourir or Agadir. The full ritual: steam, black soap, gommage scrub, and a relaxing argan-oil massage. We can book the local cultural version for the full experience, or a private tourist hammam if you'd rather have your own room.",
    image: "/images/bathroom.jpg",
    category: "wellness",
    includes: ["Steam + black soap scrub", "Argan oil massage", "Trusted local hammam", "About 90 minutes total"],
  },
  {
    id: "souk-anza",
    name: "Souk Anza",
    price: "Free",
    shortDesc: "The weekly Anza market — farmers, spices, and local life.",
    fullDesc: "Souk Anza is the weekly market right in the village — locals from the surrounding valleys come to sell produce, spices, and crafts. Walking distance from the house, no tour required. We'll point you to the right entrance and give you a few tips on haggling and what's worth a closer look.",
    image: "/images/surf-camp.jpg",
    category: "trip",
    includes: ["Walking distance from the house", "Local guidance from us", "Best on market day", "Bring small bills"],
  },
  {
    id: "skate-park",
    name: "Taghazout Skate Park",
    price: "€5 / person",
    shortDesc: "Sunset session at one of Morocco's best skate parks.",
    fullDesc: "The Taghazout skate park is one of the best in Morocco, and it's a short drive from Anza. We organize sunset sessions a few times a week — easy, free, and a great way to meet other travelers. Skateboard rental available, or bring your own.",
    image: "/images/surf-camp.jpg",
    category: "activity",
    includes: ["Transport to skate park", "Group session at sunset", "Mixed levels welcome", "Rental available separately"],
  },
  {
    id: "yoga",
    name: "Sunset Yoga on the Rooftop",
    price: "€10 / class",
    shortDesc: "Vinyasa flow on the rooftop as the sun drops.",
    fullDesc: "Rooftop yoga at the house, run by a local teacher. Vinyasa flow that's good for surfers — opens shoulders, hips, and the spine after long sessions in the water. Drop-in classes when there's enough interest, usually 2–3 evenings a week. Mats provided.",
    image: "/images/yoga-sunset.jpg",
    category: "wellness",
    includes: ["Mats provided", "Vinyasa flow style", "Suitable for all levels", "On the rooftop at sunset"],
  },
  {
    id: "taxi",
    name: "Airport Transfer",
    price: "€25",
    shortDesc: "Reliable transfer to or from Agadir Al-Massira Airport.",
    fullDesc: "Need a ride to or from the airport? We arrange a reliable transfer with a driver we trust. Fixed price, no surprises. Agadir Al-Massira Airport is about 27 km from the house — usually 30–40 minutes depending on traffic.",
    image: "/images/outdoor-trip.jpg",
    category: "service",
    includes: ["Door-to-door service", "Fixed price (cash)", "Reliable local drivers", "27 km / ~35 min"],
  },
];

const groups = [
  {
    title: "Water & surf",
    icon: <Waves size={22} />,
    items: experiences.filter((e) => e.category === "surf" || e.id === "skate-park"),
  },
  {
    title: "Land adventures",
    icon: <Mountain size={22} />,
    items: experiences.filter((e) => e.category === "trip"),
  },
  {
    title: "Wellness & chill",
    icon: <Sparkles size={22} />,
    items: [
      ...experiences.filter((e) => e.category === "wellness"),
      { name: "Rooftop evenings", price: "Included", shortDesc: "Tea, sunset, and the part of the day where plans for tomorrow usually happen.", id: "rooftop", category: "chill" },
      { name: "Local tips", price: "Included", shortDesc: "Ask Abdelwahd where to eat, surf, walk, or find what you need.", id: "tips", category: "chill" },
    ],
  },
  {
    title: "Services",
    icon: <Sunset size={22} />,
    items: experiences.filter((e) => e.category === "service"),
  },
];

export default function Experiences() {
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);

  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Local Experiences & Trips"
        description="Paradise Valley, Sand Dunes, Surf Lessons, Hammam, Yoga and more — local trips and activities from Tamount Surf House in Anza, Agadir."
        ogImage="/images/moroccan-sunset.jpg"
      />
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Things to do in Anza, Agadir, Taghazout — and beyond
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Surf in the morning. Fill the rest of the day with whatever sounds good.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            These are the trips and add-ons we actually organize. Small groups, fair prices, local guides we know, and enough flexibility that you can decide once you arrive.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {groups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.06 }} className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,42,58,0.06)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-ocean flex items-center justify-center">{group.icon}</div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal">{group.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {group.items.map((item: any, idx: number) => (
                  <motion.button
                    key={item.id || item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => item.fullDesc && setSelectedExperience(item)}
                    className={`card-soft text-left cursor-pointer group ${item.fullDesc ? "hover:shadow-lg transition-shadow" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="card-title font-semibold text-charcoal leading-tight">{item.name}</h3>
                      <span className="tag-pill tag-pill-blue whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="card-copy text-stone">{item.shortDesc}</p>
                    {item.fullDesc && (
                      <div className="mt-3 text-ocean text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight size={14} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-[2rem]">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-charcoal transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-charcoal">{selectedExperience.name}</h3>
                  <span className="tag-pill tag-pill-blue whitespace-nowrap text-sm sm:text-base">{selectedExperience.price}</span>
                </div>

                <p className="text-stone text-base sm:text-lg leading-8 mb-6">{selectedExperience.fullDesc}</p>

                {selectedExperience.includes && (
                  <div className="border-t border-stone-100 pt-6">
                    <h4 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4">What's included</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedExperience.includes.map((inc: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-stone">
                          <div className="w-5 h-5 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-stone-100 pt-6 mt-6">
                  <a
                    href={`https://wa.me/${siteInfo.whatsapp}?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(selectedExperience.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-6 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors w-full sm:w-auto"
                  >
                    Book on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
            <div className="w-14 h-14 rounded-xl bg-white/10 text-blue-300 flex items-center justify-center mx-auto mb-5"><Sunset size={24} /></div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Not sure what fits your stay?</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">Tell us how long you are here and whether you want more surf, more rest, or a mix. We will suggest the right add-ons without overloading your week.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`https://wa.me/${siteInfo.whatsapp}?text=Hi!%20I%20want%20help%20choosing%20activities%20for%20my%20stay.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors">
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
