import prisma from "@/lib/prisma"

export async function PATCH(req: Request) {
    console.log('Cancle booking is runing')
    try{
        const {bookingId} = await req.json()

        //ยกเลิกการจอง
        await prisma.booking.update({
            where:{booking_id: bookingId},
            data:{
                status:'Canceled'
            }
        })

        return(
            Response.json({status:201})
        )
    }
    catch(error){
        console.log(error)
    }
}