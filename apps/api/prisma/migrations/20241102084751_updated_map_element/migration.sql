/*
  Warnings:

  - A unique constraint covering the columns `[mapId,elementId]` on the table `mapElements` will be added. If there are existing duplicate values, this will fail.
  - Made the column `elementId` on table `mapElements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "mapElements" ALTER COLUMN "elementId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "mapElements_mapId_elementId_key" ON "mapElements"("mapId", "elementId");

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
