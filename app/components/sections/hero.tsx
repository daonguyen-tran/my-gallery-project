import { Camera, Heart, Share2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2400&auto=format')",
        }}
      />

      {/* Overlay (dark gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-white animate-fadeIn">
        <div className="flex items-center justify-center gap-3 mb-8 pb-2">
          <Camera className="w-12 h-12 text-blue-400" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight py-1">
            MyGallery
          </h1>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Vos souvenirs, magnifiquement organisés
        </h2>

        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Créez, partagez et organisez vos albums photo en toute simplicité.
          Immortalisez vos plus beaux moments et partagez-les avec le monde.
        </p>

        {/*<div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Heart className="w-5 h-5 text-red-400" />
            <span>Albums illimités</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Share2 className="w-5 h-5 text-green-400" />
            <span>Partage facile</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Camera className="w-5 h-5 text-blue-400" />
            <span>Interface moderne</span>
          </div>
        </div>*/}

        <a
          href="#gallery"
          className="
                        inline-block px-8 py-3 rounded-full 
                        bg-gradient-to-r from-blue-500 to-purple-500
                        hover:from-blue-600 hover:to-purple-600
                        text-white font-semibold 
                        transition-all duration-300
                        shadow-lg hover:shadow-xl
                        hover:scale-105
                    "
        >
          Découvrir la galerie
        </a>
      </div>
    </section>
  );
}
