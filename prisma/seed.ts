import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  await prisma.vehicle.create({
    data:{
      brand: "Mazda",
      model: "Mazda2 Sedan",
      segment: "Small car",
      seats: 4,
      baggage: 2,
      door: 4,
      gear: "Automatic",
      energy: "Fuel",
      price_per_day: 1204.11,
      image_link: '/img/carList/1_Mazda_Mazda2 Sedan',
      status: "INACTIVE"
    }
  })

  console.log("🌱 Seed completed");
}

main()
  .catch(async e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })