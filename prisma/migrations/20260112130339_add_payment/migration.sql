/*
  Warnings:

  - You are about to drop the column `driver_id` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `pd_id` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[booking_id]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_id]` on the table `pd` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Card', 'Bank', 'Qr');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Completed', 'Canceled', 'Awaiting');

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "driver_id",
DROP COLUMN "pd_id",
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "vehicle_id" DROP NOT NULL,
ALTER COLUMN "payment_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "driver" ALTER COLUMN "booking_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" "PaymentMethod" NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "booking_id" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_booking_id_key" ON "payment"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_booking_id_key" ON "driver"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "pd_booking_id_key" ON "pd"("booking_id");

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pd" ADD CONSTRAINT "pd_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;
