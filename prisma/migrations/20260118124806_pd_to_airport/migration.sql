/*
  Warnings:

  - You are about to alter the column `total_price` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Made the column `booking_id` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `booking_id` on table `payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `booking_id` on table `pd` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "driver" DROP CONSTRAINT "driver_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "pd" DROP CONSTRAINT "pd_booking_id_fkey";

-- AlterTable
ALTER TABLE "driver" ALTER COLUMN "booking_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "booking_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "pd" ALTER COLUMN "booking_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pd" ADD CONSTRAINT "pd_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pd" ADD CONSTRAINT "pd_airport_id_fkey" FOREIGN KEY ("airport_id") REFERENCES "airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
