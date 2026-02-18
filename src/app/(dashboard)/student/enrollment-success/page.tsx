import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function EnrollmentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Enrollment Successful!</h1>
      <p className="text-muted-foreground mb-8">
        You have been successfully enrolled in the course. You can now start
        learning.
      </p>
      <div className="flex gap-4">
        <Link
          href="/student/courses"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          View My Courses
        </Link>
      </div>
    </div>
  );
}
