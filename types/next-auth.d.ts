import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    role: "ADMIN" | "USER" | "GUEST";
    firstname?: string;
    surname?: string;
  }

  interface Session {
    user: {
      id: number;
      role: "ADMIN" | "USER" | "GUEST";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: "ADMIN" | "USER" | "GUEST";
  }
}
