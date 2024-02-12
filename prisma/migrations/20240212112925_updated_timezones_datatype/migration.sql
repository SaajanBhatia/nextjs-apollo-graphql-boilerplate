/*
  Warnings:

  - Changed the type of `timeEnd` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timeStart` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "timeEnd",
ADD COLUMN     "timeEnd" DECIMAL(65,30) NOT NULL,
DROP COLUMN "timeStart",
ADD COLUMN     "timeStart" DECIMAL(65,30) NOT NULL;
