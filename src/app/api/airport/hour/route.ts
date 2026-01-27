import prisma from "@/lib/prisma"

export async function GET(req:Request){
    console.log("GET all airport!")

    const { searchParams } = new URL(req.url)
    const airportName:string = searchParams.get('name') || ''

    //ส่งชื่อมาจริงมั้ย
    if(airportName === ''){
        return( Response.json({report: "need airport name"}))
    }

    //หาชั่วโมงทำการ
    const airports = await prisma.airport.findFirst({
        where:{name: airportName},
        select: {
            business_hour: true,
            id: true,
        }
    })
    return( Response.json(airports))
}