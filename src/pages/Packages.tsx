import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteInfo } from "../data/content";

const packageCards = [
  {
    title: "Bed & Breakfast",
    price: "From €12 / night",
    copy1:
      "The flexible option. Pick your room, stay as long as you want, and start every morning with a proper Moroccan breakfast on the rooftop.",
    copy2:
      "You handle your own days. We are here when you need tips, transport, or a lesson booked on the fly.",
    minimum: "Minimum stay: 1 night",
    detailPath: "/packages/bed-and-breakfast",
    bookPath: "/book",
    badge: "Flexible",
    badgeClass: "bg-ocean/10 text-ocean",
  },
  {
    title: "Surf Camp Pack",
    price: "From €45 / day",
    copy1:
      "Everything sorted. Accommodation, breakfast and dinner, daily surf lessons, board and wetsuit, transport to the best spots, and rooftop video analysis.",
    copy2:
      "Just show up with your swimsuit and a sense of humor.",
    minimum: "Minimum stay: 3 nights",
    detailPath: "/packages/surf-camp",
    bookPath: "/book?package=beginner-week",
    badge: "All-inclusive",
    badgeClass: "bg-[#F7E8D3] text-[#A56D2A]",
  },
];

export default function Packages() {
  return (
    <div className="pt-20 bg-cream">
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Packages
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Our Packages — pick the stay that fits your trip
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            We built two packs because travelers arrive with two different kinds of plans. Some want total flexibility. Others want the whole week handled. Both are good trips. Pick yours.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {packageCards.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm flex flex-col"
            >
              <div className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium mb-5 ${pkg.badgeClass}`}>{pkg.badge}</div>
              <h2 className="text-3xl sm:text-[2.2rem] font-semibold tracking-tight text-charcoal leading-tight mb-2">{pkg.title}</h2>
              <p className="text-ocean font-semibold text-lg mb-5">{pkg.price}</p>
              <p className="card-copy text-stone mb-4">{pkg.copy1}</p>
              <p className="card-copy text-stone mb-6 flex-1">{pkg.copy2}</p>
              <p className="text-sm text-stone mb-6">{pkg.minimum}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to={pkg.detailPath} className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 text-charcoal px-5 py-3.5 text-sm font-medium hover:bg-stone-50 transition-colors">
                  See full details
                </Link>
                <Link to={pkg.bookPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-5 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors">
                  {pkg.title === "Bed & Breakfast" ? "Book B&B" : "Book Surf Camp"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Not sure which one fits?</h3>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">
              Message Abdelwahd on WhatsApp. He will help you figure it out in two minutes without trying to upsell you into something you do not need.
            </p>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp {siteInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
