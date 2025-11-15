import { Mail, MessageSquare, User } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 px-6 bg-white">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-semibold mb-6 tracking-tight">
                Contact
                </h2>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Pour toute demande de renseignements, projets ou collaborations,  
                n’hésite pas à me contacter directement par email.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4">

                <a
                    href="mailto:contact@example.com"
                    className="flex items-center gap-3 border border-gray-300 hover:border-black transition px-6 py-3 rounded-lg text-gray-800 hover:text-black"
                >
                    <Mail className="w-6 h-6" />
                    <span>contact@example.com</span>
                </a>

                <p className="text-sm text-gray-500">
                    Réponse généralement sous 24h.
                </p>
                </div>

                <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-600">

                <div className="flex flex-col items-center">
                    <User className="w-8 h-8 text-gray-700 mb-3" />
                    <p>Photographe passionné</p>
                </div>

                <div className="flex flex-col items-center">
                    <MessageSquare className="w-8 h-8 text-gray-700 mb-3" />
                    <p>Disponible pour projets</p>
                </div>

                <div className="flex flex-col items-center">
                    <Mail className="w-8 h-8 text-gray-700 mb-3" />
                    <p>Contact simple et direct</p>
                </div>

                </div>
            </div>
        </section>
    );
}
