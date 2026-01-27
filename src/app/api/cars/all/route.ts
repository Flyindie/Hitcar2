import prisma from "@/lib/prisma"

export async function GET(){
    console.log("GET some car!")

    //หารถทั้งหมด
    const vehicles = await prisma.vehicle.findMany()
    return( Response.json(vehicles))
}