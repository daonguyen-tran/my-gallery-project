import AnimateOnScroll from "../animate_on_scroll";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl font-semibold mb-6 tracking-tight">
            À propos
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Bonjour, je suis Daonguyen TRAN. Cette galerie présente une
            sélection professionnelle d'albums photographiques destinés aux
            projets, portfolios et présentations commerciales. Chaque album met
            en valeur un travail soigné, pensé pour la clarté visuelle et la
            narration.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Ce site sert également de vitrine technique : il a été développé
            avec
            <span className="font-medium text-gray-800"> Next.js</span>,
            <span className="font-medium text-gray-800"> TypeScript</span> et
            <span className="font-medium text-gray-800"> Prisma</span>, et est
            stylisé avec
            <span className="font-medium text-gray-800"> Tailwind CSS</span> et
            <span className="font-medium text-gray-800"> shadcn/ui</span>. Les
            icônes utilisent
            <span className="font-medium text-gray-800"> Lucide</span>.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Pour un devis, une collaboration ou une demande commerciale, envoyez
            directement un email à
            <a
              href="mailto:daonguyentr.pro@gmail.com"
              className="ml-1 text-gray-800 font-medium hover:underline"
            >
              daonguyentr.pro@gmail.com
            </a>
            .
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
