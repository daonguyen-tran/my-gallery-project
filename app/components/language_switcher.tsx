"use client";

import { useState, useTransition } from "react";
import { Globe } from "lucide-react";
//import { setLocale } from "@/lib/locale";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const handleLanguageChange = (locale: string) => {
    startTransition(async () => {
      await setLocale(locale);
      setIsOpen(false);
      window.location.reload();
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        disabled={isPending}
      >
        <Globe className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700 uppercase">
          {currentLocale}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  currentLocale === lang.code ? "bg-gray-50 font-semibold" : ""
                }`}
                disabled={isPending}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
                {currentLocale === lang.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
