import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  credentials: {
    async authorize(credentials: Record<string, unknown>) {
      const { email, password } = credentials as {
        email: string;
        password?: string;
      };

      if (!email) return null;

      // 1. Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          accounts: true, // This is where the password likely lives
        },
      });

      if (!user) return null;

      // 2. Check password (using your Account model logic)
      const account = user.accounts.find(
        (acc) => acc.providerId === "credentials",
      );
      if (!account || account.password !== password) {
        // Note: Always use bcrypt/argon2 to compare hashed passwords in production!
        return null;
      }

      // 3. Return the user object for the session
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  },
});
