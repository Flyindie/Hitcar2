import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    console.log("GET payment is runing")
    try{
        const { searchParams } = new URL(req.url)
        const bookID:number = Number(searchParams.get('bookingID')) || -1

        //รับราคาการจอง
        const res = await prisma.booking.findFirst({
            where:{booking_id:bookID},
            include:{
                payment:{
                    select:{
                        total_price: true
                    }
                }
            }
        })

        let noVehicle:Boolean = false

        if(!res?.vehicle_id){
            await prisma.booking.update({
                where:{booking_id:res?.booking_id},
                data:{
                    status:'Canceled'
                }
            })
            noVehicle = true
        }
        
        return(
            Response.json({ paymentPrice: res?.payment?.total_price, noVehicle:noVehicle}, {status:201})
        )
    }
    catch(error){
        Response.json({ message: "There is an error in server" }, {status:500})
    }
}