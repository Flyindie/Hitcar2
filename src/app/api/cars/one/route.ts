import prisma from "@/lib/prisma"

export async function GET(req:Request){
    console.log("GET some car!")

    const { searchParams } = new URL(req.url)
    const car_id:number = Number(searchParams.get('carId'))

    const vehicles = await prisma.vehicle.findFirst({
        where:{vehicle_id:car_id}
    })
    return( Response.json(vehicles))
}