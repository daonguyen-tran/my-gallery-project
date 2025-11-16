import { Camera, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column: Brand + Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8 text-white" />
            <div>
              <span className="text-xl font-semibold text-white">
                MyGallery
              </span>
              <div className="text-xs text-gray-400">
                Studio de photographie & gestion d'images
              </div>
            </div>
          </div>

          <p className="text-gray-400 mt-4 max-w-sm text-center md:text-left">
            Nous aidons les créateurs et les entreprises à présenter leurs
            images avec élégance. Solutions de galerie, gestion d'albums et
            intégration professionnelle.
          </p>
        </div>

        {/* Column: Navigation */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-medium text-lg mb-3 text-center md:text-left">
            Navigation
          </h3>
          <ul className="space-y-2 text-gray-400 text-center md:text-left">
            <li>
              <a href="/" className="hover:text-white transition">
                Accueil
              </a>
            </li>
            <li>
              <a href="/#gallery" className="hover:text-white transition">
                Galerie
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-white transition">
                À propos
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/legal" className="hover:text-white transition">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>

        {/* Column: Contact + Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-medium text-lg mb-3">Contact</h3>
          <p className="text-gray-400">
            Email&nbsp;:{" "}
            <a
              href="mailto:daonguyentr.pro@gmail.com"
              className="text-white hover:underline"
            >
              daonguyentr.pro@gmail.com
            </a>
          </p>
          <p className="text-gray-400 mt-1">
            Téléphone&nbsp;:{" "}
            <a href="tel:+33000000000" className="text-white hover:underline">
              +33 0 00 00 00 00
            </a>
          </p>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Réseaux</h4>
            <TooltipProvider delayDuration={80}>
              <div className="flex gap-4 justify-center md:justify-start">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://www.instagram.com/daonguyen.tr04/"
                      target="_blank"
                    >
                      <Instagram className="w-6 h-6 hover:text-white transition cursor-pointer" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-sm">
                    Instagram
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/daonguyen-tran"
                      target="_blank"
                    >
                      <Github className="w-6 h-6 hover:text-white transition cursor-pointer" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-sm">
                    GitHub
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} MyGallery Studio - Tous droits
            réservés.
          </div>
          <div className="space-x-4">
            <a href="/legal" className="hover:text-white transition">
              Mentions légales
            </a>
            <a href="/privacy" className="hover:text-white transition">
              Politique de confidentialité
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
