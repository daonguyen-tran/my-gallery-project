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
        <footer className="bg-black text-gray-300 py-10 mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

                {/* Logo + description */}
                <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                    <Camera className="w-7 h-7 text-white" />
                    <span className="text-xl font-semibold text-white">MyGallery</span>
                </div>

                <p className="text-gray-400 mt-4">
                    Une galerie moderne pour présenter mes albums et mes plus belles photos.
                </p>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col items-center">
                <h3 className="text-white font-medium text-lg mb-3">Navigation</h3>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#home" className="hover:text-white transition">Accueil</a></li>
                    <li><a href="#gallery" className="hover:text-white transition">Galerie</a></li>
                    <li><a href="#about" className="hover:text-white transition">À propos</a></li>
                </ul>
                </div>

                {/* Social links + tooltips */}
                <div className="flex flex-col items-center md:items-end">
                <h3 className="text-white font-medium text-lg mb-3">Réseaux</h3>
                <TooltipProvider delayDuration={80}>
                    <div className="flex gap-4">

                    {/* Instagram */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href="https://www.instagram.com/daonguyen.tr04/" target="_blank">
                            <Instagram className="w-6 h-6 hover:text-white transition cursor-pointer" />
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-sm">
                        Instagram
                        </TooltipContent>
                    </Tooltip>

                    {/* GitHub */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href="https://github.com/daonguyen-tran" target="_blank">
                            <Github className="w-6 h-6 hover:text-white transition cursor-pointer" />
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-sm">
                        GitHub
                        </TooltipContent>
                    </Tooltip>

                    {/* Email */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href="mailto:daonguyentr.pro@gmail.com">
                            <Mail className="w-6 h-6 hover:text-white transition cursor-pointer" />
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-sm">
                        Email
                        </TooltipContent>
                    </Tooltip>

                    </div>
                </TooltipProvider>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} MyGallery — Tous droits réservés.
            </div>
        </footer>
    );
}
