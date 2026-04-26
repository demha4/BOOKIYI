import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Waves } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="pt-32 sm:pt-36 bg-cream min-h-screen flex flex-col">
      <SEO
        title="Page not found"
        description="This page doesn't exist at Tamount Surf House. Head back to the homepage or check room availability."
        ogImage="/images/hero-surf.jpg"
      />

      <section className="flex-1 flex items-center justify-center py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center shadow-[0_18px_40px_rgba(20,80,120,0.25)]"
          >
            <Waves size={44} className="text-white" strokeWidth={1.6} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="kicker text-ocean mb-4"
          >
            404 · Lost at sea
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="section-title text-charcoal mb-5"
          >
            Couldn't catch the wave.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-copy text-stone max-w-lg mx-auto mb-10"
          >
            The page you were looking for doesn't exist — or it paddled out and never came back. Try one of these instead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-7 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean text-white px-7 py-3.5 text-sm font-semibold hover:bg-ocean-dark transition-colors"
            >
              <Calendar size={16} /> See availability
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-stone-200/60"
          >
            <p className="text-stone text-sm mb-3">Or jump to:</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              <Link to="/rooms" className="text-ocean hover:underline">Rooms</Link>
              <Link to="/surf" className="text-ocean hover:underline">Surf</Link>
              <Link to="/packages" className="text-ocean hover:underline">Packages</Link>
              <Link to="/experiences" className="text-ocean hover:underline">Experiences</Link>
              <Link to="/contact" className="text-ocean hover:underline">Contact</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
