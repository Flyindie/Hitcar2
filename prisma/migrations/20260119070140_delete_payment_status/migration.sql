/*
  Warnings:

  - The values [Cancel] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `payment` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('Completed', 'Awaiting', 'Canceled');
ALTER TABLE "booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PaymentStatus";
