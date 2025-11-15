import HeroSection from "./components/sections/hero";
import GallerySection from "./components/sections/gallery";
import AboutSection from "./components/sections/about";
import ContactSection from "./components/sections/contact";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <>
      { /* Sections */}
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
