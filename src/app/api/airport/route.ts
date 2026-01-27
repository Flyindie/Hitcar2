import prisma from "@/lib/prisma"

export async function GET(){
    console.log("GET time airport!")

    //หาชื่อสนามบินทั้งหมด
    const airports = await prisma.airport.findMany({
        select: {name: true}
    })
    return( Response.json(airports))
}