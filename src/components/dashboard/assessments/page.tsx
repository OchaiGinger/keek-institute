import { auth } from "@/lib/auth"; // Your Better Auth configuration
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AnalysisClient from "./_components/analysis";

export default async function AnalysisPage() {
  const session = await auth.api.getSession();

  if (!session) {
    redirect("/login");
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: {
      assessmentResults: true,
      firstName: true,
    },
  });

  if (!student || !student.assessmentResults) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-xl font-semibold">No Assessment Found</h2>
        <p className="text-muted-foreground">
          Please complete your initial assessment to view results.
        </p>
      </div>
    );
  }

  // Cast the Json field to your expected type
  const results = student.assessmentResults as {
    score: number;
    status: string;
    feedback: string;
    recommendedPath: string;
  };

  return <AnalysisClient results={results} firstName={student.firstName} />;
}
