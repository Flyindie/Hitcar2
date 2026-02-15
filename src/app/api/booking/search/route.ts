import prisma from "@/lib/prisma"
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GET(req: Request) {
    try{
        //รับ filter
        const { searchParams } = new URL(req.url)
        const airport = searchParams.get('airport')

        //อ่าน token ใน cookie
        const cookie = await cookies()
        const token = cookie.get('token')
        const tokenString:string = token?.value || ''

        const secretKey:string = process.env.SECRET_KEY || 'default'

        //ตรวจดูข้อมูล user id ใน token
        const member = jwt.verify(tokenString, secretKey) as JwtPayload
        const account = await prisma.user.findFirst({where:{user_id: member.user_id}})
        const userID:number = account?.user_id || -1

        //ค้นหารายการการจอง
        const res = await prisma.booking.findMany({
            where: {
                user_id: userID,
                pd: {
                    is: {
                        airport: {
                            is: {
                                name: {
                                    contains: airport || '',
                                    mode: 'insensitive'
                                }
                            }
                        }
                    }
                }
            },
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