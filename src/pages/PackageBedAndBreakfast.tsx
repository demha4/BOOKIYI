import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { rooms, siteInfo } from "../data/content";

const included = [
  "Daily Moroccan breakfast",
  "Fresh linens + shower towel",
  "Fast WiFi (100 Mbps)",
  "Rooftop terrace access 24/7",
  "Shared kitchen",
  "Surfboard storage",
  "Luggage storage",
  "24/7 reception",
  "Local advice from Abdelwahd",
];

const extras = [
  "Surf lesson — from €25",
  "Board + wetsuit rental — from €12 / day",
  "Paradise Valley trip — €25",
  "Sandboarding Timlalin — €25",
  "Imsouane day trip — €50",
  "Sunset camel ride — €30",
  "Rooftop yoga — €12",
  "Rooftop dinner night — around €6",
  "Airport transfer from AGA — €25",
];

const idealFor = [
  "You want to surf at your own pace, not on a fixed schedule",
  "You are a digital nomad who wants to work and surf for a few weeks",
  "You are traveling with a partner or friends and want privacy",
  "You are unsure how long you want to stay",
  "You already have gear or transport sorted",
  "You want the house vibe without the camp structure",
];

export default function PackageBedAndBreakfast() {
  return (
    <div className="pt-20 bg-cream">
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Bed & Breakfast
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Stay as long as you want. Do what you want with your days.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto mb-6">
            The flexible pack. Choose your room, we sort the bed, the breakfast, the rooftop, and the WiFi. You sort the rest — with our help if you want it.
          </motion.p>
          <div className="text-2xl sm:text-3xl font-bold text-ocean">From €12 / night</div>
          <p className="text-stone mt-2">Dorm bed — private rooms from €30</p>
          <div className="mt-8">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-charcoal/90 transition-colors">
              Book Bed & Breakfast
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">Every single night you get:</h2>
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
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">Choose your room, choose your pace.</h2>
            <div className="space-y-4 mb-6">
              {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between gap-4 rounded-2xl bg-cream border border-stone-200 px-4 py-4">
                  <div>
                    <div className="font-semibold text-charcoal">{room.name}</div>
                    <div className="text-sm text-stone">Sleeps up to {room.maxGuests}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ocean">From €{room.price}</div>
                    <div className="text-xs text-stone">/ night</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-stone text-sm sm:text-base leading-7 mb-5">Minimum stay: 1 night. Honestly — come for one night, stay for twelve. It happens weekly.</p>
            <Link to="/rooms" className="inline-flex items-center gap-2 rounded-full border border-stone-300 text-charcoal px-6 py-3.5 text-sm font-medium hover:bg-stone-50 transition-colors">
              See all rooms in detail <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-cream rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">Add anything you want on top.</h2>
            <div className="grid gap-3">
              {extras.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm sm:text-base text-stone leading-7">
                  <Check size={16} className="text-ocean mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <Link to="/experiences" className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors">
                Browse experiences <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-cream rounded-[2rem] border border-stone-200 p-7 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal mb-6">Bed & Breakfast is for you if...</h2>
            <div className="grid gap-3">
              {idealFor.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm sm:text-base text-stone leading-7">
                  <Check size={16} className="text-ocean mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-charcoal text-white p-8 sm:p-10 shadow-[0_18px_60px_rgba(20,28,43,0.18)] text-center">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">Book your B&B stay</h2>
            <p className="text-white/70 text-base sm:text-lg leading-8 max-w-2xl mx-auto mb-7">
              Message us with your dates. We will tell you what rooms are free, and you can decide from there.
            </p>
            <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-charcoal px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors">
              <MessageCircle size={18} /> WhatsApp {siteInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
