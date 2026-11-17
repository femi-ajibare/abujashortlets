import { useState } from "react";
import ContactBand from "./components/ContactBand";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Listings from "./components/Listings";
import MobileBar from "./components/MobileBar";
import WhyUs from "./components/WhyUs";
import type { City } from "./data";

export default function App() {
  const [city, setCity] = useState<City>("abuja");

  return (
    <div className="min-h-screen bg-cream pb-16 lg:pb-0">
      <a
        href="#listings"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to listings
      </a>
      <Header city={city} onCityChange={setCity} />
      <main>
        <Hero city={city === "abuja" ? "Abuja" : "Lagos"} />
        <Listings city={city} />
        <WhyUs />
        <ContactBand />
      </main>
      <Footer />
      <MobileBar city={city} />
    </div>
  );
}