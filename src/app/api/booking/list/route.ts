import prisma from "@/lib/prisma"
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import { Prisma } from "@/generated/prisma/client"

export async function GET(req: Request) {
    try{
        //รับ filter
        const { searchParams } = new URL(req.url)
        const bookingFilter = searchParams.get('filter')

        //อ่าน token ใน cookie
        const cookie = await cookies()
        const token = cookie.get('token')
        const tokenString:string = token?.value || ''

        const secretKey:string = process.env.SECRET_KEY || 'default'

        //ตรวจดูข้อมูล user id ใน token
        const member = jwt.verify(tokenString, secretKey) as JwtPayload
        const account = await prisma.user.findFirst({where:{user_id: member.user_id}})
        const userID:number = account?.user_id || -1


        //เงื่อนไขจาก filter
        const where:Prisma.bookingWhereInput = {user_id: userID}
        if(bookingFilter === 'Awaiting Payment') where.status = 'Awaiting'
        else if(bookingFilter === 'Canceled') where.status = 'Canceled'
        else if(bookingFilter === 'Completed') where.status = 'Completed'

        //ค้นหารายการการจอง
        const res = await prisma.booking.findMany({
            where,
            include:{
                payment: true,
                driver: true,
                pd:{
                    include:{
                        airport: true
                    }
                },
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