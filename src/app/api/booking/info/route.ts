import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    try{
        const { searchParams } = new URL(req.url)
        const bookingID = Number(searchParams.get('bookingId'))

        //ดึงข้อมูลทั้งหมดเกี่ยวกับรายการการจองนี้
        const res = await prisma.booking.findFirst({
            where:{booking_id:bookingID},
            include:{
                payment: true,
                driver: true,
                pd:{
                    include:{
                        airport: true
                    }
                },
                vehicle: true
            }
        })

        return(
            Response.json(res)
        )
    }
    catch(error){
        console.log(error)
        return(
            Response.json({status: 500})
        )
    }
}