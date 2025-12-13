"use client";

import { useState } from "react";
import { Globe, Check, Languages } from "lucide-react";
import { useLanguage } from "./language_context";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "fr" as const, label: "Français", shortLabel: "FR" },
    { code: "en" as const, label: "English", shortLabel: "EN" },
  ];

  const handleLanguageChange = (newLocale: "fr" | "en") => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
      >
        <Languages className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700 uppercase">
          {locale}
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
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${
                  locale === lang.code ? "bg-gray-50 font-semibold" : ""
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-300">
                  {lang.shortLabel}
                </span>
                <span className="flex-1 text-left">{lang.label}</span>
                {locale === lang.code && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
