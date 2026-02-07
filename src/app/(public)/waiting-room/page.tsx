// app/(public)/waiting-room/page.tsx
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WaitingRoom } from "./_components/waiting-room";
import { headers } from "next/headers";

export default async function WaitingRoomPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // Better-Auth needs headers to find the session cookie
  });
  if (!session?.user) {
    redirect("/signin");
  }

  // Fetch the student record to get the createdAt date and check status
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  // If they are already approved, send them to onboarding!
  if (student?.status === "APPROVED") {
    redirect("/onboarding");
  }

  return (
    <div className="container flex items-center justify-center min-height-screen">
      <WaitingRoom
        student={{
          name: session.user.name,
          email: session.user.email,
          createdAt: student?.createdAt,
        }}
      />
    </div>
  );
}
