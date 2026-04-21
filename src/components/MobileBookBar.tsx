import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function MobileBookBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <Link
        to="/book"
        className="flex items-center justify-center gap-2 w-full bg-sunset hover:bg-sunset-light text-white py-3.5 rounded-full font-semibold text-base transition-all active:scale-95"
      >
        <Calendar size={20} />
        Book Your Stay
      </Link>
    </div>
  );
}
