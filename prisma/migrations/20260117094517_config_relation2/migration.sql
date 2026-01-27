/*
  Warnings:

  - You are about to drop the column `booking_ID` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `booking_ID` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `booking_ID` on the `pd` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[booking_id]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_id]` on the table `pd` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "driver" DROP CONSTRAINT "driver_booking_ID_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_booking_ID_fkey";

-- DropForeignKey
ALTER TABLE "pd" DROP CONSTRAINT "pd_booking_ID_fkey";

-- DropIndex
DROP INDEX "driver_booking_ID_key";

-- DropIndex
DROP INDEX "payment_booking_ID_key";

-- DropIndex
DROP INDEX "pd_booking_ID_key";

-- AlterTable
ALTER TABLE "driver" DROP COLUMN "booking_ID",
ADD COLUMN     "booking_id" INTEGER;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "booking_ID",
ADD COLUMN     "booking_id" INTEGER,
ALTER COLUMN "total_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "pd" DROP COLUMN "booking_ID",
ADD COLUMN     "booking_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "driver_booking_id_key" ON "driver"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_booking_id_key" ON "payment"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "pd_booking_id_key" ON "pd"("booking_id");

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pd" ADD CONSTRAINT "pd_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;
