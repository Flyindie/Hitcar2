-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "vehicle_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("vehicle_id") ON DELETE SET NULL ON UPDATE CASCADE;
