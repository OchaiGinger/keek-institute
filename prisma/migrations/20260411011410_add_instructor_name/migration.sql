/*
  Warnings:

  - You are about to drop the column `passportPhotoPath` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paystackCustomerId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('Pending', 'Active', 'Cancled');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instructorId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "passportPhotoPath",
ADD COLUMN     "assessmentResults" JSONB,
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paystackCustomerId" TEXT,
ADD COLUMN     "profilePhotoKey" TEXT;

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'Pending',
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_paystackCustomerId_key" ON "Student"("paystackCustomerId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
