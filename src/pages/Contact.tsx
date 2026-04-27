import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle, MessageCircle, CircleHelp } from "lucide-react";
import { faqs, siteInfo } from "../data/content";
import SEO from "../components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", dates: "", guests: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Contact Us"
        description={`WhatsApp ${siteInfo.phone} or email ${siteInfo.email}. Fast replies for booking questions, surf conditions, and local tips.`}
        ogImage="/images/hostel-living.jpg"
      />
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Contact us
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            Fastest way to reach us is WhatsApp.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            Message us with your dates and how many of you there are. If it is longer than two paragraphs, email works too.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-7 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-charcoal mb-5">Contact details</h2>
              <div className="space-y-5 text-sm sm:text-base">
                <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-stone hover:text-charcoal transition-colors">
                  <MessageCircle size={18} className="text-ocean mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-charcoal">WhatsApp</strong><br />
                    {siteInfo.phone}
                  </span>
                </a>
                <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`} className="flex items-start gap-3 text-stone hover:text-charcoal transition-colors">
                  <Phone size={18} className="text-ocean mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-charcoal">Phone</strong><br />
                    {siteInfo.phone}
                  </span>
                </a>
                <a href={`mailto:${siteInfo.email}`} className="flex items-start gap-3 text-stone hover:text-charcoal transition-colors">
                  <Mail size={18} className="text-ocean mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-charcoal">Email</strong><br />
                    {siteInfo.email}
                  </span>
                </a>
                <a href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-stone hover:text-charcoal transition-colors">
                  <MapPin size={18} className="text-ocean mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-charcoal">Location</strong><br />
                    {siteInfo.location}
                  </span>
                </a>
              </div>
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean text-white px-5 py-3.5 font-semibold text-sm hover:bg-ocean-dark transition-colors">
                  <MessageCircle size={16} /> Message now
                </a>
                <a href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 text-charcoal px-5 py-3.5 font-medium text-sm hover:bg-stone-50 transition-colors">
                  <MapPin size={16} /> Open map
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-stone-200 shadow-sm h-[340px] sm:h-[420px] bg-slate-100">
              <iframe
                src="https://www.google.com/maps?q=Anza%20Beach%2C%20Agadir%2C%20Morocco&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tamount Surf House Location"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold tracking-tight text-charcoal mb-2">Message drafted.</h3>
                  <p className="card-copy text-stone">Nice. We will usually reply quickly once you send it for real via WhatsApp or email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-charcoal mb-2">Short inquiry form</h2>
                    <p className="text-stone text-sm sm:text-base leading-7">Keep it simple. Dates, guest count, and anything we should know.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream" placeholder="Your name" />
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream" placeholder="Email" />
                    <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream" placeholder="WhatsApp / phone (optional)" />
                    <input type="text" value={formData.dates} onChange={(e) => setFormData({ ...formData, dates: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream" placeholder="Dates you're thinking about" />
                  </div>
                  <input type="text" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream" placeholder="How many people" />
                  <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:border-ocean focus:ring-2 focus:ring-ocean/15 outline-none bg-cream resize-none" placeholder="Anything we should know? Surf level, arrival time, special needs..." />
                  <button type="submit" className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-3.5 rounded-full font-semibold transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Send size={18} /> Send inquiry
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CircleHelp size={20} className="text-ocean" />
                <h3 className="text-xl font-semibold tracking-tight text-charcoal">Quick FAQ</h3>
              </div>
              <div className="space-y-4">
                {faqs.slice(0, 4).map((faq) => (
                  <div key={faq.question} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-medium text-charcoal mb-1.5">{faq.question}</p>
                    <p className="text-sm sm:text-base text-stone leading-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
