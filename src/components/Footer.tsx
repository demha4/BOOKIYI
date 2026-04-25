import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { navLinks, siteInfo } from "../data/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-4 inline-block">
              <Logo className="h-9 w-auto" />
            </div>
            <p className="text-white/65 text-sm leading-7 mb-5 max-w-sm">
              {siteInfo.tagline}
            </p>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2.5 text-sm font-medium hover:bg-ocean-dark transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp us
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-white/65 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link to="/faq" className="text-white/65 hover:text-white text-sm transition-colors">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Stay details</h4>
            <div className="space-y-2.5 text-sm text-white/65 leading-7">
              <p>Dorm beds from €12 / night</p>
              <p>Double room from €30 / night</p>
              <p>Triple room from €35 / night</p>
              <p>Breakfast included</p>
              <p>Surf lessons, rentals, and local trips available</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/65 hover:text-white text-sm transition-colors">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{siteInfo.location}</span>
              </a>
              <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-white/65 hover:text-white text-sm transition-colors">
                <Phone size={16} />
                <span>{siteInfo.phone}</span>
              </a>
              <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-3 text-white/65 hover:text-white text-sm transition-colors">
                <Mail size={16} />
                <span>{siteInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/45 text-sm">&copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <div className="flex gap-6 text-white/45 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
