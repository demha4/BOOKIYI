import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212612345678?text=Hi!%20I%20want%20to%20book%20a%20stay%20at%20Tamount%20Surf%20House."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1fb458] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
