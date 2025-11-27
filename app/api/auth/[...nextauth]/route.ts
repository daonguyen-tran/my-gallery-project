import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Vérifier le mot de passe hashé
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstname} ${user.surname}`,
          role: user.role,
          image: user.profileImage,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      // Lors de la connexion initiale
      if (user) {
        token.id = Number(user.id);
        token.role = user.role;
        token.picture = user.image;
      }

      // Rafraîchir les données depuis la DB lors d'une mise à jour
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: Number(token.id) },
          select: {
            id: true,
            firstname: true,
            surname: true,
            email: true,
            role: true,
            profileImage: true,
          },
        });

        if (dbUser) {
          token.name = `${dbUser.firstname} ${dbUser.surname}`;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.picture = dbUser.profileImage;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture as string | null | undefined;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
