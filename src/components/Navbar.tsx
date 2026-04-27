import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { navLinks, siteInfo } from "../data/content";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

// Inline Instagram SVG — lucide-react doesn't ship brand glyphs (trademark reasons),
// so we use the official-style camera mark.
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location.pathname === "/";
  const solid = isScrolled || !isHome;
  const shellClass = solid
    ? "bg-cream/95 backdrop-blur-md shadow-[0_12px_30px_rgba(15,42,58,0.10)] border border-[var(--color-border)]"
    : "bg-white/8 backdrop-blur-md border border-white/12 shadow-[0_12px_30px_rgba(0,0,0,0.14)]";
  const textClass = solid ? "text-charcoal" : "text-white";

  return (
    <>
      <nav className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-5 lg:px-6 pointer-events-none">
        <div className="max-w-[1240px] mx-auto pointer-events-auto">
          <div className={`rounded-[1.4rem] sm:rounded-xl transition-all duration-300 ${shellClass}`}>
            <div className="px-4 sm:px-5 lg:px-7">
              <div className="flex items-center justify-between h-[68px] sm:h-[74px] lg:h-[82px] gap-4">
                <Link to="/" className="transition-colors shrink-0" aria-label="Tamount Surf House home">
                  <Logo className={`h-8 sm:h-9 lg:h-10 w-auto ${solid ? "" : "[filter:brightness(0)_invert(1)]"}`} />
                </Link>

                <div className="hidden xl:flex items-center gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm font-medium transition-colors hover:opacity-75 ${textClass} ${
                        location.pathname === link.path ? "opacity-100 border-b-2 border-current pb-1" : "opacity-85"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="hidden xl:block">
                  <Link
                    to="/book"
                    className="bg-ocean hover:bg-ocean-dark text-white px-6 lg:px-7 py-2.5 lg:py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg active:scale-95"
                  >
                    Book Now
                  </Link>
                </div>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`xl:hidden p-2 transition-colors shrink-0 ${textClass}`}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-sm px-3 sm:px-5 pt-24"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="max-w-[1240px] mx-auto rounded-xl bg-cream/98 border border-[var(--color-border)] shadow-[0_18px_50px_rgba(15,42,58,0.18)] p-4 sm:p-5 max-h-[calc(100vh-6rem)] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="divide-y divide-[var(--color-border)]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between px-2 py-3 text-base font-semibold transition-colors ${
                      location.pathname === link.path ? "text-ocean" : "text-charcoal hover:text-ocean"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm opacity-40">/</span>
                  </Link>
                </motion.div>
              ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 grid grid-cols-2 gap-3"
              >
                <Link
                  to="/book/bed-and-breakfast"
                  className="block w-full bg-white border border-[var(--color-border)] text-charcoal text-center py-3 rounded-full text-sm font-semibold"
                >
                  B&amp;B
                </Link>
                <Link
                  to="/book"
                  className="block w-full bg-ocean text-white text-center py-3 rounded-full text-sm font-semibold"
                >
                  Book Now
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-4 pt-4 border-t border-[var(--color-border)]"
              >
                <div className="flex flex-col">
                  <a
                    href={`https://wa.me/${siteInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-2 py-2.5 text-charcoal text-sm font-medium hover:text-ocean transition-colors"
                  >
                    <MessageCircle size={16} className="text-ocean shrink-0" />
                    <span>{siteInfo.phone}</span>
                  </a>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="flex items-center gap-3 px-2 py-2.5 text-charcoal text-sm font-medium hover:text-ocean transition-colors"
                  >
                    <Mail size={16} className="text-ocean shrink-0" />
                    <span className="truncate">{siteInfo.email}</span>
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <a
                    href={siteInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Tamount Surf House on Instagram"
                    className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-charcoal hover:bg-ocean hover:text-white hover:border-ocean transition-colors"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href={`https://wa.me/${siteInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Tamount Surf House"
                    className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-charcoal hover:bg-ocean hover:text-white hover:border-ocean transition-colors"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}
                    aria-label="Call Tamount Surf House"
                    className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-charcoal hover:bg-ocean hover:text-white hover:border-ocean transition-colors"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
