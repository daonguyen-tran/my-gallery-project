export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-semibold mb-6 tracking-tight">À propos</h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                    Bienvenue dans ma galerie photo.  
                    Ce site présente mes albums et mes plus beaux souvenirs capturés au fil du temps.  
                    Chaque album raconte une histoire, et chaque image est un instant figé dans le temps.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                    Ce projet est aussi une démonstration technique, construit avec  
                    <span className="font-medium text-gray-800"> Next.js, TypeScript, Prisma, Supabase</span>  
                    et stylisé avec <span className="font-medium text-gray-800">Tailwind & shadcn/ui</span>.
                </p>
            </div>
        </section>
    );
}
