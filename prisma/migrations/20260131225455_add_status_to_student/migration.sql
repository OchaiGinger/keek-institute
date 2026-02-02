-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_appUserId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_appUserId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "signup_draft" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "genderId" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT,
    "nationality" TEXT,
    "stateOfOriginId" TEXT,
    "lga" TEXT,
    "address" TEXT,
    "categoryId" TEXT,
    "trainingModeId" TEXT,
    "programId" TEXT,
    "ninNumber" TEXT,
    "passportPhotoUrl" TEXT,
    "admissionLetterUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signup_draft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signup_draft_email_key" ON "signup_draft"("email");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_appUserId_fkey" FOREIGN KEY ("appUserId") REFERENCES "AppUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_appUserId_fkey" FOREIGN KEY ("appUserId") REFERENCES "AppUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
