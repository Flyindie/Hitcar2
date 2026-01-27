/*
  Warnings:

  - You are about to drop the column `booking_id` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `pd` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[booking_ID]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_ID]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_ID]` on the table `pd` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "driver" DROP CONSTRAINT "driver_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "pd" DROP CONSTRAINT "pd_booking_id_fkey";

-- DropIndex
DROP INDEX "driver_booking_id_key";

-- DropIndex
DROP INDEX "payment_booking_id_key";

-- DropIndex
DROP INDEX "pd_booking_id_key";

-- AlterTable
ALTER TABLE "driver" DROP COLUMN "booking_id",
ADD COLUMN     "booking_ID" INTEGER;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "booking_id",
ADD COLUMN     "booking_ID" INTEGER;

-- AlterTable
ALTER TABLE "pd" DROP COLUMN "booking_id",
ADD COLUMN     "booking_ID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "driver_booking_ID_key" ON "driver"("booking_ID");

-- CreateIndex
CREATE UNIQUE INDEX "payment_booking_ID_key" ON "payment"("booking_ID");

-- CreateIndex
CREATE UNIQUE INDEX "pd_booking_ID_key" ON "pd"("booking_ID");

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_booking_ID_fkey" FOREIGN KEY ("booking_ID") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pd" ADD CONSTRAINT "pd_booking_ID_fkey" FOREIGN KEY ("booking_ID") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_ID_fkey" FOREIGN KEY ("booking_ID") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;
