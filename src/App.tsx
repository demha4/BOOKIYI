import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./contexts/BookingContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileBookBar from "./components/MobileBookBar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Packages from "./pages/Packages";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import BookNow from "./pages/BookNow";
import Surf from "./pages/Surf";
import Experiences from "./pages/Experiences";
import Faq from "./pages/Faq";
import PackageBedAndBreakfast from "./pages/PackageBedAndBreakfast";
import PackageSurfCamp from "./pages/PackageSurfCamp";

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/surf" element={<Surf />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/bed-and-breakfast" element={<PackageBedAndBreakfast />} />
            <Route path="/packages/surf-camp" element={<PackageSurfCamp />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookNow />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileBookBar />
      </div>
    </BookingProvider>
  );
}

export default App;
