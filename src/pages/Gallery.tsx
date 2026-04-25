import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/content";
import SEO from "../components/SEO";

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(galleryImages.map((g) => g.category)))];
  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  const nextImage = () => {
    if (selected !== null) setSelected((selected + 1) % filtered.length);
  };

  const prevImage = () => {
    if (selected !== null) setSelected((selected - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="pt-32 sm:pt-36 bg-cream">
      <SEO
        title="Photo Gallery"
        description="See the atmosphere at Tamount Surf House before you arrive. Rooftop sunsets, surf sessions, rooms, and the Anza beach lifestyle."
        ogImage="/images/hero-surf.jpg"
      />
      <section className="py-24 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kicker text-ocean mb-5">
            Gallery
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-charcoal mb-6">
            See the atmosphere before you arrive.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="section-copy text-stone max-w-3xl mx-auto">
            The beach, the rooftop, the rooms, the coast, and the quieter moments in between. Enough to get a feel for the house before you book.
          </motion.p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-charcoal text-white"
                    : "bg-white text-stone hover:bg-charcoal hover:text-white border border-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="gallery-item w-full text-left cursor-pointer group bg-white border border-stone-200 shadow-sm"
                onClick={() => setSelected(i)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setSelected(null)}>
              <X size={32} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={40} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={40} />
            </button>
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              src={filtered[selected].src}
              alt={filtered[selected].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm sm:text-base text-center px-4">
              {filtered[selected].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
