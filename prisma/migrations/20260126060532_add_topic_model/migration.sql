/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_subjectId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "subjectId";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
