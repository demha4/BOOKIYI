import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock, ArrowRight, Target } from "lucide-react";
import { packages } from "../data/content";

export default function Packages() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sunset font-medium text-sm tracking-wider uppercase mb-3">Adventures</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
              Surf Packages
            </h1>
            <p className="text-stone max-w-2xl mx-auto text-lg">
              Curated surf experiences for every level. From first-timers to wave-chasers, 
              we've got the perfect package for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                id={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sand-dark/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2 image-hover-zoom h-64 lg:h-auto overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-3 p-6 lg:p-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-xs font-medium bg-sand px-3 py-1 rounded-full">
                        <Clock size={12} /> {pkg.duration}
                      </span>
                      {i === 1 && (
                        <span className="text-xs font-medium bg-sunset text-white px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-2xl lg:text-3xl font-bold text-charcoal mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-sunset font-medium mb-4">{pkg.tagline}</p>
                    <p className="text-stone leading-relaxed mb-6">{pkg.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                      {pkg.includes.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Check size={16} className="text-ocean mt-0.5 shrink-0" />
                          <span className="text-sm text-charcoal">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="flex items-center gap-1 text-xs text-stone">
                        <Target size={12} /> Best for:
                      </span>
                      {pkg.bestFor.map((bf) => (
                        <span
                          key={bf}
                          className="text-xs bg-soft-gray px-2 py-1 rounded-full text-stone"
                        >
                          {bf}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-sand-dark/20">
                      <div>
                        <span className="text-stone text-sm">From</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sunset font-bold text-3xl">€{pkg.priceFrom}</span>
                          <span className="text-stone">/{pkg.priceUnit}</span>
                        </div>
                      </div>
                      <Link
                        to={`/book?package=${pkg.id}`}
                        className="bg-sunset hover:bg-sunset-light text-white px-8 py-3 rounded-full font-semibold transition-all active:scale-95 flex items-center gap-2"
                      >
                        Book This Package <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ocean/5 rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">
              Want Something Custom?
            </h3>
            <p className="text-stone mb-6 max-w-lg mx-auto">
              We can tailor any package to your needs. Longer stays, private lessons, 
              group bookings — just reach out and we'll make it happen.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-stone text-white px-8 py-3 rounded-full font-semibold transition-all active:scale-95"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
