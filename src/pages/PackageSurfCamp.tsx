import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { siteInfo, testimonials } from "../data/content";
import SEO from "../components/SEO";

const included = [
  "Accommodation in the room type you choose",
  "Breakfast every morning",
  "Dinner 5 nights a week",
  "Daily surf lessons (2h / day)",
  "All equipment: board, wetsuit, leash, wax",
  "Qualified local instructors",
  "Video analysis sessions",
  "Daily transport to the best spot",
  "Full house access: rooftop, kitchen, WiFi, common areas",
  "Linens + towels",
  "One bonus activity per week",
];

const dayFlow = [
  ["7:30am", "Wake up to the smell of bread"],
  ["8:30am", "Breakfast on the rooftop"],
  ["9:30am", "Briefing + drive to the spot"],
  ["10:30am", "Surf session (2 hours)"],
  ["1pm", "Lunch on your own"],
  ["3pm", "Rest, free surf, or rooftop time"],
  ["6pm", "Debrief or video analysis"],
  ["7:30pm", "Dinner on the rooftop"],
];

const pricing = [
  ["Dorm bed", "€145", "€235", "€315", true],
  ["Double room (per person, 2 sharing)", "€175", "€285", "€385", false],
  ["Triple room (per person, 3 sharing)", "€165", "€270", "€365", false],
  ["Private room (solo occupancy)", "€245", "€405", "€555", false],
] as const;

const skillLevels = [
  ["Beginner", "Never surfed or only tried once. We focus on paddling, pop-up, ocean awareness, and the right soft first days."],
  ["Intermediate", "You can catch waves but want to turn, position better, and read the point breaks with more confidence."],
  ["Advanced", "You already surf well and want sharper coaching, better spot timing, and useful feedback without babysitting."],
];

export default function PackageSurfCamp() {
  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Surf Camp Pack"
        description="All-inclusive surf camp from €45/day. Daily lessons, board + wetsuit, breakfast + dinner, transport to best spots, and video analysis. Minimum stay: 3 nights."
        ogImage="/images/surf-camp.jpg"
        ogType="product"
      />
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Surf Camp Pack
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            All-inclusive surf. Small groups. Real coaching.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto mb-6">
            Surf every morning. Eat proper food. Learn fast with video analysis. Sleep in a clean bed. Watch the sunset from the rooftop. Wake up and do it again.
          </motion.p>
          <div className="text-2xl sm:text-3xl font-bold text-ocean">From €45 / day</div>
          <p className="text-stone mt-2">In the dorm — private rooms from €65 / day</p>
          <p className="text-stone mt-1">Minimum stay: 3 nights</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book/package/beginner-week" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-charcoal/90 transition-colors">
              Book Surf Camp Pack
            </Link>
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 text-charcoal px-7 py-3.5 font-medium text-sm sm:text-base hover:bg-stone-50 transition-colors">
              Jump to pricing
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">Your surf week, completely sorted:</h2>
            <div className="grid gap-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm sm:text-base text-stone leading-7">
                  <Check size={16} className="text-ocean mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">What your day actually looks like:</h2>
            <div className="space-y-4">
              {dayFlow.map(([time, text]) => (
                <div key={time} className="flex gap-4">
                  <span className="w-20 shrink-0 text-ocean font-semibold text-sm sm:text-base">{time}</span>
                  <p className="text-sm sm:text-base text-stone leading-7">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title text-charcoal mb-5">Straightforward prices, no hidden fees.</h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 shadow-sm bg-cream">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-white border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-5 text-sm font-semibold text-stone">Room type</th>
                    <th className="px-6 py-5 text-sm font-semibold text-stone">3 nights</th>
                    <th className="px-6 py-5 text-sm font-semibold text-stone">5 nights</th>
                    <th className="px-6 py-5 text-sm font-semibold text-stone">7 nights</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map(([label, p3, p5, p7, featured]) => (
                    <tr key={label} className="border-b last:border-0 border-stone-200/70 bg-transparent">
                      <td className="px-6 py-5 text-charcoal font-medium">{label}</td>
                      <td className="px-6 py-5 text-stone">{p3}</td>
                      <td className="px-6 py-5 text-stone">{p5}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${featured ? "text-ocean text-lg" : "text-charcoal"}`}>{p7}</span>
                          {featured && <span className="rounded-full bg-ocean text-white px-2.5 py-1 text-[11px] font-medium">Most booked</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 text-sm sm:text-base text-stone leading-7">
            Lunches, extra activities, airport transfer, and personal insurance are not included. We keep the main pack clear and let you add the rest if you want.
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">For every level. Really.</h2>
            <div className="space-y-5">
              {skillLevels.map(([title, text]) => (
                <div key={title}>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">{title}</h3>
                  <p className="card-copy text-stone">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">What guests say about the pack</h2>
            <div className="space-y-5">
              {testimonials.slice(0, 3).map((item) => (
                <div key={item.name} className="border-b border-stone-100 pb-5 last:border-0 last:pb-0">
                  <p className="text-stone leading-8 mb-3">“{item.text}”</p>
                  <p className="font-semibold text-charcoal">— {item.name}, {item.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Book your Surf Camp Pack</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">
              If you want the whole week handled, this is the one. Message us your dates and room preference and we will sort the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors">
                <MessageCircle size={18} /> WhatsApp {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-white px-7 py-3.5 font-medium text-sm sm:text-base hover:bg-white/10 transition-colors">
                {siteInfo.email}
              </a>
            </div>
            <div className="mt-6">
              <Link to="/surf" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors font-medium">
                See surf spots and lessons <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
