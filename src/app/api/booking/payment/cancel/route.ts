import prisma from "@/lib/prisma"

export async function PATCH(req: Request) {
    console.log('Cancle booking is runing')
    try{
        const {bookingId} = await req.json()

        //ยกเลิกการจอง
        const res = await prisma.booking.update({
            where:{booking_id: bookingId},
            data:{
                status:'Canceled'
            }
        })

        //ถ้ารถยังไม่โดนลบจะเปลี่ยนสถานะการจอง
        if(res.vehicle_id){
            await prisma.vehicle.update({
                where:{vehicle_id: res.vehicle_id},
                data:{
                    status:'INACTIVE'
                }
            })
        }

        return(
            Response.json({status:201})
        )
    }
    catch(error){
        console.log(error)
    }
}