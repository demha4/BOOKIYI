import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "../data/content";
import SEO from "../components/SEO";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="FAQ"
        description="Answers to common questions about booking, surf lessons, airport transfers, food, what to pack, and staying at Tamount Surf House in Anza, Agadir."
        ogImage="/images/hostel-living.jpg"
      />
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Frequently asked questions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Booking, surf, transfers, rooms — the stuff guests usually ask first.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            We keep this page practical. If your question is not here, WhatsApp is still the fastest way to ask.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={faq.question} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5"
              >
                <span className="text-base sm:text-lg font-semibold text-charcoal leading-7">{faq.question}</span>
                <span className={`text-2xl text-ocean shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 sm:px-6 pb-6">
                  <p className="card-copy text-stone">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
