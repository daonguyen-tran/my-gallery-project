import AnimateOnScroll from "../animate_on_scroll";
import { Camera, Palette, Users, Sparkles, Lock } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Camera,
      title: "Albums illimités",
      description:
        "Créez autant d'albums que vous le souhaitez pour organiser tous vos souvenirs",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Partage collaboratif",
      description:
        "Partagez vos albums avec vos proches et découvrez les leurs",
      color: "text-purple-600",
    },
    {
      icon: Lock,
      title: "Vos albums, votre contrôle",
      description:
        "Seul vous pouvez modifier, ajouter ou supprimer vos propres albums et photos",
      color: "text-green-600",
    },
    {
      icon: Palette,
      title: "Design élégant",
      description: "Interface soignée qui met en valeur vos plus belles photos",
      color: "text-pink-600",
    },
    {
      icon: Sparkles,
      title: "Simple d'utilisation",
      description: "Uploadez et organisez vos photos en quelques clics",
      color: "text-indigo-600",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 text-center bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              À propos de MyGallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne pour organiser et partager vos souvenirs
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <span className="font-semibold text-gray-900">MyGallery</span> est
              une application web qui vous permet de créer, organiser et
              partager vos albums photo de manière simple et élégante. Que vous
              souhaitiez immortaliser des moments en famille, partager vos
              voyages ou simplement conserver vos souvenirs, MyGallery vous
              offre tous les outils nécessaires.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Avec un système de permissions sophistiqué, vous gardez le
              contrôle total sur vos albums : choisissez qui peut les voir, les
              modifier ou les supprimer. L'interface moderne et intuitive vous
              garantit une expérience fluide sur tous vos appareils.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${feature.color} mb-4`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Technologies utilisées
            </h3>
            <p className="text-lg mb-6 opacity-90">
              MyGallery est développé avec les technologies web les plus
              modernes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                Next.js 16
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                Prisma ORM
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                Supabase
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                NextAuth.js
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                shadcn/ui
              </span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
