import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { env } from "@/lib/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "USER" },
      firstName: { type: "string" },
      middleName: { type: "string", required: false },
      lastName: { type: "string" },
      gender: { type: "string" },
      dateOfBirth: { type: "string" },
      phone: { type: "string" },
      nationality: { type: "string" },
      stateOfOrigin: { type: "string" },
      lga: { type: "string" },
      address: { type: "string" },
      ninNumber: { type: "string" },
      category: { type: "string" },
      trainingMode: { type: "string" },
    },
  },

  emailAndPassword: {
    enabled: true,
    // ← remove the entire authorize function, better-auth handles password hashing
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const data = user as any;

          const pendingInvite = await prisma.instructor.findUnique({
            where: { email: user.email },
          });

          if (pendingInvite && !pendingInvite.userId) {
            await prisma.instructor.update({
              where: { id: pendingInvite.id },
              data: { userId: user.id },
            });
            await prisma.user.update({
              where: { id: user.id },
              data: { role: "INSTRUCTOR" },
            });
            return;
          }

          try {
            const birthDate = data.dateOfBirth
              ? new Date(data.dateOfBirth)
              : new Date();

            await prisma.student.create({
              data: {
                userId: user.id,
                firstName: data.firstName || "N/A",
                lastName: data.lastName || "N/A",
                middleName: data.middleName || null,
                gender: data.gender as any,
                dateOfBirth: birthDate,
                phone: data.phone || "N/A",
                nationality: data.nationality || "Nigerian",
                stateOfOrigin: data.stateOfOrigin || "N/A",
                lga: data.lga || "N/A",
                address: data.address || "N/A",
                ninNumber: data.ninNumber || `PENDING-${Date.now()}`,
                category: (data.category as any) || "REGULAR",
                trainingMode: (data.trainingMode as any) || "PHYSICAL",
                profilePhotoKey: "/placeholder-avatar.png",
                status: "PENDING",
              },
            });
          } catch (error) {
            console.error("CRITICAL: Student Creation Failed:", error);
          }
        },
      },
    },
  },

  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },

  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/auth-error",
  },

  plugins: [],
});
