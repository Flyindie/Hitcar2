-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Gear" AS ENUM ('Manual', 'Automatic');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Fuel', 'Hybrid', 'Electric');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Completed', 'Awaiting', 'Cancel');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "gender" "Gender",
    "region" TEXT NOT NULL,
    "img_path" TEXT,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "vehicle_id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "baggage" INTEGER NOT NULL,
    "door" INTEGER NOT NULL,
    "gear" "Gear" NOT NULL,
    "energy" "Energy" NOT NULL,
    "price_per_day" DOUBLE PRECISION NOT NULL,
    "image_link" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "airport" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "states" TEXT,
    "country" TEXT NOT NULL,
    "business_hour" TEXT NOT NULL,

    CONSTRAINT "airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "BookingStatus" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "pd_id" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "driver" (
    "driver_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "pd" (
    "pd_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "airport_id" INTEGER NOT NULL,
    "pickup_date" TIMESTAMP(3) NOT NULL,
    "dropoff_date" TIMESTAMP(3) NOT NULL,
    "total_day" INTEGER NOT NULL,

    CONSTRAINT "pd_pkey" PRIMARY KEY ("pd_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
