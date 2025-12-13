"use client";

import AnimateOnScroll from "../animate_on_scroll";
import { Camera, Palette, Users, Sparkles, Lock } from "lucide-react";
import { useLanguage } from "../language_context";

export default function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: t("about.features.creativity.title"),
      description: t("about.features.creativity.description"),
    },
    {
      icon: Users,
      title: t("about.features.sharing.title"),
      description: t("about.features.sharing.description"),
    },
    {
      icon: Lock,
      title: t("about.features.control.title"),
      description: t("about.features.control.description"),
    },
    {
      icon: Palette,
      title: t("about.features.design.title"),
      description: t("about.features.design.description"),
    },
    {
      icon: Sparkles,
      title: t("about.features.simplicity.title"),
      description: t("about.features.simplicity.description"),
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 text-center bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-10 text-black">
              {t("about.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-12 hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {t("about.description1", { appName: "MyGallery" })}
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              {t("about.description2")}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-2xl hover:border-black transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4 text-gray-800 group-hover:text-black transition-colors duration-300">
                  <feature.icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
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
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl border border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t("about.techTitle")}
            </h3>
            <p className="text-lg mb-6 text-gray-300">
              {t("about.techDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Next.js 16
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Prisma ORM
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Supabase
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                NextAuth.js
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                shadcn/ui
              </span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
