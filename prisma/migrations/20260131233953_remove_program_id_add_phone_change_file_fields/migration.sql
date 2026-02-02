/*
  Warnings:

  - You are about to drop the column `admissionLetterUrl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `passportPhotoUrl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `admissionLetterUrl` on the `signup_draft` table. All the data in the column will be lost.
  - You are about to drop the column `passportPhotoUrl` on the `signup_draft` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `signup_draft` table. All the data in the column will be lost.
  - Added the required column `passportPhotoPath` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "admissionLetterUrl",
DROP COLUMN "passportPhotoUrl",
DROP COLUMN "programId",
ADD COLUMN     "admissionLetterPath" TEXT,
ADD COLUMN     "passportPhotoPath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "signup_draft" DROP COLUMN "admissionLetterUrl",
DROP COLUMN "passportPhotoUrl",
DROP COLUMN "programId",
ADD COLUMN     "admissionLetterPath" TEXT,
ADD COLUMN     "passportPhotoPath" TEXT;
