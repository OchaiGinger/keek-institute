/*
  Warnings:

  - You are about to drop the `AppUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MuxData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaypalOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingMode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `signup_draft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_authUserId_fkey";

-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_appUserId_fkey";

-- DropForeignKey
ALTER TABLE "MuxData" DROP CONSTRAINT "MuxData_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "PaypalOrder" DROP CONSTRAINT "PaypalOrder_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_appUserId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_genderId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_trainingModeId_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_chapterId_fkey";

-- DropTable
DROP TABLE "AppUser";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Gender";

-- DropTable
DROP TABLE "Instructor";

-- DropTable
DROP TABLE "MuxData";

-- DropTable
DROP TABLE "PaypalOrder";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "StripeCustomer";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentCategory";

-- DropTable
DROP TABLE "TrainingMode";

-- DropTable
DROP TABLE "UserProgress";

-- DropTable
DROP TABLE "signup_draft";

-- DropEnum
DROP TYPE "AccountStatus";

-- DropEnum
DROP TYPE "PaypalOrderStatus";
