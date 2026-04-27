import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle, Clock, LogIn, LogOut } from "lucide-react";
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
        description="Surf services + meals from €45/day per person, billed on top of your room. Daily lessons, board + wetsuit, breakfast + dinner, transport, video analysis. Minimum stay: 7 nights."
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
          <div className="text-2xl sm:text-3xl font-bold text-ocean">€45 / day per person</div>
          <p className="text-stone mt-2">Surf services + meals + transport. Accommodation billed separately on top.</p>
          <p className="text-stone mt-1 font-semibold">Minimum stay: 7 nights</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book/package/surf-camp-pack" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-charcoal/90 transition-colors">
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
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
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

          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title text-charcoal mb-5">Straightforward pricing, no hidden fees.</h2>
            <p className="section-copy text-stone max-w-2xl mx-auto">
              The pack is billed per day, on top of the room you pick. Stay 7 nights or longer at the same daily rate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-stone-200 p-7 sm:p-8 bg-cream">
              <p className="text-xs font-bold text-ocean uppercase tracking-wider mb-2">The pack</p>
              <h3 className="text-xl font-semibold text-charcoal mb-1">Surf services + meals</h3>
              <p className="text-3xl font-bold text-ocean mt-3 mb-1">€45 <span className="text-base font-medium text-stone">/ day / person</span></p>
              <p className="text-sm text-stone leading-6 mt-3">
                Daily lessons, board + wetsuit, breakfast + dinner, transport to the spots, video analysis. Same daily rate whether you stay 7 nights or 21.
              </p>
              <p className="text-xs text-stone-500 mt-4">
                Example for 1 person, 7 nights: €315.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-7 sm:p-8 bg-cream">
              <p className="text-xs font-bold text-ocean uppercase tracking-wider mb-2">The room</p>
              <h3 className="text-xl font-semibold text-charcoal mb-1">Accommodation, billed per night</h3>
              <ul className="mt-4 space-y-2 text-sm text-stone leading-6">
                <li className="flex items-center justify-between gap-3">
                  <span>Dorm bed</span>
                  <span className="font-semibold text-charcoal">€20 / night</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Triple room <span className="text-stone-500">(per room)</span></span>
                  <span className="font-semibold text-charcoal">€50 / night</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Double room <span className="text-stone-500">(per room)</span></span>
                  <span className="font-semibold text-charcoal">€55 / night</span>
                </li>
              </ul>
              <p className="text-xs text-stone-500 mt-4">
                Live availability and final prices shown when you pick dates on the booking page.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-stone-50 border border-stone-200 p-5 text-sm sm:text-base text-stone leading-7">
            <strong className="text-charcoal">Example total for 1 person, 7 nights in the dorm:</strong> €315 (pack) + €140 (dorm) = <strong className="text-ocean">€455</strong>. Pick your real dates and rooms on the booking page for the live total. Lunches, extra activities, airport transfer, and personal insurance are not included.
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
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
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
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

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-ocean flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal">Conditions of reservation</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-stone text-sm sm:text-base leading-7">
              <div className="flex items-center gap-3">
                <LogIn size={18} className="text-ocean shrink-0" />
                <span>Check-in from <strong className="text-charcoal">12:00 PM</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-ocean shrink-0" />
                <span>Check-out by <strong className="text-charcoal">10:00 AM</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-ocean shrink-0" />
                <span>Minimum stay 7 nights</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-ocean shrink-0" />
                <span>30% deposit confirms instantly</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-ocean shrink-0" />
                <span>Free cancellation up to 7 days before check-in</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-ocean shrink-0" />
                <span>Passport / national ID on arrival</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-5 leading-6">
              Lunches, extra activities, airport transfer, and personal insurance are not included. We keep the main pack clear and let you add the rest if you want.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
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
