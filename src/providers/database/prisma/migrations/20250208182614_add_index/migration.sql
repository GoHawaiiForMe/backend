/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_providerId_key";

-- AlterTable
ALTER TABLE "DreamerProfile" ADD CONSTRAINT "DreamerProfile_pkey" PRIMARY KEY ("userId");

-- DropIndex
DROP INDEX "DreamerProfile_userId_key";

-- AlterTable
ALTER TABLE "MakerProfile" ADD CONSTRAINT "MakerProfile_pkey" PRIMARY KEY ("userId");

-- DropIndex
DROP INDEX "MakerProfile_userId_key";

-- AlterTable
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_pkey" PRIMARY KEY ("userId");

-- DropIndex
DROP INDEX "UserStats_userId_key";

-- CreateIndex
CREATE INDEX "Quote_planId_idx" ON "Quote"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_providerId_key" ON "User"("provider", "providerId");
