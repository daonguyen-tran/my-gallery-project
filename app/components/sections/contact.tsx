"use client";

import { Mail, MessageSquare, User } from "lucide-react";
import AnimateOnScroll from "../animate_on_scroll";
import { useLanguage } from "../language_context";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-5xl text-center font-bold mb-10">
            {t("contact.title")}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-4">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("contact.description")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="mailto:daonguyentr.pro@gmail.com"
              className="flex items-center gap-3 border border-gray-300 hover:border-black transition px-6 py-3 rounded-lg text-gray-800 hover:text-black"
            >
              <Mail className="w-6 h-6" />
              <span>daonguyentr.pro@gmail.com</span>
            </a>

            <p className="text-sm text-gray-500">{t("contact.responseTime")}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-600">
            <div className="flex flex-col items-center">
              <User className="w-8 h-8 text-gray-700 mb-3" />
              <p>{t("contact.passionatePhotographer")}</p>
            </div>

            <div className="flex flex-col items-center">
              <MessageSquare className="w-8 h-8 text-gray-700 mb-3" />
              <p>{t("contact.availableForProjects")}</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-gray-700 mb-3" />
              <p>{t("contact.simpleContact")}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
