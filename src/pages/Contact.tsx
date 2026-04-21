import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { faqs } from "../data/content";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
              Contact Us
            </h1>
            <p className="text-stone max-w-2xl mx-auto text-lg">
              Have questions about booking, surf conditions, or just want to say hi? 
              We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-sand-dark/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Location</h3>
                    <p className="text-stone text-sm">
                      Anza, Agadir, Morocco<br />
                      Near Taghazout & Tamraght
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-dark/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Phone & WhatsApp</h3>
                    <a href="tel:+212612345678" className="text-stone text-sm hover:text-ocean transition-colors">
                      +212 6 12 34 56 78
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-dark/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                    <a href="mailto:hello@anzasurfhouse.com" className="text-stone text-sm hover:text-ocean transition-colors">
                      hello@anzasurfhouse.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-sand-dark/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Reception Hours</h3>
                    <p className="text-stone text-sm">
                      Daily: 7:00 AM — 10:00 PM<br />
                      Surf lessons: 8:00 AM — 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-dark/20">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Message Sent!</h3>
                    <p className="text-stone">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Send us a message</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand-dark/30 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-all bg-cream"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand-dark/30 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-all bg-cream"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand-dark/30 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-all bg-cream"
                      >
                        <option value="">Select a topic</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="surf">Surf Lessons</option>
                        <option value="general">General Question</option>
                        <option value="group">Group Booking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand-dark/30 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-all bg-cream resize-none"
                        placeholder="Tell us what you need..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-sunset hover:bg-sunset-light text-white py-3.5 rounded-full font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-sand">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.6!2d-9.68!3d30.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMwJzM2LjAiTiA5wrA0MCc0OC4wIlc!5e0!3m2!1sen!2sma!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Anza Surf House Location"
        />
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="font-serif text-3xl font-bold text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream rounded-xl border border-sand-dark/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-charcoal text-sm pr-4">{faq.question}</span>
                  <span className={`text-sunset text-lg font-bold transition-transform shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-stone text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
