"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label : "Home", href: "#" },
        { label : "Albums", href: "#gallery" },
        { label : "About", href: "#about" },
        { label : "Contact", href: "#contact" },
    ]

    return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
            
            {/* Left: Logo */}
            <Link href="/" className="text-xl font-semibold tracking-tight">
                MyGallery
            </Link>

            {/* Center: Navigation links (desktop) */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
            {navItems.map((item) => (
                <a
                key={item.href}
                href={item.href}
                className="
                    relative text-gray-700 hover:text-black transition
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:w-full after:scale-x-0 after:bg-black after:origin-left
                    after:transition after:duration-300 hover:after:scale-x-100
                "
                >
                {item.label}
                </a>
            ))}
            </div>

            {/* Right: Profile icon */}
            <div className="hidden md:flex">
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <User className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2"
                onClick={() => setIsOpen(!open)}
                aria-label="toggle menu"
            >
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
                {navItems.map((item) => (
                    <a
                    key={item.href}
                    href={item.href}
                    className="block text-gray-700 text-base"
                    onClick={() => setIsOpen(false)}
                    >
                    {item.label}
                    </a>
                ))}

                {/* Profile icon mobile */}
                <div className="pt-2 border-t">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <User className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        )}
        </nav>
    );
}