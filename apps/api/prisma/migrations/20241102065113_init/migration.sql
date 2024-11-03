-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "SpaceRole" AS ENUM ('OWNER', 'GENERAL_MEMBER', 'GUEST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emailVarified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "avatarId" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSpace" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "role" "SpaceRole" NOT NULL,

    CONSTRAINT "UserSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER,
    "currentUserRole" "SpaceRole" NOT NULL,
    "backgroundImagePath" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceElement" (
    "id" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "SpaceElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "backgroundImagePath" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapElements" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "elementId" TEXT,
    "x" INTEGER,
    "y" INTEGER,

    CONSTRAINT "mapElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "UserSpace_userId_spaceId_key" ON "UserSpace"("userId", "spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Space_id_key" ON "Space"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceElement_id_key" ON "SpaceElement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceElement_elementId_spaceId_key" ON "SpaceElement"("elementId", "spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Element_id_key" ON "Element"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mapElements_id_key" ON "mapElements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_id_key" ON "Avatar"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpace" ADD CONSTRAINT "UserSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpace" ADD CONSTRAINT "UserSpace_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceElement" ADD CONSTRAINT "SpaceElement_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceElement" ADD CONSTRAINT "SpaceElement_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
