"use client";

import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(" ")[0] || "";
  const isGuest = !session;

  return (
    <section
      id="home"
      className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75 pt-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2400&auto=format')",
        }}
      />

      {/* Overlay (dark gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

      {/* Particules lumineuses animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 h-1 bg-white rounded-full animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-white animate-fadeIn">
        <div className="flex items-center justify-center gap-3 mb-8 pb-2">
          <Camera className="w-12 h-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-2 rounded-lg" />
          <h1 className="text-4xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight py-1">
            MyGallery
          </h1>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          {isGuest
            ? "Découvrez les œuvres partagées par notre communauté"
            : `Bienvenue${firstName ? " " + firstName : ""} !`}
        </h2>

        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {isGuest
            ? "Explorez les magnifiques albums créés par nos utilisateurs. Pour partager vos propres souvenirs et créer vos albums, connectez-vous ou créez un compte gratuit !"
            : "Organisez vos plus beaux souvenirs, créez vos albums et partagez-les avec vos proches. Votre galerie personnelle vous attend !"}
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
                        bg-white text-black
                        hover:bg-gray-100
                        font-semibold 
                        transition-all duration-300
                        shadow-lg hover:shadow-2xl
                        hover:scale-105
                    "
        >
          Découvrir la galerie
        </a>
      </div>
    </section>
  );
}
