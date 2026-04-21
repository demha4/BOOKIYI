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

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
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
