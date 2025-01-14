/*
  Warnings:

  - The values [A,B,C,D] on the enum `ProfileImage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProfileImage_new" AS ENUM ('DEFAULT_1', 'DEFAULT_2', 'DEFAULT_3', 'DEFAULT_4');
ALTER TABLE "DreamerProfile" ALTER COLUMN "image" TYPE "ProfileImage_new" USING ("image"::text::"ProfileImage_new");
ALTER TABLE "MakerProfile" ALTER COLUMN "image" TYPE "ProfileImage_new" USING ("image"::text::"ProfileImage_new");
ALTER TYPE "ProfileImage" RENAME TO "ProfileImage_old";
ALTER TYPE "ProfileImage_new" RENAME TO "ProfileImage";
DROP TYPE "ProfileImage_old";
COMMIT;

-- DropIndex
DROP INDEX "User_id_key";
