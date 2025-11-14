export default function HeroSection() {
    return (
        <section
        id="home"
        className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
                style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format')",
                }}
            />

            {/* Overlay (dark gradient) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl px-6 text-white animate-fadeIn">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    Immortalisez chaque instant
                </h1>

                <p className="text-lg md:text-xl opacity-90 mb-8">
                    Découvrez une collection unique d’albums et de photos capturées avec passion.
                </p>

                <a
                    href="#gallery"
                    className="
                        inline-block px-8 py-3 rounded-full 
                        bg-white text-black font-semibold 
                        hover:bg-gray-200 transition
                    "
                >
                    Voir la galerie
                </a>
            </div>
        </section>
    );
}
