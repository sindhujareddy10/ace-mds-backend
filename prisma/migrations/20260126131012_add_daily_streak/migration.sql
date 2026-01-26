/*
  Warnings:

  - You are about to drop the column `questionsSolved` on the `DailyStreak` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `DailyStreak` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `count` to the `DailyStreak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyStreak" DROP COLUMN "questionsSolved",
ADD COLUMN     "count" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DailyStreak_userId_date_key" ON "DailyStreak"("userId", "date");
