/*
  Warnings:

  - The values [CHAUNGBUK,CHAUNGNAM] on the enum `ServiceArea` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceArea_new" AS ENUM ('SEOUL', 'BUSAN', 'INCHEON', 'DAEGU', 'DAEJEON', 'GWANGJU', 'ULSAN', 'SEJONG', 'GYEONGGI', 'GANGWON', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU');
ALTER TABLE "DreamerProfile" ALTER COLUMN "serviceArea" TYPE "ServiceArea_new"[] USING ("serviceArea"::text::"ServiceArea_new"[]);
ALTER TABLE "MakerProfile" ALTER COLUMN "serviceArea" TYPE "ServiceArea_new"[] USING ("serviceArea"::text::"ServiceArea_new"[]);
ALTER TABLE "Plan" ALTER COLUMN "serviceArea" TYPE "ServiceArea_new" USING ("serviceArea"::text::"ServiceArea_new");
ALTER TYPE "ServiceArea" RENAME TO "ServiceArea_old";
ALTER TYPE "ServiceArea_new" RENAME TO "ServiceArea";
DROP TYPE "ServiceArea_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "DreamerProfile" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MakerProfile" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Notification";

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");
