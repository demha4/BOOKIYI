import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Anza Surf House</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your home away from home in the heart of Morocco's surf coast. 
              Surf, yoga, community, and endless sunsets.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sunset transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Rooms", path: "/rooms" },
                { label: "Surf Packages", path: "/packages" },
                { label: "About Us", path: "/about" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Surf Packages</h4>
            <div className="flex flex-col gap-2">
              <Link to="/packages" className="text-gray-400 hover:text-white text-sm transition-colors">
                Surf & Stay
              </Link>
              <Link to="/packages" className="text-gray-400 hover:text-white text-sm transition-colors">
                Beginner Surf Camp
              </Link>
              <Link to="/packages" className="text-gray-400 hover:text-white text-sm transition-colors">
                Weekly Surf Experience
              </Link>
              <Link to="/book" className="text-gray-400 hover:text-white text-sm transition-colors">
                Custom Booking
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Anza,Agadir,Morocco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Anza, Agadir, Morocco<br />Near Taghazout & Tamraght</span>
              </a>
              <a
                href="tel:+212612345678"
                className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Phone size={16} />
                <span>+212 6 12 34 56 78</span>
              </a>
              <a
                href="mailto:hello@anzasurfhouse.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Mail size={16} />
                <span>hello@anzasurfhouse.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Anza Surf House. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
