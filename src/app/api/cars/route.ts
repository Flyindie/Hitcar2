
import prisma from "@/lib/prisma"

export async function GET(){
    console.log("GET some car!")

    //หารถ5คันแรก
    const vehicles = await prisma.vehicle.findMany({
        take: 5
    })
    return( Response.json(vehicles))
}