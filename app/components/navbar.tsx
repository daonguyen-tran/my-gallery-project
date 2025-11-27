"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, LogIn, UserCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Galerie", href: "/#gallery" },
    { label: "A propos", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const getRoleBadge = (role: string) => {
    const badges = {
      ADMIN: { label: "Admin", color: "bg-red-100 text-red-700" },
      USER: { label: "Utilisateur", color: "bg-blue-100 text-blue-700" },
      GUEST: { label: "Invité", color: "bg-gray-100 text-gray-700" },
    };
    return badges[role as keyof typeof badges] || badges.GUEST;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto w-full px-6 flex items-center justify-center h-16 relative">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight absolute left-6"
        >
          MyGallery
        </Link>

        {/* Center: Navigation links (desktop) */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "relative text-gray-700 hover:text-black transition " +
                "after:absolute after:left-0 after:-bottom-1 after:h-[2px] " +
                "after:w-full after:scale-x-0 after:bg-black after:origin-left " +
                "after:transition after:duration-300 hover:after:scale-x-100"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Profile section */}
        <div className="hidden md:flex items-center gap-3 absolute right-6">
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : session?.user ? (
            <TooltipProvider>
              <div className="flex items-center gap-3">
                {/* User info with name */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <UserCircle className="w-5 h-5 text-white cursor-pointer" />
                        </div>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p className="font-semibold">{session.user.name}</p>
                        <p className="text-gray-500 text-xs">
                          {session.user.email}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  {/* Display user name */}
                  {/*<span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>*/}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
                    {session.user.name}
                  </span>
                </Link>

                {/* Logout button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="p-2 rounded-full hover:bg-red-50 transition text-red-600"
                    >
                      <LogOut className="w-4 h-4 cursor-pointer" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Se déconnecter</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ) : (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                Invité
              </span>
              <Link
                href="/auth"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm font-medium cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Se connecter
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 absolute right-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-gray-700 text-base"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Profile section mobile */}
          <div className="pt-2 border-t">
            {session?.user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{session.user.name}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
                      {session.user.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  Invité
                </span>
                <Link
                  href="/auth"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
