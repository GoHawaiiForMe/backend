/*
  Warnings:

  - You are about to drop the column `startDate` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `tripDate` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "startDate",
ADD COLUMN     "tripDate" TIMESTAMP(3) NOT NULL;
