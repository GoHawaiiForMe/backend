-- CreateEnum
CREATE TYPE "ProfileImage" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('FOOD_TOUR', 'SHOPPING', 'RELAXATION', 'CULTURE', 'ACTIVITY', 'FESTIVAL');

-- CreateEnum
CREATE TYPE "ServiceArea" AS ENUM ('SEOUL', 'BUSAN', 'INCHEON', 'DAEGU', 'DAEJEON', 'GWANGJU', 'ULSAN', 'SEJONG', 'GYEONGGI', 'GANGWON', 'CHAUNGBUK', 'CHAUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DREAMER', 'MAKER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DreamerProfile" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "tripTypes" "TripType"[],
    "serviceArea" "ServiceArea"[],
    "image" "ProfileImage" NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MakerProfile" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "image" "ProfileImage" NOT NULL,
    "serviceTypes" "TripType"[],
    "serviceArea" "ServiceArea"[],
    "gallery" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailDescription" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "writerId" TEXT,
    "ownerId" TEXT,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "users" TEXT[],

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "senderId" TEXT,
    "chatId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "makerId" TEXT,
    "dreamerId" TEXT,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "schedule" TIMESTAMP(3)[],
    "tripType" "TripType" NOT NULL,
    "serviceArea" "ServiceArea" NOT NULL,
    "details" TEXT NOT NULL,
    "address" TEXT,
    "status" "Status" NOT NULL,
    "dreamerId" TEXT,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeletedAt" TIMESTAMP(3),
    "price" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "makerId" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_isAssign" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_isAssign_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Example_id_key" ON "Example"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DreamerProfile_userId_key" ON "DreamerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MakerProfile_userId_key" ON "MakerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_planId_key" ON "Review"("planId");

-- CreateIndex
CREATE INDEX "_isAssign_B_index" ON "_isAssign"("B");

-- AddForeignKey
ALTER TABLE "DreamerProfile" ADD CONSTRAINT "DreamerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakerProfile" ADD CONSTRAINT "MakerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_makerId_fkey" FOREIGN KEY ("makerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_dreamerId_fkey" FOREIGN KEY ("dreamerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_dreamerId_fkey" FOREIGN KEY ("dreamerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_makerId_fkey" FOREIGN KEY ("makerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_isAssign" ADD CONSTRAINT "_isAssign_A_fkey" FOREIGN KEY ("A") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_isAssign" ADD CONSTRAINT "_isAssign_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
