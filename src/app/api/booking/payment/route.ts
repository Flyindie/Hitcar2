import prisma from "@/lib/prisma"

export async function PATCH(req: Request) {
    console.log("Patch payment is runing")
    try{
        const {bookingId, paymentMethod } = await req.json()

        //อัปเดทการชำระเงิน
        await prisma.$transaction([
            prisma.booking.update({
                where: { booking_id: bookingId },
                data: {
                    status: 'Completed',
                    payment: {
                        update: {
                        payment_method: paymentMethod,
                        },
                    },
                },
            }),
        ])

        return (
            Response.json({ message: "complete" }, {status:201})
        )
    }
    catch(error){
        console.log(error)
        Response.json({ message: "There is an error in the payment system." }, {status:500})
    }
}